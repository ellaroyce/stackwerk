// Minimal inline icon set (stroke, currentColor). 20px default.
const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const IconSun = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...s} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const IconMoon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...s} {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
);
export const IconSearch = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...s} {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);
export const IconPlus = (p) => (
  <svg width="14" height="14" viewBox="0 0 24 24" {...s} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconX = (p) => (
  <svg width="14" height="14" viewBox="0 0 24 24" {...s} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>
);
export const IconCopy = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...s} {...p}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
);
export const IconCheck = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...s} {...p}><path d="m20 6-11 11-5-5" /></svg>
);
export const IconDownload = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...s} {...p}><path d="M12 3v12M7 10l5 5 5-5M4 21h16" /></svg>
);
export const IconWarn = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...s} {...p}><path d="M12 9v4M12 17h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
);
export const IconChevron = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...s} {...p}><path d="m6 9 6 6 6-6" /></svg>
);
export const IconLayers = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...s} {...p}><path d="m12 2 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5" /></svg>
);
export const IconTarget = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...s} {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>
);
export const IconBuild = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...s} {...p}><rect x="3" y="13" width="8" height="7" rx="1" /><rect x="13" y="13" width="8" height="7" rx="1" /><rect x="8" y="4" width="8" height="7" rx="1" /></svg>
);

// Brand logo — stacked interlocking blocks. Scales via viewBox.
export const Logo = ({ size = 30 }) => (
  <svg className="brand-logo" width={size} height={size} viewBox="0 0 32 32" fill="none" role="img" aria-label="Stackwerk logo">
    <rect x="4" y="19" width="24" height="7" rx="2" fill="currentColor" />
    <rect x="7" y="11" width="18" height="7" rx="2" fill="currentColor" opacity="0.72" />
    <rect x="10" y="4" width="12" height="6" rx="1.8" fill="currentColor" opacity="0.5" />
    <circle cx="10" cy="18.5" r="1.3" fill="var(--bg)" />
    <circle cx="16" cy="18.5" r="1.3" fill="var(--bg)" />
    <circle cx="22" cy="18.5" r="1.3" fill="var(--bg)" />
  </svg>
);
