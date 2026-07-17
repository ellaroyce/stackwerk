import { defineConfig } from '@playwright/test';

// Stress test drives the app end-to-end against a locally served dev build.
export default defineConfig({
  testDir: './tests',
  timeout: 180_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'retain-on-failure',
    // grant clipboard so the "Copy brief" path can be exercised
    permissions: ['clipboard-read', 'clipboard-write'],
  },
  webServer: {
    command: 'npm run dev -- --port 5173 --strictPort',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
