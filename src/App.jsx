import { useState, useMemo, useEffect } from 'react';
import {
  LAYERS, PRODUCTS, SIGNAL_KEYS, SIGNAL_LABELS, SUBSTITUTIONS,
  PAINS, CUSTOMERS, INDUSTRIES, REGULATED_INDUSTRIES, PRESETS, pursuitPhases,
} from './data.js';
import {
  Logo, IconSun, IconMoon, IconSearch, IconPlus, IconX, IconCopy, IconCheck,
  IconDownload, IconWarn, IconChevron,
} from './icons.jsx';

// -------------------------------------------------------------------------
// helpers
// -------------------------------------------------------------------------
function levelClass(v, max) {
  if (v <= 0) return 'lvl-none';
  const r = v / max;
  if (r < 0.34) return 'lvl-low';
  if (r < 0.67) return 'lvl-mid';
  return 'lvl-high';
}

function computeHealth(ids) {
  const totals = { data: 0, security: 0, sovereignty: 0, ai: 0, integration: 0 };
  ids.forEach((id) => {
    const p = PRODUCTS[id];
    if (!p) return;
    SIGNAL_KEYS.forEach((k) => { totals[k] += p.signals[k] || 0; });
  });
  const targets = { data: 6, security: 5, sovereignty: 4, ai: 6, integration: 5 };
  const pct = {};
  SIGNAL_KEYS.forEach((k) => { pct[k] = Math.min(100, Math.round((totals[k] / targets[k]) * 100)); });
  return { totals, pct };
}

function deriveStack(customer, pain) {
  if (!pain) return { core: [], addons: [], subs: [] };
  if (customer && customer.stacks && customer.stacks[pain.id]) {
    const cs = customer.stacks[pain.id];
    return { core: cs.core || [], addons: cs.addons || [], subs: cs.subs || [] };
  }
  return { core: pain.core || [], addons: pain.addons || [], subs: pain.subs || [] };
}

function orderedPains(industry, query) {
  let list = PAINS.slice();
  if (query) {
    const q = query.toLowerCase();
    list = list.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.short.toLowerCase().includes(q) ||
      p.keywords.some((k) => k.includes(q)));
  }
  if (industry) {
    list.sort((a, b) => (a.industries.includes(industry) ? 0 : 1) - (b.industries.includes(industry) ? 0 : 1));
  }
  return list;
}

// -------------------------------------------------------------------------
function useTheme() {
  // Dark-first: the navy Pruna Secura identity is the primary brand, so the app
  // opens dark by default. Users can switch to the warm light theme via the toggle.
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.classList.toggle('light', !dark);
  }, [dark]);
  return [dark, setDark];
}

// =========================================================================
export default function App() {
  const [dark, setDark] = useTheme();

  const [mode, setMode] = useState('customer');
  const [customerId, setCustomerId] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [custQuery, setCustQuery] = useState('');

  const [painId, setPainId] = useState(null);
  const [painQuery, setPainQuery] = useState('');

  const [blocks, setBlocks] = useState([]);
  const [animating, setAnimating] = useState({});
  const [libOpen, setLibOpen] = useState(true);
  const [mobileStep, setMobileStep] = useState('setup'); // 'setup' | 'build' | 'brief'

  const customer = useMemo(() => CUSTOMERS.find((c) => c.id === customerId) || null, [customerId]);
  const activeIndustry = mode === 'customer' ? (customer ? customer.industry : null) : industry;
  const pain = useMemo(() => PAINS.find((p) => p.id === painId) || null, [painId]);
  const isRegulated = activeIndustry ? REGULATED_INDUSTRIES.includes(activeIndustry) : false;
  const derived = useMemo(() => deriveStack(customer, pain), [customer, pain]);

  function seedBlocks(cust, pn) {
    const d = deriveStack(cust, pn);
    const seeded = [...d.core, ...d.addons];
    setBlocks(seeded);
    const a = {};
    seeded.forEach((id) => { a[id] = 'adding'; });
    setAnimating(a);
    setTimeout(() => setAnimating({}), 320);
  }

  function pickCustomer(id) {
    setMode('customer');
    setCustomerId(id);
    const c = CUSTOMERS.find((x) => x.id === id);
    const firstPain = c && c.pains && c.pains[0] ? c.pains[0] : null;
    setPainId(firstPain);
    if (firstPain) seedBlocks(c, PAINS.find((p) => p.id === firstPain));
    else setBlocks([]);
  }
  function pickIndustry(ind) {
    setMode('industry');
    setIndustry(ind);
    setCustomerId(null);
    setPainId(null);
    setBlocks([]);
  }
  function pickPain(id) {
    setPainId(id);
    seedBlocks(customer, PAINS.find((p) => p.id === id));
    setMobileStep('build');
  }

  function addBlock(id) {
    if (blocks.includes(id)) return;
    setBlocks((b) => [...b, id]);
    setAnimating((a) => ({ ...a, [id]: 'adding' }));
    setTimeout(() => setAnimating((a) => { const n = { ...a }; delete n[id]; return n; }), 320);
  }
  function removeBlock(id) {
    setAnimating((a) => ({ ...a, [id]: 'removing' }));
    setTimeout(() => {
      setBlocks((b) => b.filter((x) => x !== id));
      setAnimating((a) => { const n = { ...a }; delete n[id]; return n; });
    }, 200);
  }

  function applyPreset(preset) {
    setMode('customer');
    setCustomerId(preset.customerId);
    setPainId(preset.painId);
    setIndustry(null);
    setBlocks(preset.blocks);
    const a = {};
    preset.blocks.forEach((id) => { a[id] = 'adding'; });
    setAnimating(a);
    setTimeout(() => setAnimating({}), 340);
    setMobileStep('build');
    setCustQuery(''); setPainQuery('');
  }

  function resetAll() {
    setCustomerId(null); setIndustry(null); setPainId(null); setBlocks([]);
    setMode('customer'); setMobileStep('setup'); setCustQuery(''); setPainQuery('');
  }

  const health = useMemo(() => computeHealth(blocks), [blocks]);
  const hasSovereignty = blocks.some((id) => (PRODUCTS[id]?.signals.sovereignty || 0) > 0);
  const showSovWarn = isRegulated && pain && blocks.length > 0 && !hasSovereignty;
  const coreSet = useMemo(() => new Set(derived.core), [derived]);

  const filteredCustomers = useMemo(() => {
    let list = CUSTOMERS.slice();
    if (custQuery) {
      const q = custQuery.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q));
    }
    return list;
  }, [custQuery]);

  const painList = useMemo(() => orderedPains(activeIndustry, painQuery), [activeIndustry, painQuery]);

  const activeSubs = useMemo(() => {
    const gcpIds = new Set(blocks);
    const rows = SUBSTITUTIONS.filter((s) => gcpIds.has(s.gcp));
    const seen = new Set();
    return rows.filter((r) => { if (seen.has(r.competitor)) return false; seen.add(r.competitor); return true; });
  }, [blocks]);

  const contextChosen = !!(customerId || industry);

  return (
    <div className="app">
      <a href="#builder" className="skip-link">Skip to solution builder</a>

      {/* ---------------- Topbar ---------------- */}
      <header className="topbar">
        <div className="brand">
          <Logo size={30} />
          <div className="brand-text">
            <span className="brand-name">Stackwerk</span>
            <span className="brand-sub">Turns customer pain into a buildable Google Cloud pursuit</span>
          </div>
        </div>
        <div className="topbar-spacer" />
        <div className="presets" role="group" aria-label="Example recipes">
          <span className="presets-label">Presets</span>
          {PRESETS.map((p) => (
            <button key={p.id} className="preset-chip" data-testid={`preset-${p.id}`} onClick={() => applyPreset(p)}>
              <span className="preset-name">{p.name}</span>
              <span className="preset-tag">{p.tag}</span>
            </button>
          ))}
        </div>
        <div className="topbar-actions">
          <button className="btn btn-sm btn-ghost" data-testid="button-reset" onClick={resetAll}>Reset</button>
          <button
            className="btn btn-icon" data-testid="button-theme-toggle"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={dark}
            onClick={() => setDark((d) => !d)}
          >
            {dark ? <IconSun /> : <IconMoon />}
          </button>
        </div>
      </header>

      {/* ---------------- Workspace: Setup | Builder | Brief ---------------- */}
      <div className="workspace">

        {/* ===== Column 1: Setup (context + pain) ===== */}
        <aside className={`col ${mobileStep === 'setup' ? 'active' : ''}`} aria-label="Steps 1 and 2: context and pain point" data-testid="col-setup">
          <div className="col-head">
            <div className="col-head-row">
              <span className={`step-badge ${contextChosen ? 'done' : ''}`}>1</span>
              <span className="col-title">Choose context</span>
            </div>
            <p className="col-hint">A named DACH account or a generic industry.</p>
          </div>
          <div className="col-scroll setup-scroll">
            <div className="seg" role="group" aria-label="Context mode">
              <button aria-pressed={mode === 'customer'} data-testid="tab-mode-customer"
                onClick={() => { setMode('customer'); }}>Named customer</button>
              <button aria-pressed={mode === 'industry'} data-testid="tab-mode-industry"
                onClick={() => { setMode('industry'); }}>Industry</button>
            </div>

            {mode === 'customer' ? (
              <>
                <div className="search-wrap">
                  <IconSearch />
                  <input className="search-input" type="search" placeholder="Search accounts…"
                    aria-label="Search customers" data-testid="input-customer-search"
                    value={custQuery} onChange={(e) => setCustQuery(e.target.value)} />
                </div>
                <div className="pick-list scroll-list" data-testid="list-customers">
                  {filteredCustomers.map((c) => (
                    <button key={c.id} className="pick" aria-pressed={customerId === c.id}
                      data-testid={`customer-${c.id}`} onClick={() => pickCustomer(c.id)}>
                      <div className="pick-top">
                        <span className={`status-dot status-${c.status}`} aria-hidden="true" />
                        <span className="pick-name">{c.name}</span>
                      </div>
                      <div className="pick-meta">
                        {c.industry} · {c.hq} · {c.status === 'existing' ? 'Existing' : c.status === 'expansion' ? 'Expansion' : 'Prospect'}
                        {c.expansion && c.status === 'existing' ? ' + expand' : ''}
                      </div>
                    </button>
                  ))}
                  {filteredCustomers.length === 0 && <p className="col-hint">No accounts match “{custQuery}”.</p>}
                </div>
              </>
            ) : (
              <>
                <div className="field-label">Industry</div>
                <div className="pick-list scroll-list" data-testid="list-industries">
                  {INDUSTRIES.map((ind) => (
                    <button key={ind} className="pick" aria-pressed={industry === ind}
                      data-testid={`industry-${ind}`} onClick={() => pickIndustry(ind)}>
                      <div className="pick-top">
                        <span className="pick-name">{ind}</span>
                        {REGULATED_INDUSTRIES.includes(ind) && <span className="chip">Regulated</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ---- Step 2: Pain ---- */}
            <div className="col-head-row step2-head">
              <span className={`step-badge ${painId ? 'done' : ''}`}>2</span>
              <span className="col-title">Choose pain point</span>
            </div>
            <p className="col-hint" style={{ marginBottom: 10 }}>
              {activeIndustry ? `Suggested for ${activeIndustry} first.` : 'Pick a context to prioritize these.'}
            </p>
            <div className="search-wrap">
              <IconSearch />
              <input className="search-input" type="search" placeholder="Filter 14 pain points…"
                aria-label="Filter pain points" data-testid="input-pain-search"
                value={painQuery} onChange={(e) => setPainQuery(e.target.value)}
                disabled={!contextChosen} />
            </div>
            <div className="pick-list pain-scroll" data-testid="list-pains">
              {painList.map((p) => {
                const suggested = activeIndustry && p.industries.includes(activeIndustry);
                return (
                  <button key={p.id} className="pain" aria-pressed={painId === p.id}
                    data-testid={`pain-${p.id}`} onClick={() => pickPain(p.id)} disabled={!contextChosen}>
                    {suggested && <div className="pain-suggested">Suggested</div>}
                    <div className="pain-title">{p.short}</div>
                    <div className="pain-full">{p.title}</div>
                  </button>
                );
              })}
              {painList.length === 0 && <p className="col-hint">No pain points match “{painQuery}”.</p>}
            </div>
          </div>
        </aside>

        {/* ===== Column 2: Builder ===== */}
        <main className={`col ${mobileStep === 'build' ? 'active' : ''}`} id="builder" aria-label="Step 3: Build solution" data-testid="col-builder">
          <div className="col-head">
            <div className="col-head-row">
              <span className={`step-badge ${blocks.length ? 'done' : ''}`}>3</span>
              <span className="col-title">Build the solution stack</span>
              {blocks.length > 0 && <span className="layer-count" data-testid="text-block-count">{blocks.length} blocks</span>}
            </div>
            <p className="col-hint">
              {pain
                ? <>Assembling for <strong>{customer ? customer.name : activeIndustry}</strong> — {pain.short}</>
                : 'Interlocking GCP blocks appear here across five layers.'}
            </p>
          </div>

          <div className="builder-scroll" data-testid="builder-scroll">
          <div className="builder-body">
            {!pain ? (
              <div className="empty-canvas" data-testid="empty-builder">
                <Logo size={54} />
                <h3>Start by choosing a context and a pain point</h3>
                <p>Stackwerk assembles the recommended Google Cloud stack as interlocking blocks — Foundation, Core, Intelligence, Experience and Governance — then writes the pursuit brief for you.</p>
              </div>
            ) : (
              LAYERS.map((layer) => {
                const layerBlocks = blocks.filter((id) => PRODUCTS[id] && PRODUCTS[id].layer === layer.id);
                return (
                  <div className="layer" key={layer.id} data-testid={`layer-${layer.id}`}>
                    <div className="layer-head">
                      <span className="layer-name">{layer.name}</span>
                      <span className="layer-hint">{layer.hint}</span>
                      <span className="layer-count">{layerBlocks.length}</span>
                    </div>
                    <div className="layer-blocks">
                      {layerBlocks.length === 0 ? (
                        <div className="layer-empty">No {layer.name.toLowerCase()} block yet — add one from the library below.</div>
                      ) : layerBlocks.map((id) => (
                        <Block key={id} id={id} role={coreSet.has(id) ? 'core' : 'add-on'}
                          state={animating[id]} onRemove={() => removeBlock(id)} />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Library drawer */}
          {pain && (
            <div className="library" data-testid="library-drawer">
              <button className="library-head" aria-expanded={libOpen} data-testid="button-toggle-library"
                onClick={() => setLibOpen((o) => !o)}>
                <IconChevron style={{ transform: libOpen ? 'none' : 'rotate(-90deg)', transition: 'transform .15s' }} />
                <span className="library-title">Product library — compatible add-ons</span>
              </button>
              {libOpen && (
                <div className="library-body">
                  <LibraryGrid derived={derived} blocks={blocks} onAdd={addBlock} />
                </div>
              )}
            </div>
          )}
          </div>
        </main>

        {/* ===== Column 3: Brief ===== */}
        <aside className={`col ${mobileStep === 'brief' ? 'active' : ''}`} aria-label="Pursuit brief" data-testid="col-brief">
          <BriefPanel
            customer={customer} industry={activeIndustry} pain={pain} blocks={blocks}
            derived={derived} health={health} activeSubs={activeSubs}
            isRegulated={isRegulated} showSovWarn={showSovWarn} coreSet={coreSet}
            onAddSovereignty={() => { addBlock('tsystems_sov'); addBlock('assured'); }}
          />
        </aside>
      </div>

      {/* mobile bottom nav */}
      <nav className="mobile-nav" aria-label="Steps">
        <button aria-current={mobileStep === 'setup'} data-testid="mnav-setup" onClick={() => setMobileStep('setup')}>
          <span className="mn-badge">1</span>Setup
        </button>
        <button aria-current={mobileStep === 'build'} data-testid="mnav-build" onClick={() => setMobileStep('build')}>
          <span className="mn-badge">2</span>Build
        </button>
        <button aria-current={mobileStep === 'brief'} data-testid="mnav-brief" onClick={() => setMobileStep('brief')}>
          <span className="mn-badge">3</span>Brief
        </button>
      </nav>

      <footer className="footer-note" data-testid="footer-note">
        <span data-testid="independence-disclaimer">Independent portfolio project. Not affiliated with or endorsed by Google LLC.</span>{' '}
        <span data-testid="methodology-note">Based on OSINT and AI-assisted research.</span>
      </footer>
    </div>
  );
}

// =========================================================================
// Block component
// =========================================================================
function Block({ id, role, state, onRemove }) {
  const p = PRODUCTS[id];
  if (!p) return null;
  return (
    <div className={`block ${state || ''}`} data-testid={`block-${id}`} tabIndex={0}>
      <div className="pins" aria-hidden="true">
        <span className={`pin ${role === 'core' ? 'core' : 'addon'}`} />
        <span className="pin" />
        <span className="pin" />
      </div>
      <span className="block-role">{role}</span>
      <button className="block-remove" aria-label={`Remove ${p.name}`} data-testid={`button-remove-${id}`} onClick={onRemove}>
        <IconX />
      </button>
      <div className="block-cat">{p.cat}</div>
      <div className="block-name">{p.name}</div>
      <div className="block-blurb">{p.blurb}</div>
      <div className="sockets" aria-hidden="true">
        <span className="socket" /><span className="socket" /><span className="socket" />
      </div>
    </div>
  );
}

// =========================================================================
// Library grid — grouped by category, compatible add-ons highlighted
// =========================================================================
function LibraryGrid({ derived, blocks, onAdd }) {
  // suggested add-ons = derived.addons not yet placed, shown first
  const inStack = new Set(blocks);
  const cats = {};
  Object.entries(PRODUCTS).forEach(([id, p]) => {
    if (!cats[p.cat]) cats[p.cat] = [];
    cats[p.cat].push(id);
  });
  const suggested = derived.addons.filter((id) => !inStack.has(id));
  const catOrder = ['Data & Analytics', 'AI / ML', 'Infrastructure', 'Databases', 'Networking', 'Sovereign', 'Security', 'SAP', 'Productivity', 'Industry'];
  return (
    <>
      {suggested.length > 0 && (
        <>
          <div className="library-cat">Recommended add-ons</div>
          <div className="lib-grid" data-testid="lib-suggested">
            {suggested.map((id) => (
              <button key={id} className="lib-item" data-testid={`lib-add-${id}`} onClick={() => onAdd(id)}>
                <IconPlus />{PRODUCTS[id].name}
              </button>
            ))}
          </div>
        </>
      )}
      {catOrder.filter((c) => cats[c]).map((cat) => (
        <div key={cat}>
          <div className="library-cat">{cat}</div>
          <div className="lib-grid">
            {cats[cat].map((id) => {
              const has = inStack.has(id);
              return (
                <button key={id} className={`lib-item ${has ? 'in-stack' : ''}`} disabled={has}
                  data-testid={`lib-add-${id}`} onClick={() => onAdd(id)}>
                  {has ? <IconCheck /> : <IconPlus />}{PRODUCTS[id].name}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

// =========================================================================
// Brief panel
// =========================================================================
function BriefPanel({ customer, industry, pain, blocks, derived, health, activeSubs, isRegulated, showSovWarn, coreSet, onAddSovereignty }) {
  const [copied, setCopied] = useState(false);

  const contextName = customer ? customer.name : (industry ? `${industry} (generic)` : null);
  const phases = pursuitPhases(pain, isRegulated);
  const complianceSignals = useMemo(() => {
    const set = new Set();
    if (isRegulated) { set.add('GDPR'); }
    if (industry === 'FSI' || industry === 'Capital Markets') { set.add('DORA'); set.add('BaFin'); }
    if (industry === 'Healthcare' || industry === 'Pharma') { set.add('EU AI Act'); }
    if (industry === 'Public Sector') { set.add('BSI'); set.add('NIS2'); }
    blocks.forEach((id) => {
      if (id === 'bsi_c5') set.add('BSI C5');
      if (id === 'eu_boundary') set.add('EU Data Boundary');
      if (id === 'tsystems_sov') set.add('Germany Data Boundary');
      if (id === 'assured') set.add('Assured Workloads');
    });
    return [...set];
  }, [isRegulated, industry, blocks]);

  function buildBriefText() {
    const L = [];
    L.push('STACKWERK — GOOGLE CLOUD PURSUIT BRIEF');
    L.push('='.repeat(42));
    L.push('');
    L.push(`Context:      ${contextName || '—'}`);
    if (customer) {
      L.push(`Industry:     ${customer.industry} · HQ ${customer.hq}`);
      L.push(`Status:       ${customer.status}${customer.expansion ? ' (expansion target)' : ''}`);
      L.push(`Footprint:    ${customer.footprint}`);
    } else if (industry) {
      L.push(`Industry:     ${industry}${isRegulated ? ' (regulated)' : ''}`);
    }
    L.push(`Pain point:   ${pain ? pain.title : '—'}`);
    L.push('');
    L.push('RECOMMENDED NARRATIVE');
    L.push('-'.repeat(42));
    L.push(pain ? pain.narrative : '');
    if (customer) { L.push(''); L.push(`PL angle: ${customer.plAngle}`); }
    L.push('');
    L.push('CORE STACK');
    L.push('-'.repeat(42));
    blocks.filter((id) => coreSet.has(id)).forEach((id) => L.push(`  • ${PRODUCTS[id].name} — ${PRODUCTS[id].blurb}`));
    const adds = blocks.filter((id) => !coreSet.has(id));
    if (adds.length) {
      L.push(''); L.push('ADD-ONS (LAND & EXPAND)'); L.push('-'.repeat(42));
      adds.forEach((id) => L.push(`  • ${PRODUCTS[id].name}`));
    }
    if (activeSubs.length) {
      L.push(''); L.push('COMPETITOR SUBSTITUTIONS'); L.push('-'.repeat(42));
      activeSubs.forEach((s) => L.push(`  • ${s.competitor} (${s.vendor})  →  ${PRODUCTS[s.gcp].name}`));
    }
    L.push(''); L.push('STACK HEALTH'); L.push('-'.repeat(42));
    SIGNAL_KEYS.forEach((k) => L.push(`  ${SIGNAL_LABELS[k].padEnd(13)} ${health.pct[k]}%`));
    if (complianceSignals.length) {
      L.push(''); L.push('DACH COMPLIANCE SIGNALS'); L.push('-'.repeat(42));
      L.push('  ' + complianceSignals.join(', '));
    }
    L.push(''); L.push('STAGED PURSUIT'); L.push('-'.repeat(42));
    phases.forEach((ph) => { L.push(`  ${ph.phase}`); L.push(`    ${ph.detail}`); });
    L.push(''); L.push('—'.repeat(21));
    L.push('Independent portfolio project. Not affiliated with or endorsed by Google LLC.');
    L.push('Based on OSINT and AI-assisted research. Customer entries are generic archetypes, not real accounts.');
    return L.join('\n');
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(buildBriefText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) { /* clipboard unavailable */ }
  }
  function downloadBrief() {
    const blob = new Blob([buildBriefText()], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const slug = (contextName || 'pursuit').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    a.href = url; a.download = `stackwerk-brief-${slug}.md`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  if (!pain) {
    return (
      <>
        <div className="col-head">
          <span className="col-title">Pursuit brief</span>
          <p className="col-hint">Auto-writes as you build.</p>
        </div>
        <div className="brief-body">
          <p className="col-hint">Select a context and pain point, and Stackwerk drafts the customer narrative, core stack, substitutions, compliance signals and staged pursuit here.</p>
        </div>
      </>
    );
  }

  const coreBlocks = blocks.filter((id) => coreSet.has(id));
  const addonBlocks = blocks.filter((id) => !coreSet.has(id));

  return (
    <>
      <div className="col-head">
        <span className="col-title">Pursuit brief</span>
        <p className="col-hint">Live summary of your build.</p>
      </div>

      <div className="brief-body" data-testid="brief-body">
        {/* Stack health */}
        <div className="brief-block">
          <div className="brief-h">Stack health</div>
          <div className="health" data-testid="health-meters">
            {SIGNAL_KEYS.map((k) => (
              <div className="meter-row" key={k}>
                <span className="meter-label">{SIGNAL_LABELS[k]}</span>
                <span className="meter-track">
                  <span className={`meter-fill ${levelClass(health.pct[k], 100)}`}
                    style={{ width: `${health.pct[k]}%` }} data-testid={`meter-${k}`} />
                </span>
                <span className="meter-val">{health.pct[k]}%</span>
              </div>
            ))}
          </div>
          {showSovWarn && (
            <div className="warn" role="alert" data-testid="warn-sovereignty">
              <IconWarn />
              <span>
                {industry || customer?.industry} is regulated but the stack has no sovereignty/compliance block.{' '}
                <button data-testid="button-add-sovereignty" onClick={onAddSovereignty}>Add T-Systems Sovereign + Assured Workloads</button>
              </span>
            </div>
          )}
        </div>

        {/* Context */}
        <div className="brief-block">
          <div className="brief-h">Customer</div>
          <div className="brief-cust-name" data-testid="text-brief-customer">{contextName}</div>
          {customer && (
            <div className="pick-meta" style={{ marginTop: 3 }}>
              {customer.industry} · {customer.hq} · {customer.status}{customer.expansion ? ' + expand' : ''}
            </div>
          )}
          {customer && <p className="pick-meta" style={{ marginTop: 6 }}>{customer.footprint}</p>}
        </div>

        {/* Pain + narrative */}
        <div className="brief-block">
          <div className="brief-h">Pain point</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 6 }} data-testid="text-brief-pain">{pain.title}</div>
          <div className="brief-h">Recommended narrative</div>
          <p className="brief-narrative" data-testid="text-brief-narrative">{pain.narrative}</p>
          {customer && <p className="brief-narrative" style={{ marginTop: 8, color: 'var(--ink-3)' }}><strong style={{ color: 'var(--ink-2)' }}>PL angle:</strong> {customer.plAngle}</p>}
        </div>

        {/* Core stack */}
        <div className="brief-block">
          <div className="brief-h">Core stack</div>
          <div className="pill-list" data-testid="brief-core">
            {coreBlocks.length ? coreBlocks.map((id) => (
              <span key={id} className="pill core">{PRODUCTS[id].name}</span>
            )) : <span className="col-hint">No core blocks.</span>}
          </div>
        </div>

        {/* Add-ons */}
        {addonBlocks.length > 0 && (
          <div className="brief-block">
            <div className="brief-h">Add-ons</div>
            <div className="pill-list" data-testid="brief-addons">
              {addonBlocks.map((id) => <span key={id} className="pill">{PRODUCTS[id].name}</span>)}
            </div>
          </div>
        )}

        {/* Substitutions */}
        {activeSubs.length > 0 && (
          <div className="brief-block">
            <div className="brief-h">Competitor substitutions</div>
            <div data-testid="brief-subs">
              {activeSubs.map((s, i) => (
                <div className="sub-row" key={i} data-testid={`sub-${s.gcp}-${i}`}>
                  <span className="sub-comp">{s.competitor}</span>
                  <span className="sub-arrow">→</span>
                  <span className="sub-gcp">{PRODUCTS[s.gcp].name}</span>
                  <span className="vendor-chip">{s.vendor}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compliance signals */}
        {complianceSignals.length > 0 && (
          <div className="brief-block">
            <div className="brief-h">DACH compliance signals</div>
            <div className="pill-list" data-testid="brief-compliance">
              {complianceSignals.map((c) => <span key={c} className="compliance-tag">{c}</span>)}
            </div>
          </div>
        )}

        {/* Phases */}
        <div className="brief-block">
          <div className="brief-h">Staged pursuit</div>
          <div data-testid="brief-phases">
            {phases.map((ph, i) => (
              <div className="phase" key={i}>
                <span className="phase-num" />
                <div>
                  <div className="phase-title">{ph.phase}</div>
                  <div className="phase-detail">{ph.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="brief-actions">
        <button className={`btn ${copied ? 'copy-ok' : ''}`} data-testid="button-copy-brief" onClick={copyBrief}>
          {copied ? <><IconCheck /> Copied</> : <><IconCopy /> Copy brief</>}
        </button>
        <button className="btn btn-primary" data-testid="button-download-brief" onClick={downloadBrief}>
          <IconDownload /> Download
        </button>
      </div>
    </>
  );
}
