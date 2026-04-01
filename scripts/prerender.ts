import puppeteer from 'puppeteer'
import { createServer } from 'http'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, extname } from 'path'

const DIST = join(process.cwd(), 'dist')
const PORT = 4173
const ROUTES = ['/', '/resume', '/resume-leader', '/resume-salesforce']

function startServer(): Promise<ReturnType<typeof createServer>> {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let url = req.url || '/'
      url = url.split('?')[0]
      let filePath = join(DIST, url)
      if (!extname(filePath)) {
        filePath = join(DIST, 'index.html')
      }
      try {
        const content = readFileSync(filePath)
        const ext = extname(filePath)
        const types: Record<string, string> = {
          '.html': 'text/html',
          '.js': 'application/javascript',
          '.css': 'text/css',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.ico': 'image/x-icon',
          '.svg': 'image/svg+xml',
          '.json': 'application/json',
          '.woff2': 'font/woff2',
        }
        res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' })
        res.end(content)
      } catch {
        try {
          const content = readFileSync(join(DIST, 'index.html'))
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(content)
        } catch {
          res.writeHead(404)
          res.end('Not found')
        }
      }
    })
    server.listen(PORT, () => {
      console.log(`Static server running on http://localhost:${PORT}`)
      resolve(server)
    })
  })
}

async function prerender() {
  console.log('Starting pre-render...')
  const server = await startServer()
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  for (const route of ROUTES) {
    console.log(`Pre-rendering ${route}...`)
    const page = await browser.newPage()
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' })
    await new Promise(r => setTimeout(r, 2000))
    const html = await page.content()
    let outPath: string
    if (route === '/') {
      outPath = join(DIST, 'index.html')
    } else {
      const dir = join(DIST, route.slice(1))
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
      outPath = join(dir, 'index.html')
    }
    writeFileSync(outPath, html)
    console.log(`  → Saved to ${outPath}`)
    await page.close()
  }
  await browser.close()
  server.close()
  console.log('Pre-render complete!')
}

prerender().catch(err => {
  console.error('Pre-render failed:', err)
  process.exit(1)
})
