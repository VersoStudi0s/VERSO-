import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { writeFile } from 'node:fs/promises'
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] })
const checks = []
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
    await page.goto('http://127.0.0.1:4180', { waitUntil: 'networkidle' })
    for (const [name, id] of [['Lab', 'lab'], ['Sobre', 'sobre'], ['Contato', 'contato']]) {
      if (width === 390) await page.getByRole('button', { name: 'Abrir menu' }).click()
      const navigation = page.locator(width === 390 ? '#mobile-menu' : '.desktop-nav')
      await navigation.getByRole('link', { name: new RegExp(`${name}$`) }).click()
      await page.waitForTimeout(180)
      if (width === 390) await page.getByRole('button', { name: 'Abrir menu' }).click()
      const active = page.locator(width === 390 ? '#mobile-menu [aria-current="location"]' : '.desktop-nav [aria-current="location"]')
      assert.equal(await active.getAttribute('href'), `/#${id}`)
      if (width === 390) await page.keyboard.press('Escape')
      checks.push({ width, target: id, activeIndicatorPassed: true })
    }
    {
      await page.getByRole('button', { name: 'Abrir menu' }).click()
      await page.keyboard.press('Shift+Tab')
      assert.ok(await page.locator('.menu-toggle').evaluate(el => el === document.activeElement))
      await page.keyboard.press('Shift+Tab')
      assert.ok(await page.locator('#mobile-menu a').last().evaluate(el => el === document.activeElement))
      await page.keyboard.press('Tab'); await page.keyboard.press('Tab')
      assert.ok(await page.locator('#mobile-menu a').first().evaluate(el => el === document.activeElement))
      checks.push({ width, menuFocusLoopPassed: true })
      await page.keyboard.press('Escape')
      await page.locator('#mobile-menu').waitFor({ state: 'detached' })
      assert.equal(await page.locator('#mobile-menu').count(), 0)
      assert.ok(await page.locator('.menu-toggle').evaluate(el => el === document.activeElement))
    }
    await page.close()
  }
  console.log('Six active-section checks and desktop/mobile menu focus loops passed.')
} finally {
  await writeFile('docs/navigation-results.json', JSON.stringify(checks, null, 2))
  await browser.close()
}
