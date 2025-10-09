/**
 * Automated Deployment to DigitalOcean Droplet
 *
 * This script deploys the site to a DigitalOcean droplet via rsync over SSH.
 * It includes safety checks, backup creation, and rollback capability.
 *
 * Usage:
 *   node deploy.js
 *   node deploy.js --dry-run
 *   node deploy.js --rollback
 *   node deploy.js --config
 */

import { spawn } from "child_process";
import * as fs from "node:fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Deployment configuration
const DEFAULT_CONFIG = {
  // SSH connection
  host: process.env.DEPLOY_HOST || "",
  user: process.env.DEPLOY_USER || "root",
  port: process.env.DEPLOY_PORT || "22",
  keyPath: process.env.DEPLOY_KEY_PATH || "~/.ssh/id_rsa",

  // Remote paths
  remotePath: process.env.DEPLOY_REMOTE_PATH || "/var/www/nomasdesinformacion",
  backupPath:
    process.env.DEPLOY_BACKUP_PATH || "/var/www/nomasdesinformacion-backups",

  // Local paths
  localPath: path.join(__dirname, "public"),

  // rsync options
  exclude: [".git", "node_modules", ".env", "*.log", ".DS_Store"],

  // Safety settings
  maxBackups: 5, // Keep last 5 backups
  requireConfirmation: true,
};

/**
 * Load or create deployment configuration
 */
function loadConfig() {
  const configPath = path.join(__dirname, "deploy-config.json");

  if (fs.existsSync(configPath)) {
    const userConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return { ...DEFAULT_CONFIG, ...userConfig };
  }

  return DEFAULT_CONFIG;
}

/**
 * Save deployment configuration
 */
function saveConfig(config) {
  const configPath = path.join(__dirname, "deploy-config.json");
  const cleanConfig = { ...config };
  delete cleanConfig.localPath; // Don't save derived paths

  fs.writeFileSync(configPath, JSON.stringify(cleanConfig, null, 2), "utf-8");
  console.log(`✅ Configuration saved to: ${configPath}`);
}

/**
 * Run a shell command and return promise
 */
function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`\n💻 Running: ${command} ${args.join(" ")}`);

    const proc = spawn(command, args, {
      stdio: options.silent ? "pipe" : "inherit",
      shell: false, // Changed from true to false
      ...options,
    });

    let stdout = "";
    let stderr = "";

    if (options.silent) {
      proc.stdout?.on("data", (data) => {
        stdout += data.toString();
      });
      proc.stderr?.on("data", (data) => {
        stderr += data.toString();
      });
    }

    proc.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr, code });
      } else {
        reject(
          new Error(`Command failed with code ${code}\n${stderr || stdout}`)
        );
      }
    });

    proc.on("error", (error) => {
      reject(error);
    });
  });
}

/**
 * Test SSH connection
 */
async function testConnection(config) {
  console.log("\n🔐 Testing SSH connection...");

  try {
    // Expand ~ in key path
    const keyPath = config.keyPath.replace(/^~/, process.env.HOME);

    await runCommand(
      "ssh",
      [
        "-i",
        keyPath,
        "-p",
        config.port,
        `${config.user}@${config.host}`,
        'echo "Connection successful"',
      ],
      { silent: true }
    );

    console.log("✅ SSH connection successful");
    return true;
  } catch (error) {
    console.error("❌ SSH connection failed:", error.message);
    console.error("\n🔧 Troubleshooting:");
    console.error("  1. Check that your SSH key is correct");
    console.error("  2. Verify the host, user, and port");
    const keyPath = config.keyPath.replace(/^~/, process.env.HOME);
    console.error(
      "  3. Test manually: ssh -i",
      keyPath,
      `${config.user}@${config.host}`
    );
    return false;
  }
}

/**
 * Create backup on remote server
 */
async function createBackup(config) {
  console.log("\n💾 Creating backup on remote server...");

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupName = `backup-${timestamp}`;

  try {
    // Expand ~ in key path
    const keyPath = config.keyPath.replace(/^~/, process.env.HOME);

    // Create backup directory if it doesn't exist
    await runCommand(
      "ssh",
      [
        "-i",
        keyPath,
        "-p",
        config.port,
        `${config.user}@${config.host}`,
        `mkdir -p ${config.backupPath}`,
      ],
      { silent: true }
    );

    // Copy current site to backup
    await runCommand("ssh", [
      "-i",
      keyPath,
      "-p",
      config.port,
      `${config.user}@${config.host}`,
      `cp -r ${config.remotePath} ${config.backupPath}/${backupName}`,
    ]);

    console.log(`✅ Backup created: ${backupName}`);

    // Clean old backups
    await cleanOldBackups(config);

    return backupName;
  } catch (error) {
    console.error("❌ Backup creation failed:", error.message);
    throw error;
  }
}

/**
 * Clean old backups, keeping only the most recent ones
 */
async function cleanOldBackups(config) {
  try {
    const keyPath = config.keyPath.replace(/^~/, process.env.HOME);

    const result = await runCommand(
      "ssh",
      [
        "-i",
        keyPath,
        "-p",
        config.port,
        `${config.user}@${config.host}`,
        `ls -1t ${config.backupPath}`,
      ],
      { silent: true }
    );

    const backups = result.stdout.trim().split("\n").filter(Boolean);

    if (backups.length > config.maxBackups) {
      console.log(
        `\n🧹 Cleaning old backups (keeping ${config.maxBackups} most recent)...`
      );

      const toDelete = backups.slice(config.maxBackups);
      for (const backup of toDelete) {
        await runCommand(
          "ssh",
          [
            "-i",
            keyPath,
            "-p",
            config.port,
            `${config.user}@${config.host}`,
            `rm -rf ${config.backupPath}/${backup}`,
          ],
          { silent: true }
        );
        console.log(`   Deleted: ${backup}`);
      }
    }
  } catch (error) {
    console.warn("⚠️  Could not clean old backups:", error.message);
  }
}

/**
 * Deploy files using rsync
 */
async function deployFiles(config, dryRun = false) {
  console.log(
    `\n🚀 ${dryRun ? "Simulating deployment (dry-run)" : "Deploying files"}...`
  );

  // Expand ~ in key path
  const keyPath = config.keyPath.replace(/^~/, process.env.HOME);

  // Build rsync command
  const excludeArgs = config.exclude.flatMap((e) => ["--exclude", e]);

  const rsyncArgs = [
    "-avz", // archive, verbose, compress
    "--delete", // delete files that don't exist in source
    dryRun ? "--dry-run" : "",
    ...excludeArgs,
    "-e",
    `ssh -i ${keyPath} -p ${config.port}`,
    `${config.localPath}/`,
    `${config.user}@${config.host}:${config.remotePath}/`,
  ].filter(Boolean);

  try {
    await runCommand("rsync", rsyncArgs);
    console.log(`✅ ${dryRun ? "Dry-run complete" : "Deployment successful"}`);
    return true;
  } catch (error) {
    console.error("❌ Deployment failed:", error.message);
    throw error;
  }
}

/**
 * Rollback to a previous backup
 */
async function rollback(config, backupName = null) {
  console.log("\n⏮️  Rolling back to previous version...");

  try {
    // Expand ~ in key path
    const keyPath = config.keyPath.replace(/^~/, process.env.HOME);

    // List available backups
    const result = await runCommand(
      "ssh",
      [
        "-i",
        keyPath,
        "-p",
        config.port,
        `${config.user}@${config.host}`,
        `ls -1t ${config.backupPath}`,
      ],
      { silent: true }
    );

    const backups = result.stdout.trim().split("\n").filter(Boolean);

    if (backups.length === 0) {
      console.error("❌ No backups available for rollback");
      return false;
    }

    // Use specified backup or most recent
    const targetBackup = backupName || backups[0];

    if (!backups.includes(targetBackup)) {
      console.error(`❌ Backup not found: ${targetBackup}`);
      console.log("\nAvailable backups:");
      backups.forEach((b) => console.log(`  - ${b}`));
      return false;
    }

    console.log(`📦 Rolling back to: ${targetBackup}`);

    // Restore backup
    await runCommand("ssh", [
      "-i",
      keyPath,
      "-p",
      config.port,
      `${config.user}@${config.host}`,
      `rm -rf ${config.remotePath} && cp -r ${config.backupPath}/${targetBackup} ${config.remotePath}`,
    ]);

    console.log("✅ Rollback successful");
    return true;
  } catch (error) {
    console.error("❌ Rollback failed:", error.message);
    return false;
  }
}

/**
 * Interactive configuration setup
 */
async function configureDeployment() {
  const readline = await import("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt, defaultValue) => {
    return new Promise((resolve) => {
      const displayPrompt =
        defaultValue !== undefined
          ? `${prompt} [${defaultValue}]: `
          : `${prompt}: `;
      rl.question(displayPrompt, (answer) => {
        resolve(answer.trim() || defaultValue);
      });
    });
  };

  console.log("\n⚙️  Deployment Configuration Setup");
  console.log("==================================\n");

  const config = loadConfig();

  config.host = await question("Droplet IP or hostname", config.host);
  config.user = await question("SSH user", config.user);
  config.port = await question("SSH port", config.port);
  config.keyPath = await question("SSH key path", config.keyPath);
  config.remotePath = await question("Remote site path", config.remotePath);
  config.backupPath = await question("Remote backup path", config.backupPath);

  rl.close();

  // Test connection
  const connected = await testConnection(config);

  if (connected) {
    saveConfig(config);
    console.log("\n✅ Configuration complete and tested!");
  } else {
    console.log("\n⚠️  Configuration saved but connection test failed.");
    console.log("   Please verify your settings and try again.");
    saveConfig(config);
  }
}

/**
 * Get user confirmation
 */
async function confirm(message) {
  const readline = await import("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${message} (y/N): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y");
    });
  });
}

/**
 * Main deployment function
 */
async function deploy(options = {}) {
  console.log("\n🚀 Deployment to DigitalOcean Droplet");
  console.log("=====================================\n");

  const config = loadConfig();

  // Check if configured
  if (!config.host) {
    console.error("❌ Deployment not configured.");
    console.error("\n📝 Run: node deploy.js --config");
    return false;
  }

  console.log(`📍 Target: ${config.user}@${config.host}:${config.remotePath}`);
  console.log(`📂 Source: ${config.localPath}`);

  // Verify local files exist
  if (!fs.existsSync(config.localPath)) {
    console.error(`❌ Local path not found: ${config.localPath}`);
    return false;
  }

  // Test connection
  const connected = await testConnection(config);
  if (!connected) {
    return false;
  }

  // Confirm deployment
  if (config.requireConfirmation && !options.dryRun) {
    const confirmed = await confirm(
      "\n⚠️  This will replace files on the remote server. Continue?"
    );
    if (!confirmed) {
      console.log("❌ Deployment cancelled");
      return false;
    }
  }

  try {
    // Create backup (unless dry-run)
    if (!options.dryRun) {
      await createBackup(config);
    }

    // Deploy files
    await deployFiles(config, options.dryRun);

    if (!options.dryRun) {
      console.log("\n✅ Deployment Complete!");
      console.log("=======================");
      console.log(`\n🌐 Site should be live at: http://${config.host}`);
      console.log(
        "\n💡 Tip: If something went wrong, run: node deploy.js --rollback"
      );
    }

    return true;
  } catch (error) {
    console.error("\n❌ Deployment failed:", error.message);
    console.error("\n🔄 Consider rolling back: node deploy.js --rollback");
    return false;
  }
}

/**
 * Main CLI handler
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
🚀 Automated Deployment to DigitalOcean Droplet

Usage:
  node deploy.js              Deploy to configured droplet
  node deploy.js --dry-run    Simulate deployment without changes
  node deploy.js --rollback   Restore previous backup
  node deploy.js --config     Configure deployment settings
  node deploy.js --help       Show this help message

Configuration:
  First time? Run: node deploy.js --config

  Or add to .env:
    DEPLOY_HOST=your-droplet-ip
    DEPLOY_USER=root
    DEPLOY_PORT=22
    DEPLOY_KEY_PATH=~/.ssh/id_rsa
    DEPLOY_REMOTE_PATH=/var/www/nomasdesinformacion
    DEPLOY_BACKUP_PATH=/var/www/nomasdesinformacion-backups

Examples:
  node deploy.js --config     # Interactive setup
  node deploy.js --dry-run    # Test deployment
  node deploy.js              # Deploy for real
  node deploy.js --rollback   # Undo last deployment
`);
    process.exit(0);
  }

  if (args.includes("--config")) {
    await configureDeployment();
    process.exit(0);
  }

  if (args.includes("--rollback")) {
    const config = loadConfig();
    const success = await rollback(config);
    process.exit(success ? 0 : 1);
  }

  const dryRun = args.includes("--dry-run");
  const success = await deploy({ dryRun });
  process.exit(success ? 0 : 1);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { deploy, rollback, testConnection };
