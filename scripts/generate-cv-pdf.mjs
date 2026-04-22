import puppeteer from 'puppeteer'
import { mkdirSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, '../public/docs')
mkdirSync(outDir, { recursive: true })

const htmlPath = resolve(__dirname, '../app/assets/docs/Marlloyd_Honrado_CV.html')
const outPath  = resolve(outDir, 'Marlloyd_Honrado_CV.pdf')

const browser = await puppeteer.launch({ headless: true })
const page    = await browser.newPage()

await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' })

// Force print media so @media print styles kick in
await page.emulateMediaType('print')

await page.pdf({
  path:   outPath,
  format: 'A4',
  margin: { top: '20mm', bottom: '20mm', left: '18mm', right: '18mm' },
  printBackground: true,
})

await browser.close()
console.log(`✓ CV PDF generated: ${outPath}`)
