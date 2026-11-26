import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { writeFile } from 'node:fs/promises'
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] })
const results = []
try {
  for (const width of [320, 360, 390, 768, 1024, 1280, 1440, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: width < 768 ? 844 : 1000 }, reducedMotion: 'reduce' })
    await page.goto('http://127.0.0.1:4180', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    const bounds = await page.evaluate(() => {
      const hero = document.querySelector('.hero').getBoundingClientRect(), actions = document.querySelector('.hero-actions').getBoundingClientRect(), title = document.querySelector('.reality-mask em').getBoundingClientRect()
      return { width: innerWidth, heroBottom: hero.bottom, ctaBottom: actions.bottom, titleRight: title.right, overflow: document.documentElement.scrollWidth > innerWidth }
    })
    assert.ok(!bounds.overflow && bounds.titleRight < width && bounds.ctaBottom < bounds.heroBottom - 60)
    results.push(bounds)
    if ([390, 768, 1440].includes(width)) {
      for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 650) { await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(80) }
      await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(180)
      await page.screenshot({ path: `docs/screenshots/${width}-full.png`, fullPage: true })
      await page.screenshot({ path: `docs/screenshots/${width}-hero.png` })
    }
    await page.close()
  }
  console.log('Final hero geometry passed at all eight widths; desktop, tablet and mobile screenshots updated.')
} finally {
  await writeFile('docs/hero-final-results.json', JSON.stringify({ results }, null, 2))
  await browser.close()
}
