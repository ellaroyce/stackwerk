// Targeted regression for the Stack Health bars: fills must be proportional to
// their numeric percentage and use the Pruna palette (electric blue default,
// lime at 100%), visibly distinct from the track in dark mode. Guards against
// the inline-span/no-background bug where fills collapsed to zero width.

import { test, expect } from '@playwright/test';

const KEYS = ['data', 'security', 'sovereignty', 'ai', 'integration'];

function parseRGB(s) { return s.match(/\d+(\.\d+)?/g).map(Number); }
function close(a, b) { return Math.hypot(...a.slice(0, 3).map((v, i) => v - b[i])) < 24; }

async function readMeters(page) {
  const out = [];
  for (const k of KEYS) {
    const fill = page.getByTestId(`meter-${k}`);
    if (await fill.count() === 0) continue;
    const track = fill.locator('xpath=..');
    const pct = Number(await track.getAttribute('aria-valuenow'));
    const fillW = await fill.evaluate((el) => el.getBoundingClientRect().width);
    const trackW = await track.evaluate((el) => el.getBoundingClientRect().width);
    const fillBg = await fill.evaluate((el) => getComputedStyle(el).backgroundColor);
    const trackBg = await track.evaluate((el) => getComputedStyle(el).backgroundColor);
    out.push({ k, pct, fillW, trackW, fillBg, trackBg });
  }
  return out;
}

for (const vp of [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'mobile-390', width: 390, height: 844 },
]) {
  test(`stack health bars render proportional visible fills (${vp.name})`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');
    await expect(page.getByTestId('button-theme-toggle')).toBeVisible();

    // Force dark theme (the reported bug was dark-mode only).
    if (!(await page.evaluate(() => document.documentElement.classList.contains('dark')))) {
      await page.getByTestId('button-theme-toggle').click();
    }
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Selecting a customer auto-seeds a full block stack (mixed percentages).
    const mnav = page.getByTestId('mnav-setup');
    if (await mnav.isVisible()) await mnav.click();
    const cust = page.getByTestId('customer-deutsche-bank');
    await cust.scrollIntoViewIfNeeded();
    await cust.click();
    await expect(cust).toHaveAttribute('aria-pressed', 'true');
    const mnavBrief = page.getByTestId('mnav-brief');
    if (await mnavBrief.isVisible()) await mnavBrief.click();

    await expect(page.getByTestId('health-meters')).toBeVisible();
    const meters = await readMeters(page);
    expect(meters.length, 'all five meters render').toBe(5);

    // Resolve the palette tokens to concrete rgb() as the browser computes them.
    const [accent, lime] = (await page.evaluate(() => {
      const toRgb = (v) => {
        const e = document.createElement('span');
        e.style.color = v; document.body.appendChild(e);
        const c = getComputedStyle(e).color; e.remove(); return c;
      };
      return [toRgb('var(--accent)'), toRgb('var(--lime)')];
    })).map(parseRGB);

    for (const m of meters) {
      // fill width tracks the percentage (within a couple px of track * pct)
      const expected = m.trackW * m.pct / 100;
      expect(Math.abs(m.fillW - expected),
        `${m.k}: fill width ${m.fillW.toFixed(1)}px should match ${m.pct}% of track ${m.trackW.toFixed(1)}px`)
        .toBeLessThanOrEqual(3);
      if (m.pct > 0) {
        // fill must be visible: non-transparent and distinct from the track
        expect(m.fillBg, `${m.k}: fill must not be transparent`).not.toMatch(/rgba\(.*,\s*0\)/);
        expect(close(parseRGB(m.fillBg), parseRGB(m.trackBg)),
          `${m.k}: fill color ${m.fillBg} must differ from track ${m.trackBg}`).toBeFalsy();
        // Pruna palette: lime at 100%, electric blue otherwise
        const target = m.pct >= 100 ? lime : accent;
        expect(close(parseRGB(m.fillBg), target),
          `${m.k} (${m.pct}%): fill ${m.fillBg} should be ${m.pct >= 100 ? 'lime' : 'accent'} ${target}`).toBeTruthy();
      }
    }

    // Distinct percentages must produce distinct, strictly-ordered widths.
    const byPct = [...new Map(meters.map((m) => [m.pct, m])).values()]
      .filter((m) => m.pct > 0).sort((a, b) => a.pct - b.pct);
    expect(byPct.length, 'at least two distinct non-zero percentages present').toBeGreaterThanOrEqual(2);
    for (let i = 1; i < byPct.length; i++) {
      expect(byPct[i].fillW, `${byPct[i].k} (${byPct[i].pct}%) wider than ${byPct[i - 1].k} (${byPct[i - 1].pct}%)`)
        .toBeGreaterThan(byPct[i - 1].fillW + 1);
    }

    // Log observed state (mirrors the reported 33/40/50/100 shape) + screenshot.
    console.log(`[${vp.name}]`, meters.map((m) => `${m.k}=${m.pct}%:${m.fillW.toFixed(0)}px`).join(' '));
    await page.getByTestId('health-meters').screenshot({ path: `/tmp/health-${vp.name}.png` });
  });
}
