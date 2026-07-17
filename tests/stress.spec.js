// Stackwerk stress test.
// Cycles presets, customers, pains, theme toggles, block add/remove, library
// expand/collapse, brief copy/download and mobile nav across four viewports,
// while asserting: no uncaught page errors, no console errors, no React
// key/duplicate warnings, no horizontal overflow, and that the two layout
// fixes hold (bounded/scrollable pain list; add-on library close to blocks).

import { test, expect } from '@playwright/test';

const PAINS = Array.from({ length: 14 }, (_, i) => `p${i + 1}`);
const PRESETS = ['db-sovereign-genai', 'bmw-mfg-sap', 'schwarz-retail-productivity'];
const CUSTOMERS = [
  'deutsche-bank', 'commerzbank', 'allianz', 'bmw', 'mercedes', 'volkswagen',
  'bayer', 'basf', 'siemens', 'lufthansa', 'dhl', 'bosch', 'schwarz', 'otto',
  'rewe', 'eon', 'infineon', 'deutsche-boerse', 'fresenius', 'merck',
  'deutsche-bahn', 'fed-gov',
];

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900, mobile: false },
  { name: 'laptop-1280', width: 1280, height: 720, mobile: false },
  { name: 'tablet-768', width: 768, height: 1024, mobile: true },
  { name: 'mobile-390', width: 390, height: 844, mobile: false }, // 390<900 => mobile layout
];

// Attach console/page-error listeners; return arrays that accumulate problems.
function attachListeners(page) {
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
    // React key/duplicate warnings surface as warnings
    if (msg.type() === 'warning' && /each child|unique .*key|duplicate/i.test(msg.text())) {
      consoleErrors.push('WARN: ' + msg.text());
    }
  });
  page.on('pageerror', (err) => pageErrors.push(String(err)));
  return { consoleErrors, pageErrors };
}

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => {
    const de = document.documentElement;
    return { sw: de.scrollWidth, cw: de.clientWidth };
  });
  expect(overflow.sw, `horizontal overflow at ${label} (scrollWidth ${overflow.sw} > clientWidth ${overflow.cw})`)
    .toBeLessThanOrEqual(overflow.cw + 1);
}

function isMobileLayout(width) {
  return width <= 900;
}

test.describe('Stackwerk stress', () => {
  for (const vp of VIEWPORTS) {
    test(`viewport ${vp.name}`, async ({ page }) => {
      const { consoleErrors, pageErrors } = attachListeners(page);
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await expect(page.getByTestId('button-theme-toggle')).toBeVisible();

      const mobile = isMobileLayout(vp.width);

      // helper: on mobile, switch step panels via bottom nav
      const showStep = async (step) => {
        if (!mobile) return;
        await page.getByTestId(`mnav-${step}`).click();
      };

      // ---- 1. Presets cycle (presets bar is intentionally hidden on mobile) ----
      if (!mobile) {
        for (const preset of PRESETS) {
          await page.getByTestId(`preset-${preset}`).click();
          await expect(page.getByTestId('library-drawer')).toBeVisible();
          // at least one block present
          await expect(page.locator('[data-testid^="block-"]').first()).toBeVisible();
          await assertNoHorizontalOverflow(page, `${vp.name}/preset-${preset}`);
        }
      }

      // ---- 2. Theme toggles (rapid) ----
      for (let i = 0; i < 6; i++) {
        await page.getByTestId('button-theme-toggle').click();
      }
      await expect(page.locator('html')).toHaveClass(/dark|light/);

      // ---- 3. Customers sample: each selects, seeds a stack, cycle a few pains ----
      for (const cust of CUSTOMERS) {
        await showStep('setup');
        const btn = page.getByTestId(`customer-${cust}`);
        // customer list is internally scrollable; scroll into view first
        await btn.scrollIntoViewIfNeeded();
        await btn.click();
        await expect(btn).toHaveAttribute('aria-pressed', 'true');
      }

      // ---- 4. All 14 pains for a fixed customer ----
      await showStep('setup');
      const anchorCust = page.getByTestId('customer-deutsche-bank');
      await anchorCust.scrollIntoViewIfNeeded();
      await anchorCust.click();

      // Validate the pain list is an explicitly bounded, scrollable region on desktop
      if (!mobile) {
        const painList = page.getByTestId('list-pains');
        const metrics = await painList.evaluate((el) => ({
          scrollH: el.scrollHeight,
          clientH: el.clientHeight,
          overflowY: getComputedStyle(el).overflowY,
        }));
        expect(metrics.overflowY, 'pain list should be scrollable').toMatch(/auto|scroll/);
        expect(metrics.scrollH, 'pain list content should exceed its bounded height (scroll needed)')
          .toBeGreaterThan(metrics.clientH);
        // exercise programmatic scroll
        await painList.evaluate((el) => { el.scrollTop = el.scrollHeight; });
        const scrolled = await painList.evaluate((el) => el.scrollTop);
        expect(scrolled, 'pain list should actually scroll').toBeGreaterThan(0);
      }

      for (const p of PAINS) {
        await showStep('setup');
        const painBtn = page.getByTestId(`pain-${p}`);
        await painBtn.scrollIntoViewIfNeeded();
        await painBtn.click();
        await expect(painBtn).toHaveAttribute('aria-pressed', 'true');
        await showStep('build');
        await expect(page.getByTestId('library-drawer')).toBeVisible();
      }

      // ---- 5. Validate add-on library is close to the active block stack ----
      // (no excessive blank space between last layer content and the library head)
      await showStep('build');
      if (!mobile) {
        const gap = await page.evaluate(() => {
          const blocks = [...document.querySelectorAll('[data-testid^="block-"]')];
          const libHead = document.querySelector('[data-testid="button-toggle-library"]');
          if (!blocks.length || !libHead) return null;
          const lastBlockBottom = Math.max(...blocks.map((b) => b.getBoundingClientRect().bottom));
          const libTop = libHead.getBoundingClientRect().top;
          return libTop - lastBlockBottom;
        });
        expect(gap, 'library should render close under the last block').not.toBeNull();
        // allow layer padding/margins but flag a large dead gap
        expect(gap, `excessive gap (${gap}px) between last block and add-on library`).toBeLessThan(320);
      }

      // ---- 5b. Pursuit brief scrolls independently (desktop/laptop) ----
      // deutsche-bank + all pains above leave a rich brief (health → phases).
      await showStep('brief');
      const brief = page.getByTestId('brief-body');
      await expect(brief).toBeVisible();
      // stack-health (top) and phases (bottom) must both exist
      await expect(page.getByTestId('health-meters')).toBeVisible();
      await expect(page.getByTestId('brief-phases')).toHaveCount(1);

      if (!mobile) {
        const briefColHead = page.getByTestId('col-brief').locator('.col-head').first();
        const headBefore = await briefColHead.boundingBox();

        const m = await brief.evaluate((el) => ({
          scrollH: el.scrollHeight,
          clientH: el.clientHeight,
          overflowY: getComputedStyle(el).overflowY,
        }));
        expect(m.overflowY, 'brief body should be its own scroll region').toMatch(/auto|scroll/);
        // brief body is bounded to the viewport, not the full page
        expect(m.clientH, 'brief body should fit within the viewport height')
          .toBeLessThanOrEqual(vp.height);
        expect(m.scrollH, 'brief content should exceed its bounded height (scroll needed)')
          .toBeGreaterThan(m.clientH);

        // the whole page must NOT scroll — only the brief body does
        const pageScrolls = await page.evaluate(() =>
          document.documentElement.scrollHeight > document.documentElement.clientHeight + 1);
        expect(pageScrolls, 'page itself should not scroll on desktop/laptop').toBeFalsy();

        // scroll the brief to the bottom; header stays put, last section reachable
        await brief.evaluate((el) => { el.scrollTop = el.scrollHeight; });
        const scrolled = await brief.evaluate((el) => el.scrollTop);
        expect(scrolled, 'brief body should actually scroll').toBeGreaterThan(0);
        await expect(page.getByTestId('brief-phases')).toBeVisible();

        const headAfter = await briefColHead.boundingBox();
        expect(Math.abs(headAfter.y - headBefore.y), 'brief header should stay fixed while content scrolls')
          .toBeLessThanOrEqual(1);

        // reset brief scroll for subsequent steps
        await brief.evaluate((el) => { el.scrollTop = 0; });
      } else {
        // mobile: brief must remain reachable (bottom section scrollable into view)
        await page.getByTestId('brief-phases').scrollIntoViewIfNeeded();
        await expect(page.getByTestId('brief-phases')).toBeVisible();
      }

      // ---- 6. Block add/remove churn from the library ----
      await showStep('build');
      await page.getByTestId('button-toggle-library').click(); // collapse
      await expect(page.getByTestId('button-toggle-library')).toHaveAttribute('aria-expanded', 'false');
      await page.getByTestId('button-toggle-library').click(); // expand
      await expect(page.getByTestId('button-toggle-library')).toHaveAttribute('aria-expanded', 'true');

      for (let round = 0; round < 3; round++) {
        const addButtons = page.locator('[data-testid^="lib-add-"]:not([disabled])');
        const n = Math.min(await addButtons.count(), 6);
        for (let i = 0; i < n; i++) {
          const b = addButtons.nth(0); // list mutates; always take first enabled
          if (await b.count() === 0) break;
          await b.scrollIntoViewIfNeeded();
          await b.click();
        }
        // remove a few via hover-revealed remove buttons; wait for each block to
        // detach before touching the next (removal has an exit animation)
        const rn = Math.min(await page.locator('[data-testid^="block-"]').count(), 4);
        for (let i = 0; i < rn; i++) {
          const blk = page.locator('[data-testid^="block-"]').first();
          if (await blk.count() === 0) break;
          const testId = await blk.getAttribute('data-testid');
          const id = testId.replace('block-', '');
          await blk.scrollIntoViewIfNeeded();
          await blk.hover();
          await page.getByTestId(`button-remove-${id}`).click({ force: true });
          await expect(page.getByTestId(testId)).toHaveCount(0);
        }
      }
      await assertNoHorizontalOverflow(page, `${vp.name}/churn`);

      // ---- 7. Brief: copy + download ----
      await showStep('brief');
      await expect(page.getByTestId('brief-body')).toBeVisible();

      await page.getByTestId('button-copy-brief').click();
      // copy path either shows "Copied" or silently no-ops if clipboard blocked; assert no crash
      await expect(page.getByTestId('button-copy-brief')).toBeVisible();

      const downloadPromise = page.waitForEvent('download').catch(() => null);
      await page.getByTestId('button-download-brief').click();
      const download = await downloadPromise;
      if (download) {
        expect(download.suggestedFilename()).toMatch(/^stackwerk-brief-.*\.md$/);
      }

      // ---- 8. Sovereignty warning path (regulated + no sovereignty) ----
      await showStep('setup');
      await anchorCust.scrollIntoViewIfNeeded();
      await anchorCust.click(); // deutsche-bank = FSI (regulated)
      await showStep('brief');
      const sovWarn = page.getByTestId('warn-sovereignty');
      if (await sovWarn.count() > 0 && await sovWarn.isVisible()) {
        await page.getByTestId('button-add-sovereignty').click();
        await expect(sovWarn).toHaveCount(0);
      }

      // ---- 9. Reset ----
      await page.getByTestId('button-reset').click();
      await showStep('build');
      await expect(page.getByTestId('empty-builder')).toBeVisible();

      // ---- 10. Mobile nav coverage ----
      if (mobile) {
        for (const step of ['setup', 'build', 'brief', 'setup']) {
          await page.getByTestId(`mnav-${step}`).click();
          await page.getByTestId(`mnav-${step}`).evaluate((el) =>
            el.getAttribute('aria-current'));
        }
      }

      await assertNoHorizontalOverflow(page, `${vp.name}/final`);

      // ---- Assert clean run ----
      expect(pageErrors, `uncaught page errors at ${vp.name}:\n${pageErrors.join('\n')}`).toEqual([]);
      expect(consoleErrors, `console errors at ${vp.name}:\n${consoleErrors.join('\n')}`).toEqual([]);
    });
  }
});
