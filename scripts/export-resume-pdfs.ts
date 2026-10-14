import puppeteer from 'puppeteer'
import { createServer } from 'http'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, extname } from 'path'

const DIST = join(process.cwd(), 'dist')
const PUBLIC_PDFS = join(process.cwd(), 'public', 'resumes')
const DIST_PDFS = join(DIST, 'resumes')
const PORT = 4174

const RESUMES = [
  ['/resume', 'Renzo_Dupont_Salesforce_Developer.pdf'],
  ['/resume-admin', 'Renzo_Dupont_Salesforce_Administrator.pdf'],
  ['/resume-pm', 'Renzo_Dupont_Project_Product_Leader.pdf'],
  ['/resume-it-director', 'Renzo_Dupont_IT_Business_Systems.pdf'],
  ['/resume-engineer', 'Renzo_Dupont_Software_Engineer.pdf'],
  ['/resume-fractional', 'Renzo_Dupont_Fractional_CTO_Software_Engineer.pdf'],
] as const

const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
}

async function exportPdfs() {
  mkdirSync(PUBLIC_PDFS, { recursive: true })
  mkdirSync(DIST_PDFS, { recursive: true })

  const server = createServer((req, res) => {
    const pathname = decodeURIComponent((req.url || '/').split('?')[0])
    const filePath = extname(pathname)
      ? join(DIST, pathname)
      : join(DIST, pathname, 'index.html')

    try {
      const content = readFileSync(filePath)
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
      res.end(content)
    } catch {
      res.writeHead(404)
      res.end('Not found')
    }
  })

  await new Promise<void>((resolve) => server.listen(PORT, resolve))
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })

  try {
    for (const [route, filename] of RESUMES) {
      const page = await browser.newPage()
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' })
      await page.emulateMediaType('print')
      await page.evaluate(() => document.fonts.ready)
      const pdf = await page.pdf({
        format: 'Letter',
        preferCSSPageSize: true,
        printBackground: false,
        displayHeaderFooter: false,
      })
      writeFileSync(join(PUBLIC_PDFS, filename), pdf)
      writeFileSync(join(DIST_PDFS, filename), pdf)
      console.log(`${route} → ${filename}`)
      await page.close()
    }
  } finally {
    await browser.close()
    server.close()
  }
}

exportPdfs().catch((error) => {
  console.error(error)
  process.exit(1)
})
