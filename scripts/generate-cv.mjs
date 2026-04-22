import {
  Document, Packer, Paragraph, TextRun,
  BorderStyle, AlignmentType
} from 'docx'
import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, '../public/docs')
mkdirSync(outDir, { recursive: true })

// ── Helpers ──────────────────────────────────────────────────────────────────
const FONT = 'Courier New'
const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder }

const divider = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' } },
  spacing: { before: 160, after: 160 }
})

const sectionLabel = (text) => new Paragraph({
  children: [new TextRun({ text: text.toUpperCase(), font: FONT, size: 18, color: '888888', bold: false })],
  spacing: { before: 280, after: 120 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'DDDDDD' } }
})

const heading = (text) => new Paragraph({
  children: [new TextRun({ text, font: FONT, size: 28, bold: true, color: '111111' })],
  spacing: { before: 0, after: 60 }
})

const subheading = (text) => new Paragraph({
  children: [new TextRun({ text: text.toUpperCase(), font: FONT, size: 16, color: '888888' })],
  spacing: { before: 0, after: 200 }
})

const body = (text, color = '333333') => new Paragraph({
  children: [new TextRun({ text, font: FONT, size: 20, color })],
  spacing: { before: 40, after: 40 }
})

const bullet = (text) => new Paragraph({
  children: [new TextRun({ text: `— ${text}`, font: FONT, size: 20, color: '333333' })],
  spacing: { before: 30, after: 30 },
  indent: { left: 360 }
})

const entryRow = (title, sub, year, detail = '') => [
  new Paragraph({
    children: [
      new TextRun({ text: title, font: FONT, size: 22, bold: true, color: '111111' }),
      new TextRun({ text: `   ${year}`, font: FONT, size: 18, color: '999999' })
    ],
    spacing: { before: 160, after: 40 }
  }),
  new Paragraph({
    children: [new TextRun({ text: sub, font: FONT, size: 19, color: '666666' })],
    spacing: { before: 0, after: detail ? 60 : 160 }
  }),
  ...(detail ? [new Paragraph({
    children: [new TextRun({ text: detail, font: FONT, size: 18, color: '888888' })],
    spacing: { before: 0, after: 160 }
  })] : []),
  divider()
]

const projectEntry = (title, status, desc, tags) => [
  new Paragraph({
    children: [
      new TextRun({ text: title, font: FONT, size: 22, bold: true, color: '111111' }),
      new TextRun({ text: `   ${status}`, font: FONT, size: 17, color: '999999', italics: true })
    ],
    spacing: { before: 160, after: 60 }
  }),
  new Paragraph({
    children: [new TextRun({ text: desc, font: FONT, size: 19, color: '444444' })],
    spacing: { before: 0, after: 60 }
  }),
  new Paragraph({
    children: [new TextRun({ text: tags.join('  ·  '), font: FONT, size: 17, color: '999999' })],
    spacing: { before: 0, after: 160 }
  }),
  divider()
]

// ── Document ──────────────────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: FONT, size: 20, color: '222222' }
      }
    }
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 900, bottom: 900, left: 1000, right: 1000 }
      }
    },
    children: [

      // ── Header ──
      heading('Marlloyd I. Honrado'),
      subheading('Web Developer  ·  Graphic Designer  ·  Security Enthusiast'),

      new Paragraph({
        children: [new TextRun({ text: 'honradomarlloyd@gmail.com  ·  +63 908 138 1680', font: FONT, size: 18, color: '666666' })],
        spacing: { after: 40 }
      }),
      new Paragraph({
        children: [new TextRun({ text: 'github.com/CodeLloydie  ·  linkedin.com/in/marlloyd-honrado-4245402a0', font: FONT, size: 18, color: '666666' })],
        spacing: { after: 40 }
      }),
      new Paragraph({
        children: [new TextRun({ text: 'instagram.com/mihonrado  ·  Philippines', font: FONT, size: 18, color: '666666' })],
        spacing: { after: 200 }
      }),

      divider(),

      // ── Profile ──
      sectionLabel('Profile'),
      body('Web developer and graphic designer with hands-on experience building modular SaaS platforms,'),
      body('UI/UX prototypes, and institutional IT systems. Combines technical development skills with a'),
      body('strong design sensibility — delivering solutions that are both functional and visually purposeful.'),
      body('Currently expanding into ethical hacking and cybersecurity concepts.'),

      divider(),

      // ── Skills ──
      sectionLabel('Technical Skills'),

      new Paragraph({
        children: [new TextRun({ text: 'DEVELOPMENT', font: FONT, size: 17, color: '999999' })],
        spacing: { before: 120, after: 60 }
      }),
      bullet('HTML / CSS'),
      bullet('JavaScript'),
      bullet('Vue.js / Nuxt'),
      bullet('Laravel / PHP'),
      bullet('MySQL'),

      new Paragraph({
        children: [new TextRun({ text: 'DESIGN', font: FONT, size: 17, color: '999999' })],
        spacing: { before: 120, after: 60 }
      }),
      bullet('Figma'),
      bullet('Adobe Illustrator'),
      bullet('Adobe Photoshop'),
      bullet('UI/UX Design & Prototyping'),

      new Paragraph({
        children: [new TextRun({ text: 'TOOLS', font: FONT, size: 17, color: '999999' })],
        spacing: { before: 120, after: 60 }
      }),
      bullet('VS Code'),
      bullet('GitHub'),
      bullet('Claude Code'),

      divider(),

      // ── Experience ──
      sectionLabel('Work Experience'),

      ...entryRow(
        'Web Developer Intern',
        'AWORK A/S  ·  Denmark (Remote)',
        '2025 — 2026',
        'Contributed to real-world web development projects in a remote international environment. Gained professional experience working with a Danish company over a 5-month engagement during the final year of college.'
      ),
      ...entryRow(
        'IT Support',
        'Hulid Elementary School  ·  Philippines',
        '2022 — 2026',
        'Managed and maintained school IT systems, troubleshot hardware and software issues, and provided ongoing technical support to staff. Ran concurrently with college studies from 1st year onwards.'
      ),

      // ── Projects ──
      sectionLabel('Projects'),

      ...projectEntry(
        'FarmCo-Pal',
        '— In Development',
        'Modular SaaS for cooperatives — activate loans, savings, milling, and transaction services on demand. Features a dynamic bookkeeping engine for manual debit/credit entry assignment per account, ensuring full financial transparency.',
        ['Nuxt', 'Laravel', 'MySQL', 'Solo Dev']
      ),
      ...projectEntry(
        'Invent-Story',
        '— In Development',
        'SaaS inventory system for SMBs with sales management, transaction logging, and analytics dashboards. Core feature: Smart Price Builder — calculates the optimal selling price based on capital and target profit margin.',
        ['Nuxt', 'Laravel', 'MySQL', 'Solo Dev']
      ),
      ...projectEntry(
        'Gear Up',
        '— UI/UX Prototype',
        'Mobile e-commerce app prototype for computer and electronic parts. Designed for PC builders, enthusiasts, and everyday shoppers — featuring product browsing, cart, and a fast checkout flow.',
        ['Figma', 'Mobile Design', 'Prototyping', 'UI/UX']
      ),

      // ── Education ──
      sectionLabel('Education'),

      ...entryRow('BS Information Technology', 'STI College Davao  ·  Davao City, Philippines', '2022 — 2026'),
      ...entryRow('Senior High School', 'Davao City National High School  ·  Davao City, Philippines', '2020 — 2022'),
      ...entryRow('Junior High School', 'Cateel National High School  ·  Cateel, Davao Oriental', '2016 — 2020'),
      ...entryRow('Elementary', 'Maryknoll Academy of Cateel  ·  Cateel, Davao Oriental', '2010 — 2016'),

      // ── Footer ──
      new Paragraph({
        children: [new TextRun({
          text: 'Marlloyd I. Honrado  ·  honradomarlloyd@gmail.com  ·  +63 908 138 1680',
          font: FONT, size: 17, color: 'AAAAAA'
        })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 }
      })
    ]
  }]
})

Packer.toBuffer(doc).then((buffer) => {
  const outPath = resolve(outDir, 'Marlloyd_Honrado_CV.docx')
  writeFileSync(outPath, buffer)
  console.log(`✓ CV generated: ${outPath}`)
})
