import { test } from '@playwright/test';

test('capture all tabs', async ({ page }) => {
  await page.goto('http://localhost:4111');
  await page.waitForTimeout(1000);

  // Tab 1: Core Data
  await page.screenshot({
    path: 'dispatch-core-data.png',
    fullPage: true
  });

  // Tab 2: EBITDA & EV Impact
  const tab2 = page.locator('button:has-text("EBITDA & EV Impact")');
  await tab2.click();
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'dispatch-ebitda-ev.png',
    fullPage: true
  });

  // Tab 3: Cash Flow Analysis
  const tab3 = page.locator('button:has-text("Cash Flow Analysis")');
  await tab3.click();
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'dispatch-cash-flow.png',
    fullPage: true
  });

  // Tab 4: AI Roadmap
  const tab4 = page.locator('button:has-text("AI Roadmap")');
  await tab4.click();
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'dispatch-ai-roadmap.png',
    fullPage: true
  });

  console.log('All 4 tabs captured successfully');
});
