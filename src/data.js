// Illustrative GCP solutions dataset for the pursuit constructor.
// Compiled from public product information and OSINT plus AI-assisted research.
// Customer entries are generic industry archetypes, not real accounts; content is
// illustrative and not authoritative. No pricing or private-account claims.

// ---------------------------------------------------------------------------
// LAYERS — ordered assembly tiers for the block workspace
// ---------------------------------------------------------------------------
export const LAYERS = [
  { id: 'foundation',  name: 'Foundation',          hint: 'Landing zone, infra & data platform' },
  { id: 'core',        name: 'Core',                hint: 'The workload that solves the pain' },
  { id: 'intelligence',name: 'Intelligence',        hint: 'AI, ML & analytics on top' },
  { id: 'experience',  name: 'Experience',          hint: 'User-facing apps, agents & CX' },
  { id: 'governance',  name: 'Governance & Security', hint: 'Sovereignty, compliance & SecOps' },
];

// ---------------------------------------------------------------------------
// PRODUCTS — GCP solutions catalog, tagged with layer + capability signals.
// signals feed the live stack-health meters (data, security, sovereignty, ai, integration).
// ---------------------------------------------------------------------------
// helper category → default layer is set explicitly per product.
export const PRODUCTS = {
  // Data & Analytics -------------------------------------------------------
  bigquery:        { name: 'BigQuery',                         cat: 'Data & Analytics', layer: 'core',        signals: { data: 3, ai: 1, integration: 1 }, blurb: 'Serverless multi-cloud data warehouse; anchor of the Agentic Data Cloud.' },
  bigquery_omni:   { name: 'BigQuery Omni',                    cat: 'Data & Analytics', layer: 'foundation',  signals: { data: 2, integration: 3 }, blurb: 'Query data in AWS S3 / Azure Blob without moving it — cross-cloud federation.' },
  looker:          { name: 'Looker',                           cat: 'Data & Analytics', layer: 'experience',  signals: { data: 1, ai: 1 }, blurb: 'Governed semantic BI layer (LookML) with agentic dashboards.' },
  dataplex:        { name: 'Dataplex Universal Catalog',       cat: 'Data & Analytics', layer: 'foundation',  signals: { data: 3, integration: 1 }, blurb: 'Unified data governance, catalog and data-mesh fabric.' },
  dataflow:        { name: 'Dataflow',                         cat: 'Data & Analytics', layer: 'foundation',  signals: { data: 2, integration: 2 }, blurb: 'Managed stream & batch data processing.' },
  pubsub:          { name: 'Pub/Sub',                          cat: 'Data & Analytics', layer: 'foundation',  signals: { data: 1, integration: 3 }, blurb: 'Global event ingestion and messaging backbone.' },
  datastream:      { name: 'Datastream CDC',                   cat: 'Data & Analytics', layer: 'foundation',  signals: { data: 2, integration: 2 }, blurb: 'Serverless change-data-capture for real-time replication.' },
  earth_engine:    { name: 'Earth Engine',                     cat: 'Data & Analytics', layer: 'intelligence',signals: { data: 2, ai: 1 }, blurb: 'Planetary-scale geospatial analytics for climate & ESG.' },

  // AI / ML ----------------------------------------------------------------
  vertex_ai:       { name: 'Vertex AI',                        cat: 'AI / ML',          layer: 'intelligence',signals: { ai: 3, integration: 1 }, blurb: 'End-to-end platform to build, tune and serve models & agents.' },
  gemini_ent:      { name: 'Gemini Enterprise',               cat: 'AI / ML',          layer: 'experience',  signals: { ai: 2 }, blurb: 'Enterprise Gemini assistant across knowledge and workflows.' },
  agentspace:      { name: 'Agentspace',                       cat: 'AI / ML',          layer: 'experience',  signals: { ai: 2, integration: 1 }, blurb: 'Multi-agent workspace grounding agents in enterprise data.' },
  agent_builder:   { name: 'Vertex AI Agent Builder',         cat: 'AI / ML',          layer: 'experience',  signals: { ai: 2, integration: 1 }, blurb: 'Build and orchestrate task-specific enterprise agents.' },
  vertex_search:   { name: 'Vertex AI Search',               cat: 'AI / ML',          layer: 'experience',  signals: { ai: 2, data: 1 }, blurb: 'Enterprise search & RAG grounding over your corpus.' },
  document_ai:     { name: 'Document AI',                     cat: 'AI / ML',          layer: 'intelligence',signals: { ai: 2, data: 1 }, blurb: 'Structured extraction from documents for KYC, claims, notes.' },
  contact_center:  { name: 'Contact Center AI',              cat: 'AI / ML',          layer: 'experience',  signals: { ai: 2 }, blurb: 'Conversational CX for retail branches & service desks.' },
  vertex_vision:   { name: 'Vertex AI Vision',              cat: 'AI / ML',          layer: 'intelligence',signals: { ai: 2, data: 1 }, blurb: 'Computer vision for quality inspection & CCTV analytics.' },
  medlm:           { name: 'MedLM',                          cat: 'AI / ML',          layer: 'intelligence',signals: { ai: 2 }, blurb: 'Healthcare-tuned models for clinical decision support.' },
  vertex_commerce: { name: 'Vertex AI Search for Commerce', cat: 'AI / ML',          layer: 'experience',  signals: { ai: 2, data: 1 }, blurb: 'Retail search, recommendations & Discovery AI.' },
  vertex_forecast: { name: 'Vertex AI Forecasting',         cat: 'AI / ML',          layer: 'intelligence',signals: { ai: 2, data: 1 }, blurb: 'Demand & load forecasting at scale.' },
  auto_ai_agent:   { name: 'Automotive AI Agent',           cat: 'AI / ML',          layer: 'experience',  signals: { ai: 2 }, blurb: 'In-vehicle conversational assistant built on Gemini.' },
  speech:          { name: 'Speech-to-Text / TTS',          cat: 'AI / ML',          layer: 'experience',  signals: { ai: 1 }, blurb: 'Speech recognition and natural voice synthesis.' },
  translation:     { name: 'Translation API',               cat: 'AI / ML',          layer: 'experience',  signals: { ai: 1 }, blurb: 'Multilingual translation for global products.' },
  ai_hypercomputer:{ name: 'AI Hypercomputer (TPU)',        cat: 'AI / ML',          layer: 'foundation',  signals: { ai: 2, data: 1 }, blurb: 'TPU supercompute for training & discovery workloads.' },
  deepmind:        { name: 'DeepMind (AlphaFold / AlphaChip)',cat: 'AI / ML',        layer: 'intelligence',signals: { ai: 3 }, blurb: 'Frontier science models — unique Google differentiation.' },
  aml_ai:          { name: 'AML AI',                        cat: 'AI / ML',          layer: 'intelligence',signals: { ai: 2, security: 1 }, blurb: 'Anti-money-laundering & market-abuse detection.' },

  // Infrastructure & Modernization ----------------------------------------
  gke:             { name: 'GKE Enterprise',                cat: 'Infrastructure',   layer: 'foundation',  signals: { integration: 2, data: 1 }, blurb: 'Managed multi-cluster Kubernetes for modernization.' },
  anthos:          { name: 'Anthos',                        cat: 'Infrastructure',   layer: 'foundation',  signals: { integration: 3 }, blurb: 'Hybrid & multi-cloud consistency, incl. edge.' },
  cloud_run:       { name: 'Cloud Run',                     cat: 'Infrastructure',   layer: 'core',        signals: { integration: 1 }, blurb: 'Serverless containers for fast digital products.' },
  firebase:        { name: 'Firebase',                      cat: 'Infrastructure',   layer: 'experience',  signals: { integration: 1 }, blurb: 'App platform for rapid customer-facing builds.' },
  apigee:          { name: 'Apigee',                        cat: 'Infrastructure',   layer: 'core',        signals: { integration: 3, security: 1 }, blurb: 'Full-lifecycle API management & monetization.' },
  mfg_data_engine: { name: 'Manufacturing Data Engine',     cat: 'Infrastructure',   layer: 'core',        signals: { data: 2, integration: 2 }, blurb: 'Unifies OT/shop-floor data for factory analytics.' },
  gemini_code:     { name: 'Gemini Code Assist',            cat: 'Infrastructure',   layer: 'experience',  signals: { ai: 1 }, blurb: 'AI pair-programming for AI-native engineering.' },
  cloud_interconnect:{ name: 'Cloud Interconnect',         cat: 'Networking',       layer: 'foundation',  signals: { integration: 2, security: 1 }, blurb: 'Dedicated low-latency links to Google Cloud.' },
  cloud_armor:     { name: 'Cloud Armor',                  cat: 'Networking',       layer: 'governance',  signals: { security: 2 }, blurb: 'DDoS protection & WAF at the edge.' },
  finops_hub:      { name: 'FinOps Hub (CUDs / Active Assist)',cat: 'Infrastructure',layer: 'governance',  signals: { integration: 1 }, blurb: 'Cost optimization: CUDs, Spot VMs, Recommender.' },

  // Databases --------------------------------------------------------------
  alloydb:         { name: 'AlloyDB',                      cat: 'Databases',        layer: 'core',        signals: { data: 2, integration: 1 }, blurb: 'PostgreSQL-compatible DB; Oracle substitution path.' },
  spanner:         { name: 'Spanner',                     cat: 'Databases',        layer: 'core',        signals: { data: 2, integration: 1 }, blurb: 'Globally-consistent DB for ledgers & scale.' },
  cloud_sql:       { name: 'Cloud SQL',                   cat: 'Databases',        layer: 'foundation',  signals: { data: 1 }, blurb: 'Managed relational database service.' },
  bigtable:        { name: 'Cloud Bigtable',             cat: 'Databases',        layer: 'foundation',  signals: { data: 2 }, blurb: 'Low-latency NoSQL for high-throughput workloads.' },
  dms:             { name: 'Database Migration Service',  cat: 'Databases',        layer: 'foundation',  signals: { data: 1, integration: 1 }, blurb: 'Managed migrations off legacy databases.' },

  // Sovereign & Regulated --------------------------------------------------
  gdc:             { name: 'Google Distributed Cloud (GDC)',cat: 'Sovereign',       layer: 'foundation',  signals: { sovereignty: 3, security: 1 }, blurb: 'Air-gapped / connected sovereign infrastructure.' },
  tsystems_sov:    { name: 'T-Systems Sovereign Cloud',   cat: 'Sovereign',        layer: 'governance',  signals: { sovereignty: 3, security: 1 }, blurb: 'Germany Data Boundary — max sovereignty wrapper.' },
  assured:         { name: 'Assured Workloads',           cat: 'Sovereign',        layer: 'governance',  signals: { sovereignty: 2, security: 1 }, blurb: 'Compliance controls & data-residency enforcement.' },
  eu_boundary:     { name: 'EU Data Boundary',            cat: 'Sovereign',        layer: 'governance',  signals: { sovereignty: 2 }, blurb: 'EU-only region locking for GDPR residency.' },
  confidential:    { name: 'Confidential Computing',      cat: 'Sovereign',        layer: 'governance',  signals: { sovereignty: 1, security: 2 }, blurb: 'Encryption of data in-use for regulated workloads.' },
  bsi_c5:          { name: 'BSI C5 Attestation',          cat: 'Sovereign',        layer: 'governance',  signals: { sovereignty: 2, security: 1 }, blurb: 'German cloud security attestation for FSI/public.' },
  sovereign_ctrl:  { name: 'Sovereign Controls',          cat: 'Sovereign',        layer: 'governance',  signals: { sovereignty: 2, security: 1 }, blurb: 'Operational & access controls for sovereignty.' },

  // Security ---------------------------------------------------------------
  chronicle:       { name: 'Chronicle SecOps',            cat: 'Security',         layer: 'governance',  signals: { security: 3 }, blurb: 'SIEM/SOAR — threat detection from years to milliseconds.' },
  scc:             { name: 'Security Command Center',     cat: 'Security',         layer: 'governance',  signals: { security: 3 }, blurb: 'Enterprise cloud security posture management.' },
  mandiant:        { name: 'Mandiant',                    cat: 'Security',         layer: 'governance',  signals: { security: 2 }, blurb: 'Threat intel, attack-surface & incident response.' },
  beyondcorp:      { name: 'BeyondCorp Enterprise',       cat: 'Security',         layer: 'governance',  signals: { security: 2 }, blurb: 'Zero-trust workforce access.' },
  audit_logs:      { name: 'Cloud Audit Logs',            cat: 'Security',         layer: 'governance',  signals: { security: 1, sovereignty: 1 }, blurb: 'Immutable audit trail for DORA/NIS2 reporting.' },
  vertex_explain:  { name: 'Vertex AI Explainability',    cat: 'Security',         layer: 'governance',  signals: { security: 1, ai: 1 }, blurb: 'Model transparency for EU AI Act compliance.' },

  // SAP --------------------------------------------------------------------
  rise_sap:        { name: 'RISE with SAP on GCP',        cat: 'SAP',              layer: 'core',        signals: { integration: 2, data: 1 }, blurb: 'S/4HANA transformation landing zone on Google Cloud.' },
  cortex:          { name: 'Cortex Framework',            cat: 'SAP',              layer: 'intelligence',signals: { data: 2, integration: 2 }, blurb: 'Pre-built SAP data foundation & analytics blocks.' },
  bare_metal_hana: { name: 'Bare Metal for HANA',         cat: 'SAP',              layer: 'foundation',  signals: { integration: 1 }, blurb: 'Certified bare-metal for large HANA instances.' },
  gemini_sap:      { name: 'Gemini for SAP',              cat: 'SAP',              layer: 'experience',  signals: { ai: 2, integration: 1 }, blurb: 'AI copilots for SAP operations.' },

  // Productivity -----------------------------------------------------------
  workspace:       { name: 'Google Workspace',            cat: 'Productivity',     layer: 'experience',  signals: { integration: 1 }, blurb: 'Collaboration suite; sovereign productivity entry.' },

  // Industry ---------------------------------------------------------------
  maps:            { name: 'Maps Platform',               cat: 'Industry',         layer: 'experience',  signals: { integration: 1 }, blurb: 'Geospatial, routing & route optimization.' },
  healthcare_de:   { name: 'Healthcare Data Engine',      cat: 'Industry',         layer: 'core',        signals: { data: 2, integration: 1 }, blurb: 'Interoperable healthcare data platform.' },
  carbon_sense:    { name: 'Carbon Sense',                cat: 'Industry',         layer: 'intelligence',signals: { data: 1 }, blurb: 'Emissions accounting for Scope 3 & ESG reporting.' },
};

export const SIGNAL_KEYS = ['data', 'security', 'sovereignty', 'ai', 'integration'];
export const SIGNAL_LABELS = {
  data: 'Data', security: 'Security', sovereignty: 'Sovereignty', ai: 'AI', integration: 'Integration',
};

// ---------------------------------------------------------------------------
// SUBSTITUTIONS — competitor product → GCP replacement (illustrative)
// ---------------------------------------------------------------------------
export const SUBSTITUTIONS = [
  { competitor: 'Snowflake',            gcp: 'bigquery',        vendor: 'Snowflake' },
  { competitor: 'Databricks',           gcp: 'bigquery',        vendor: 'Databricks' },
  { competitor: 'Amazon Redshift',      gcp: 'bigquery',        vendor: 'AWS' },
  { competitor: 'Azure Synapse',        gcp: 'bigquery',        vendor: 'Microsoft' },
  { competitor: 'Oracle Database',      gcp: 'alloydb',         vendor: 'Oracle' },
  { competitor: 'Azure SQL Hyperscale', gcp: 'alloydb',         vendor: 'Microsoft' },
  { competitor: 'Oracle Exadata',       gcp: 'alloydb',         vendor: 'Oracle' },
  { competitor: 'Azure OpenAI',         gcp: 'vertex_ai',       vendor: 'Microsoft' },
  { competitor: 'AWS Bedrock',          gcp: 'vertex_ai',       vendor: 'AWS' },
  { competitor: 'GitHub Copilot',       gcp: 'gemini_code',     vendor: 'Microsoft' },
  { competitor: 'Amazon Q Developer',   gcp: 'gemini_code',     vendor: 'AWS' },
  { competitor: 'Microsoft 365 Copilot',gcp: 'gemini_ent',      vendor: 'Microsoft' },
  { competitor: 'Glean',                gcp: 'agentspace',      vendor: 'Glean' },
  { competitor: 'Splunk',               gcp: 'chronicle',       vendor: 'Splunk' },
  { competitor: 'Microsoft Sentinel',   gcp: 'chronicle',       vendor: 'Microsoft' },
  { competitor: 'CrowdStrike',          gcp: 'mandiant',        vendor: 'CrowdStrike' },
  { competitor: 'Algolia',              gcp: 'vertex_commerce', vendor: 'Algolia' },
  { competitor: 'Bloomreach',           gcp: 'vertex_commerce', vendor: 'Bloomreach' },
  { competitor: 'AWS Personalize',      gcp: 'vertex_commerce', vendor: 'AWS' },
  { competitor: 'Amazon Connect',       gcp: 'contact_center',  vendor: 'AWS' },
  { competitor: 'Genesys',              gcp: 'contact_center',  vendor: 'Genesys' },
  { competitor: 'Microsoft 365',        gcp: 'workspace',       vendor: 'Microsoft' },
  { competitor: 'Power BI',             gcp: 'looker',          vendor: 'Microsoft' },
  { competitor: 'Tableau',              gcp: 'looker',          vendor: 'Salesforce' },
  { competitor: 'Amazon QuickSight',    gcp: 'looker',          vendor: 'AWS' },
  { competitor: 'SAP Datasphere',       gcp: 'cortex',          vendor: 'SAP' },
  { competitor: 'Azure EU Sovereign',   gcp: 'tsystems_sov',    vendor: 'Microsoft' },
  { competitor: 'AWS European Sovereign',gcp: 'tsystems_sov',   vendor: 'AWS' },
  { competitor: 'Nvidia DGX',           gcp: 'ai_hypercomputer',vendor: 'Nvidia' },
  { competitor: 'AWS Trainium',         gcp: 'ai_hypercomputer',vendor: 'AWS' },
  { competitor: 'UiPath / Pega',        gcp: 'document_ai',     vendor: 'UiPath' },
  { competitor: 'Azure IoT / MindSphere',gcp: 'mfg_data_engine',vendor: 'Microsoft' },
  { competitor: 'AWS SiteWise',         gcp: 'mfg_data_engine', vendor: 'AWS' },
  { competitor: 'NICE Actimize',        gcp: 'aml_ai',          vendor: 'NICE' },
];

// ---------------------------------------------------------------------------
// PAIN POINTS — Section C master map (all 14), with layered core+addons+subs.
// keywords power search. industries[] drives industry-sensitive ordering.
// ---------------------------------------------------------------------------
export const PAINS = [
  {
    id: 'p1', title: 'Locked into Microsoft / Oracle / SAP, want to modernize without rip-and-replace',
    short: 'Legacy lock-in, modernize gradually',
    keywords: ['oracle', 'microsoft', 'sap', 'legacy', 'lock-in', 'modernize', 'migration'],
    industries: ['FSI', 'Automotive', 'Chemicals', 'Industrial'],
    core: ['gke', 'anthos', 'alloydb', 'bigquery_omni'],
    addons: ['gemini_code', 'cortex'],
    subs: ['Oracle Exadata', 'Azure SQL Hyperscale', 'Snowflake'],
    narrative: 'Modernize incrementally rather than rip-and-replace: query existing Azure/AWS data via BigQuery Omni, prove Oracle substitution on a non-critical workload with AlloyDB, and bridge hybrid estates with GKE Enterprise and Anthos.',
  },
  {
    id: 'p2', title: 'Deploying GenAI safely at enterprise scale',
    short: 'Enterprise GenAI, done safely',
    keywords: ['genai', 'ai', 'gemini', 'agents', 'scale', 'safe'],
    industries: ['FSI', 'Insurance', 'Automotive', 'Retail', 'Public Sector'],
    core: ['vertex_ai', 'gemini_ent', 'agentspace', 'agent_builder'],
    addons: ['vertex_search', 'document_ai', 'vertex_explain'],
    subs: ['Azure OpenAI', 'AWS Bedrock'],
    narrative: 'Land governed GenAI with Vertex AI and Gemini Enterprise, orchestrate task agents through Agentspace and Agent Builder, and ground answers with Vertex AI Search — all under enterprise controls that Azure OpenAI and AWS Bedrock cannot match on sovereignty.',
  },
  {
    id: 'p3', title: 'Fragmented data, can\u2019t get AI value',
    short: 'Fragmented data blocks AI value',
    keywords: ['data', 'fragmented', 'silos', 'analytics', 'governance'],
    industries: ['Insurance', 'Retail', 'Energy', 'Logistics'],
    core: ['bigquery', 'dataplex', 'cortex'],
    addons: ['looker', 'vertex_ai'],
    subs: ['Snowflake', 'Databricks'],
    narrative: 'Consolidate fragmented estates on BigQuery with Dataplex governance and Cortex for SAP data, then unlock value with Looker and Vertex AI — replacing the Snowflake + Databricks split with one governed platform.',
  },
  {
    id: 'p4', title: 'Sovereign workloads (FSI, public, healthcare)',
    short: 'Sovereign & regulated workloads',
    keywords: ['sovereign', 'sovereignty', 'gdpr', 'bsi', 'residency', 'regulated'],
    industries: ['FSI', 'Public Sector', 'Healthcare', 'Capital Markets'],
    core: ['tsystems_sov', 'gdc', 'assured', 'eu_boundary'],
    addons: ['bsi_c5', 'confidential'],
    subs: ['Azure EU Sovereign', 'AWS European Sovereign'],
    narrative: 'Design three-tier sovereignty — standard region \u2192 EU Data Boundary \u2192 Germany Data Boundary by T-Systems — anchored by GDC and Assured Workloads, with BSI C5 and Confidential Computing for the most sensitive data.',
  },
  {
    id: 'p5', title: 'Hybrid + multi-cloud consistency',
    short: 'Hybrid & multi-cloud consistency',
    keywords: ['hybrid', 'multi-cloud', 'consistency', 'anthos', 'omni'],
    industries: ['Automotive', 'Industrial', 'Aviation', 'Semiconductors'],
    core: ['gke', 'anthos', 'bigquery_omni', 'cloud_interconnect'],
    addons: ['dataplex'],
    subs: ['AWS Outposts', 'Azure Arc'],
    narrative: 'Deliver one operating model across clouds with GKE Enterprise and Anthos, query where the data lives with BigQuery Omni, and connect estates over Cloud Interconnect — avoiding a forced migration off AWS/Azure.',
  },
  {
    id: 'p6', title: 'SAP modernization stuck',
    short: 'SAP modernization stuck',
    keywords: ['sap', 'rise', 'hana', 's/4hana', '2027', 'cortex'],
    industries: ['Chemicals', 'Automotive', 'Retail', 'Pharma', 'Industrial'],
    core: ['rise_sap', 'cortex', 'bare_metal_hana', 'bigquery'],
    addons: ['gemini_sap', 'agentspace'],
    subs: ['Azure RISE', 'AWS RISE'],
    narrative: 'Use the 2027 deadline as the forcing function: land RISE with SAP on Google Cloud with Bare Metal for HANA, add the Cortex data foundation and zero-copy BigQuery analytics, then layer Gemini for SAP operations.',
  },
  {
    id: 'p7', title: 'Cut cloud cost (FinOps)',
    short: 'Cut cloud cost (FinOps)',
    keywords: ['finops', 'cost', 'savings', 'cud', 'optimization'],
    industries: ['Retail', 'Logistics', 'Energy'],
    core: ['finops_hub'],
    addons: ['carbon_sense'],
    subs: ['Apptio / Cloudability'],
    narrative: 'Drive down spend with FinOps Hub — Committed Use Discounts, Spot VMs, Active Assist and Recommender — and pair cost with sustainability via Carbon Sense.',
  },
  {
    id: 'p8', title: 'Slow dev, want AI-native engineering',
    short: 'AI-native engineering velocity',
    keywords: ['dev', 'engineering', 'code', 'copilot', 'velocity'],
    industries: ['Automotive', 'Industrial', 'Software'],
    core: ['gemini_code', 'gke'],
    addons: ['agentspace', 'cloud_run'],
    subs: ['GitHub Copilot', 'Azure DevOps'],
    narrative: 'Accelerate engineering with Gemini Code Assist on GKE, add serverless delivery via Cloud Run, and bring agents into the developer flow with Agentspace — substituting GitHub Copilot + Azure DevOps.',
  },
  {
    id: 'p9', title: 'Enterprise search / knowledge assistant',
    short: 'Enterprise search & knowledge',
    keywords: ['search', 'knowledge', 'assistant', 'copilot', 'rag'],
    industries: ['FSI', 'Public Sector', 'Automotive', 'Pharma'],
    core: ['gemini_ent', 'agentspace', 'vertex_search', 'document_ai'],
    addons: ['workspace'],
    subs: ['Microsoft Copilot + SharePoint', 'Glean'],
    narrative: 'Stand up a grounded enterprise assistant with Gemini Enterprise and Agentspace over Vertex AI Search and Document AI, integrated with Workspace — displacing Microsoft Copilot + SharePoint or Glean.',
  },
  {
    id: 'p10', title: 'Modernize contact center / CX',
    short: 'Modernize contact center / CX',
    keywords: ['contact center', 'cx', 'customer', 'service', 'support'],
    industries: ['Insurance', 'Retail', 'Automotive', 'FSI'],
    core: ['contact_center', 'agent_builder', 'gemini_ent'],
    addons: ['document_ai', 'translation'],
    subs: ['Amazon Connect + Lex', 'Azure Bot Service'],
    narrative: 'Transform CX with Contact Center AI and Vertex AI Agent Builder plus Gemini, adding Document AI and Translation for multilingual service — replacing Amazon Connect or Azure Bot Service.',
  },
  {
    id: 'p11', title: 'Weak cyber posture (SecOps + threat intel)',
    short: 'Weak cyber posture',
    keywords: ['security', 'secops', 'cyber', 'threat', 'siem', 'zero-trust'],
    industries: ['FSI', 'Insurance', 'Public Sector', 'Capital Markets'],
    core: ['chronicle', 'scc', 'mandiant', 'beyondcorp'],
    addons: ['cloud_armor', 'confidential'],
    subs: ['Splunk', 'Microsoft Sentinel', 'CrowdStrike'],
    narrative: 'Rebuild the security posture with Chronicle SecOps and Security Command Center, add Mandiant threat intel and BeyondCorp zero-trust access, and harden the edge with Cloud Armor — the Splunk + Sentinel + CrowdStrike substitution.',
  },
  {
    id: 'p12', title: 'Manufacturing OT data locked in',
    short: 'Manufacturing OT data locked in',
    keywords: ['manufacturing', 'ot', 'factory', 'shop-floor', 'edge', 'quality'],
    industries: ['Automotive', 'Industrial', 'Semiconductors', 'Chemicals'],
    core: ['mfg_data_engine', 'anthos', 'vertex_vision', 'bigquery'],
    addons: ['pubsub', 'looker'],
    subs: ['AWS SiteWise', 'Azure IoT + industrial IoT platform'],
    narrative: 'Free OT data with Manufacturing Data Engine, run inference at the edge on Anthos with Vertex AI Vision, and analyze in BigQuery — adding Pub/Sub streaming and Looker OEE dashboards.',
  },
  {
    id: 'p13', title: 'Launch new digital products faster',
    short: 'Launch digital products faster',
    keywords: ['digital', 'product', 'launch', 'serverless', 'app', 'api'],
    industries: ['Retail', 'Logistics', 'FSI', 'Energy'],
    core: ['cloud_run', 'firebase', 'gke', 'apigee'],
    addons: ['vertex_ai', 'gemini_code'],
    subs: ['AWS Amplify', 'Azure App Service'],
    narrative: 'Ship customer-facing products fast on Cloud Run, Firebase and GKE, exposed and secured through Apigee, with Vertex AI where intelligence is needed.',
  },
  {
    id: 'p14', title: 'Comply with EU AI Act / DORA / NIS2',
    short: 'EU AI Act / DORA / NIS2 compliance',
    keywords: ['compliance', 'eu ai act', 'dora', 'nis2', 'audit', 'regulation'],
    industries: ['FSI', 'Insurance', 'Public Sector', 'Healthcare', 'Capital Markets'],
    core: ['assured', 'vertex_explain', 'audit_logs', 'chronicle'],
    addons: ['sovereign_ctrl', 'confidential'],
    subs: ['Azure compliance stack'],
    narrative: 'Make compliance defensible with Assured Workloads, Vertex AI Explainability, immutable Audit Logs and Chronicle SecOps for 24/72h incident reporting — extended by Sovereign Controls and Confidential Computing.',
  },
];

// ---------------------------------------------------------------------------
// CUSTOMERS — generic industry archetypes (NOT real accounts). status: existing |
// expansion | prospect models a hypothetical adoption posture for the archetype.
// footprint = illustrative current posture. plAngle = illustrative pursuit angle.
// pains[] = ordered pain ids most relevant. Per-archetype `stacks` override the
// master pain stacks where an archetype-specific stack exists. All content is
// illustrative OSINT/AI-assisted research — no real customer information.
// ---------------------------------------------------------------------------
// CUSTOMERS — DACH accounts (Sections A & B). status: existing | expansion | prospect.
// footprint = current posture; plAngle = pursuit angle.
// pains[] = ordered pain ids most relevant; per-account `stacks` override master
// pain stacks where an account-specific stack exists.
// sources[] = valid public URLs for the engagement. Where sources[] is empty, the
// footprint/plAngle are AI-assisted hypotheses that REQUIRE independent verification.
// Compiled from OSINT + AI-assisted research; illustrative, not authoritative.
// ---------------------------------------------------------------------------
export const CUSTOMERS = [
  {
    id: 'deutsche-bank', name: 'Deutsche Bank', industry: 'FSI', hq: 'Frankfurt',
    status: 'existing', expansion: true,
    footprint: '260+ apps on GCP, GDC for Autobahn FX',
    plAngle: 'Trusted for latency-critical FX — expand into post-trade analytics (BigQuery + Cortex), wealth AI agents (Agentspace) and gradual core-banking modernization (AlloyDB).',
    sources: [{ label: 'Deutsche Bank press release (2020-12-04)', url: 'https://www.db.com/news/detail/20201204-deutsche-bank-and-google-cloud-sign-pioneering-cloud-and-innovation-partnership?language_id=1' }, { label: 'Google Cloud Blog — building cloud skills at scale', url: 'https://cloud.google.com/blog/topics/training-certifications/how-deutsche-bank-is-building-cloud-skills-at-scale/' }],
    pains: ['p4', 'p2', 'p14', 'p1'],
    stacks: {
      p4: { core: ['gdc', 'cloud_interconnect', 'confidential'], addons: ['vertex_ai', 'bigquery', 'mandiant'], subs: ['On-prem Equinix colos', 'Internal HPC'] },
      p2: { core: ['vertex_ai', 'gemini_ent', 'agentspace', 'bigquery'], addons: ['document_ai', 'contact_center', 'cortex'], subs: ['Azure OpenAI', 'AWS Bedrock'] },
      p14:{ core: ['assured', 'bsi_c5', 'audit_logs', 'sovereign_ctrl'], addons: ['chronicle'], subs: ['Manual GRC tooling', 'Azure compliance'] },
      p1: { core: ['alloydb', 'spanner', 'gke'], addons: ['dms', 'datastream'], subs: ['Oracle Exadata', 'IBM mainframes'] },
    },
  },
  {
    id: 'commerzbank', name: 'Commerzbank', industry: 'FSI', hq: 'Frankfurt',
    status: 'existing', expansion: true,
    footprint: 'Multi-cloud migration, Digitale Kontoanalyse on GCP',
    plAngle: '“Automate the boring, accelerate the new” — expand into AI retail banking (Gemini in branches) and SAP-on-GCP for the finance core.',
    sources: [{ label: 'Google Cloud customer case study', url: 'https://cloud.google.com/customers/commerzbank' }, { label: 'Commerzbank newsroom — Google partnership', url: 'https://www.commerzbank.de/group/newsroom/press-releases/commerzbank-google-partnership.html' }],
    pains: ['p1', 'p11', 'p13'],
    stacks: {
      p1: { core: ['gke', 'cloud_sql', 'anthos'], addons: ['vertex_ai'], subs: ['Azure with M365 lock-in'] },
      p11:{ core: ['chronicle', 'scc', 'mandiant'], addons: ['beyondcorp'], subs: ['Splunk + Microsoft Sentinel'] },
      p13:{ core: ['cloud_run', 'firebase', 'bigquery'], addons: ['looker', 'gemini_ent'], subs: ['AWS Amplify + QuickSight'] },
    },
  },
  {
    id: 'allianz', name: 'Allianz / Munich Re', industry: 'Insurance', hq: 'Munich',
    status: 'existing', expansion: true,
    footprint: 'Cloud Protection+ cyber insurance, Google Maps for MIDAS',
    plAngle: 'Cloud Protection+ opened the door. Expand into claims automation (Document AI + agents), embedded insurance APIs (Apigee) and ESG/climate analytics (Earth Engine + BigQuery).',
    sources: [{ label: 'Allianz media center — Cloud Protection+ (2021-03-03)', url: 'https://www.allianz.com/en/mediacenter/news/business/insurance/210303_Allianz-partners-with-Google-Cloud-Munich-Re-for-cyber-risk-management-solution.html' }, { label: 'Munich Re media release — pioneering cyber insurance', url: 'https://www.munichre.com/en/company/media-relations/media-information-and-corporate-news/media-information/2021/pioneering-cyber-insurance.html' }],
    pains: ['p3', 'p2', 'p10'],
    stacks: {
      p3: { core: ['bigquery', 'vertex_ai', 'mandiant'], addons: ['looker', 'agentspace'], subs: ['Internal actuarial tooling', 'Snowflake'] },
      p2: { core: ['bigquery', 'vertex_ai', 'earth_engine'], addons: ['maps', 'gemini_ent'], subs: ['AWS climate stack', 'Microsoft Planetary Computer'] },
      p10:{ core: ['document_ai', 'contact_center', 'agent_builder'], addons: ['gemini_ent'], subs: ['Manual + UiPath/Pega RPA'] },
    },
  },
  {
    id: 'bmw', name: 'BMW Group', industry: 'Automotive', hq: 'Munich',
    status: 'expansion',
    footprint: 'Vertex AI in-vehicle foundation models; AWS-anchored data lake',
    plAngle: 'Multi-cloud by policy — don’t fight AWS on the data lake. Take the AI/UX layer (Vertex), SAP migration and sustainability. A 2027 SAP assessment + AI factory pilot is a credible €10M+ services pursuit.',
    sources: [{ label: 'Google Cloud Blog — BMW SLMs for in-vehicle voice', url: 'https://cloud.google.com/blog/topics/manufacturing/how-bmw-is-testing-slms-not-llms-for-in-vehicle-voice-commands' }],
    pains: ['p2', 'p12', 'p6', 'p7'],
    stacks: {
      p2: { core: ['vertex_ai', 'gemini_ent', 'auto_ai_agent', 'maps'], addons: ['speech', 'translation'], subs: ['AWS Bedrock + Alexa Auto'] },
      p12:{ core: ['mfg_data_engine', 'bigquery', 'vertex_vision'], addons: ['looker', 'anthos'], subs: ['AWS IoT + SiteWise'] },
      p6: { core: ['rise_sap', 'cortex', 'bigquery'], addons: ['gemini_sap'], subs: ['Azure for RISE'] },
      p7: { core: ['bigquery', 'cortex', 'carbon_sense'], addons: ['looker'], subs: ['Manual Excel + Salesforce Net Zero'] },
    },
  },
  {
    id: 'mercedes', name: 'Mercedes-Benz Group', industry: 'Automotive', hq: 'Stuttgart',
    status: 'existing',
    footprint: 'MBUX Automotive AI Agent on Gemini, Maps Platform',
    plAngle: 'MBUX is the wedge. Push into dealer enablement (Workspace + Agentspace), aftermarket analytics and a sovereign data backplane for European driver data (Germany Data Boundary).',
    sources: [{ label: 'Google — Mercedes-Benz Automotive AI Agent', url: 'https://blog.google/feed/mercedes-google-cloud-automotive-ai-agent/' }, { label: 'Google Cloud Press Corner (2025-01-13)', url: 'https://www.googlecloudpresscorner.com/2025-01-13-Mercedes-Benz-and-Google-Partner-on-AI-powered-Conversational-Search-within-Navigation-Systems' }],
    pains: ['p2', 'p9', 'p3'],
    stacks: {
      p2: { core: ['vertex_ai', 'gemini_ent', 'auto_ai_agent', 'maps'], addons: ['document_ai', 'translation'], subs: ['OpenAI/Azure for voice'] },
      p9: { core: ['workspace', 'gemini_ent', 'agent_builder'], addons: ['vertex_search'], subs: ['Microsoft 365 Copilot'] },
      p3: { core: ['bigquery', 'vertex_ai', 'looker'], addons: ['agentspace'], subs: ['Salesforce Data Cloud'] },
    },
  },
  {
    id: 'volkswagen', name: 'Volkswagen Group', industry: 'Automotive', hq: 'Wolfsburg',
    status: 'expansion',
    footprint: 'myVW Gemini app (US); core production on AWS Industrial Cloud',
    plAngle: 'Don’t displace AWS on the factory floor. Win the digital/AI layer (myVW), then the SAP migration when 2027 forces a decision.',
    sources: [{ label: 'Google Cloud Press Corner — myVW app (2024-09-24)', url: 'https://www.googlecloudpresscorner.com/2024-09-24-Volkswagen-Integrates-AI-into-the-myVW-Mobile-App-with-Google-Cloud' }],
    pains: ['p2', 'p6', 'p8'],
    stacks: {
      p2: { core: ['vertex_ai', 'gemini_ent', 'pubsub', 'maps'], addons: ['auto_ai_agent'], subs: ['AWS Bedrock'] },
      p6: { core: ['rise_sap', 'cortex', 'bigquery'], addons: ['gemini_sap'], subs: ['Azure (M365 incumbent)'] },
      p8: { core: ['gke', 'gemini_code'], addons: ['anthos'], subs: ['AWS DevOps + GitHub Copilot'] },
    },
  },
  {
    id: 'bayer', name: 'Bayer AG', industry: 'Pharma', hq: 'Leverkusen',
    status: 'existing', expansion: true,
    footprint: 'Radiology AI on Vertex AI',
    plAngle: 'Radiology is the proof. Expand into drug discovery (DeepMind is unique to Google), crop-science geospatial and sovereign clinical-trial data.',
    sources: [{ label: 'Bayer media release — radiology AI (2024-04)', url: 'https://www.bayer.com/media/en-us/bayer-and-google-cloud-to-accelerate-development-of-ai-powered-healthcare-applications-for-radiologists/' }],
    pains: ['p2', 'p6', 'p4'],
    stacks: {
      p2: { core: ['vertex_ai', 'medlm', 'healthcare_de'], addons: ['vertex_search', 'document_ai'], subs: ['Microsoft Nuance + Azure Health'] },
      p6: { core: ['rise_sap', 'cortex', 'bigquery'], addons: ['gemini_sap', 'agentspace'], subs: ['Azure RISE'] },
      p4: { core: ['ai_hypercomputer', 'deepmind', 'bigquery'], addons: ['tsystems_sov'], subs: ['AWS HealthOmics + Nvidia BioNeMo'] },
    },
  },
  {
    id: 'basf', name: 'BASF', industry: 'Chemicals', hq: 'Ludwigshafen',
    status: 'existing', expansion: true,
    footprint: 'RISE with SAP S/4HANA transformation',
    plAngle: 'The RISE migration is the largest open services pursuit in German chemicals. Lead with value services: assessment, landing zone, SAP migration, post-migration AI optimization.',
    sources: [],
    pains: ['p6', 'p7', 'p2'],
    stacks: {
      p6: { core: ['rise_sap', 'bare_metal_hana', 'cortex'], addons: ['gemini_sap', 'bigquery'], subs: ['Azure RISE'] },
      p7: { core: ['bigquery', 'cortex', 'carbon_sense'], addons: ['looker', 'earth_engine'], subs: ['Salesforce Net Zero'] },
      p2: { core: ['vertex_ai', 'ai_hypercomputer', 'deepmind'], addons: ['agent_builder'], subs: ['AWS HPC + Nvidia'] },
    },
  },
  {
    id: 'siemens', name: 'Siemens AG', industry: 'Industrial', hq: 'Munich',
    status: 'expansion',
    footprint: 'AI manufacturing quality on GCP; Xcelerator on Azure',
    plAngle: 'Azure-loyal for Xcelerator — don’t fight it. Sell BigQuery Omni as the analytics layer ACROSS Azure without forcing migration. Sustainability and SAP are secondary openings.',
    sources: [{ label: 'Siemens press release — AI in manufacturing with Google Cloud', url: 'https://press.siemens.com/global/en/pressrelease/siemens-and-google-cloud-cooperate-ai-based-solutions-manufacturing' }],
    pains: ['p12', 'p6', 'p5'],
    stacks: {
      p12:{ core: ['mfg_data_engine', 'vertex_vision', 'anthos'], addons: ['looker'], subs: ['Azure ML + IoT Hub'] },
      p6: { core: ['rise_sap', 'cortex', 'bigquery'], addons: ['gemini_sap'], subs: ['Azure RISE'] },
      p5: { core: ['bigquery_omni', 'dataplex'], addons: ['agentspace'], subs: ['Azure Synapse'] },
    },
  },
  {
    id: 'lufthansa', name: 'Lufthansa Group', industry: 'Aviation', hq: 'Cologne',
    status: 'existing', expansion: true,
    footprint: 'Lufthansa Technik AVIATAR on BigQuery + GKE + Vertex AI',
    plAngle: 'AVIATAR is the lighthouse. Expand AVIATAR-as-a-platform for other carriers, layer Gemini ops copilots, and modernize the SAP back-office.',
    sources: [{ label: 'Google Cloud customer case study — Lufthansa Technik', url: 'https://cloud.google.com/customers/lufthansa' }],
    pains: ['p12', 'p5', 'p2'],
    stacks: {
      p12:{ core: ['bigquery', 'vertex_ai', 'pubsub', 'cloud_run'], addons: ['anthos'], subs: ['AWS IoT + SageMaker'] },
      p5: { core: ['gke', 'bigquery_omni'], addons: ['looker'], subs: ['Azure for airline ISVs'] },
      p2: { core: ['vertex_ai', 'gemini_ent'], addons: ['agent_builder'], subs: ['Azure OpenAI'] },
    },
  },
  {
    id: 'dhl', name: 'Deutsche Post DHL', industry: 'Logistics', hq: 'Bonn',
    status: 'existing', expansion: true,
    footprint: 'Apigee for API platform; logistics scale APIs',
    plAngle: 'API-led. Expand from Apigee to data + AI: a real-time logistics intelligence platform on BigQuery + Vertex AI with an Agentspace ops copilot.',
    sources: [{ label: 'Google Cloud Press Corner — DPDHL API volume (2021-10-12)', url: 'https://www.googlecloudpresscorner.com/2021-10-12-DPDHL-Processes-Record-API-Transaction-Volume-Using-Google-Cloud' }],
    pains: ['p13', 'p3', 'p7'],
    stacks: {
      p13:{ core: ['apigee', 'cloud_armor', 'cloud_run'], addons: ['agentspace'], subs: ['AWS API Gateway + Azure APIM'] },
      p3: { core: ['bigquery', 'dataflow', 'cortex'], addons: ['looker', 'maps'], subs: ['Azure Synapse + SAP IBP'] },
      p7: { core: ['bigquery', 'carbon_sense'], addons: ['looker'], subs: ['Manual ESG'] },
    },
  },
  {
    id: 'bosch', name: 'Bosch', industry: 'Industrial', hq: 'Stuttgart',
    status: 'existing', expansion: true,
    footprint: 'GKE for sustainability + IoT asset management',
    plAngle: 'The canonical “Mittelstand-becomes-software” story. Pursue industrial AI platform expansion, sustainability reporting at scale, and a joint AI co-innovation lab.',
    sources: [],
    pains: ['p12', 'p2', 'p7'],
    stacks: {
      p12:{ core: ['gke', 'pubsub', 'bigquery', 'vertex_ai'], addons: ['mfg_data_engine', 'anthos'], subs: ['AWS IoT + Greengrass'] },
      p2: { core: ['vertex_ai', 'gemini_ent', 'maps'], addons: ['auto_ai_agent'], subs: ['Azure ML + AWS Bedrock'] },
      p7: { core: ['bigquery', 'carbon_sense', 'earth_engine'], addons: ['looker'], subs: ['Microsoft Sustainability'] },
    },
  },
  {
    id: 'schwarz', name: 'Schwarz Group (Lidl / Kaufland)', industry: 'Retail', hq: 'Neckarsulm',
    status: 'existing', expansion: true,
    footprint: 'Workspace for 575K employees + STACKIT sovereign storage',
    plAngle: 'The largest German Workspace win ever. Land-and-expand into data + AI: demand forecasting, retail search, sovereign analytics. STACKIT is the sovereign edge partner.',
    sources: [{ label: 'Schwarz Group & Google — sovereign Workspace partnership (2024-11)', url: 'https://xmcyber.com/press-release/companies-of-schwarz-group-and-google-to-sign-partnership-to-jointly-deliver-sovereign-secure-workplace-productivity-solutions-for-germany-and-europe/' }],
    pains: ['p9', 'p3', 'p13'],
    stacks: {
      p9: { core: ['workspace', 'gemini_ent'], addons: ['agentspace'], subs: ['Microsoft 365 + Copilot'] },
      p3: { core: ['bigquery', 'vertex_forecast'], addons: ['looker', 'agentspace'], subs: ['Snowflake + Databricks'] },
      p13:{ core: ['vertex_commerce', 'cloud_run'], addons: ['contact_center', 'vertex_vision'], subs: ['Algolia + Bloomreach'] },
    },
  },
  {
    id: 'otto', name: 'Otto Group', industry: 'Retail', hq: 'Hamburg',
    status: 'existing', expansion: true,
    footprint: 'SAP on Google Cloud',
    plAngle: 'Already trusts GCP for SAP. Push retail-specific AI (Vertex AI Search for Commerce), seller-experience copilot and unified marketplace analytics.',
    sources: [{ label: 'Google Cloud customer case study — Otto Group', url: 'https://cloud.google.com/customers/otto-group' }, { label: 'Google Cloud Blog — German retailers modernizing SAP', url: 'https://cloud.google.com/blog/topics/retail/3-german-retailers-modernizing-with-sap-on-google-cloud' }],
    pains: ['p6', 'p13', 'p3'],
    stacks: {
      p6: { core: ['rise_sap', 'cortex', 'bigquery'], addons: ['gemini_sap'], subs: ['Azure RISE'] },
      p13:{ core: ['vertex_commerce', 'bigquery'], addons: ['gemini_ent'], subs: ['AWS Personalize + Snowflake'] },
      p3: { core: ['bigquery', 'looker', 'dataflow'], addons: ['agentspace'], subs: ['Snowflake + Salesforce'] },
    },
  },
  {
    id: 'rewe', name: 'REWE Group', industry: 'Retail', hq: 'Cologne',
    status: 'existing', expansion: true,
    footprint: 'REWE digital online grocery on GCP; SAP-on-GCP path',
    plAngle: 'REWE digital is the wedge into the broader group. Pursue full-group SAP migration, a sovereign Workspace alternative to M365, and fulfillment AI.',
    sources: [{ label: 'Google Cloud customer case study — REWE digital', url: 'https://cloud.google.com/customers/rewe-digital' }],
    pains: ['p13', 'p6', 'p12'],
    stacks: {
      p13:{ core: ['gke', 'bigtable', 'cloud_sql', 'bigquery', 'firebase'], addons: ['vertex_ai'], subs: ['AWS retail stack'] },
      p6: { core: ['rise_sap', 'cortex'], addons: ['gemini_sap'], subs: ['Azure RISE'] },
      p12:{ core: ['maps', 'vertex_ai'], addons: ['agentspace'], subs: ['Azure Maps + ML'] },
    },
  },
  {
    id: 'eon', name: 'E.ON', industry: 'Energy', hq: 'Essen',
    status: 'existing', expansion: true,
    footprint: 'Asset-management SaaS on BigQuery, Pub/Sub, GKE',
    plAngle: 'Scale a B2B asset-management SaaS to 10,000 enterprise customers + Energiewende analytics.',
    sources: [],
    pains: ['p13', 'p3', 'p7'],
    stacks: {
      p13:{ core: ['bigquery', 'gke', 'cloud_sql', 'pubsub'], addons: ['vertex_forecast'], subs: ['AWS IoT + Snowflake'] },
      p3: { core: ['bigquery', 'vertex_forecast', 'earth_engine'], addons: ['gemini_ent'], subs: ['Azure Synapse'] },
      p7: { core: ['bigquery', 'carbon_sense'], addons: ['looker'], subs: ['Snowflake'] },
    },
  },
  {
    id: 'infineon', name: 'Infineon Technologies', industry: 'Semiconductors', hq: 'Munich',
    status: 'prospect',
    footprint: 'AWS + Azure for EDA, on-prem HPC',
    plAngle: 'AlphaChip + TPU is the unique wedge no competitor can match. Lead there, follow with manufacturing analytics.',
    sources: [],
    pains: ['p2', 'p12', 'p4'],
    stacks: {
      p2: { core: ['ai_hypercomputer', 'gke', 'bigquery'], addons: ['deepmind'], subs: ['AWS HPC + Nvidia'] },
      p12:{ core: ['mfg_data_engine', 'vertex_vision', 'anthos'], addons: ['cortex'], subs: ['Azure ML + Siemens MindSphere'] },
      p4: { core: ['tsystems_sov', 'assured'], addons: ['eu_boundary'], subs: ['Azure Confidential'] },
    },
  },
  {
    id: 'deutsche-boerse', name: 'Deutsche Börse Group', industry: 'Capital Markets', hq: 'Frankfurt',
    status: 'prospect',
    footprint: 'Cautious cloud due to BaFin; mostly on-prem trading',
    plAngle: 'Use Deutsche Bank’s GDC FX precedent as reference. T-Systems sovereign wrapper makes BaFin compliance defensible.',
    sources: [],
    pains: ['p4', 'p3', 'p11'],
    stacks: {
      p4: { core: ['gdc', 'confidential', 'bigquery'], addons: ['vertex_ai', 'tsystems_sov'], subs: ['On-prem + Snowflake'] },
      p3: { core: ['bigquery', 'looker'], addons: ['agentspace'], subs: ['Snowflake + Databricks'] },
      p11:{ core: ['vertex_ai', 'aml_ai', 'mandiant'], addons: ['chronicle'], subs: ['NICE Actimize + Microsoft Sentinel'] },
    },
  },
  {
    id: 'fresenius', name: 'Fresenius Group', industry: 'Healthcare', hq: 'Bad Homburg',
    status: 'prospect',
    footprint: 'Azure + SAP-centric',
    plAngle: 'Bayer radiology is the reference. Sovereign + MedLM + Healthcare Data Engine is a uniquely defensible stack.',
    sources: [],
    pains: ['p2', 'p4', 'p6'],
    stacks: {
      p2: { core: ['vertex_ai', 'medlm', 'healthcare_de'], addons: ['vertex_search'], subs: ['Microsoft Nuance + Azure Health'] },
      p4: { core: ['tsystems_sov', 'assured'], addons: ['eu_boundary'], subs: ['Azure Confidential'] },
      p6: { core: ['rise_sap', 'cortex'], addons: ['gemini_sap'], subs: ['Azure RISE'] },
    },
  },
  {
    id: 'merck', name: 'Merck KGaA', industry: 'Pharma', hq: 'Darmstadt',
    status: 'prospect',
    footprint: 'Azure-anchored',
    plAngle: 'DeepMind / AlphaFold is the unique angle into life sciences. Lead with research compute, follow with SAP.',
    sources: [],
    pains: ['p2', 'p8', 'p6'],
    stacks: {
      p2: { core: ['ai_hypercomputer', 'vertex_ai', 'deepmind'], addons: ['bigquery'], subs: ['AWS HealthOmics + Nvidia BioNeMo'] },
      p8: { core: ['vertex_ai', 'gke', 'bigquery'], addons: ['agent_builder'], subs: ['Azure ML + Databricks'] },
      p6: { core: ['rise_sap', 'cortex'], addons: ['gemini_sap'], subs: ['Azure RISE'] },
    },
  },
  {
    id: 'deutsche-bahn', name: 'Deutsche Bahn', industry: 'Public Sector', hq: 'Berlin',
    status: 'prospect',
    footprint: 'Mixed, slow procurement',
    plAngle: 'Predictive maintenance for rolling stock + passenger-facing AI + sovereign data.',
    sources: [],
    pains: ['p12', 'p2', 'p4'],
    stacks: {
      p12:{ core: ['bigquery', 'vertex_ai', 'pubsub'], addons: ['mfg_data_engine'], subs: ['AWS IoT FleetWise + Siemens Mobility'] },
      p2: { core: ['vertex_ai', 'gemini_ent', 'maps'], addons: ['agent_builder'], subs: ['Azure OpenAI'] },
      p4: { core: ['tsystems_sov', 'assured'], addons: ['eu_boundary'], subs: ['Azure for Government'] },
    },
  },
  {
    id: 'fed-gov', name: 'German Federal Government', industry: 'Public Sector', hq: 'Berlin',
    status: 'prospect',
    footprint: 'Slow, BSI-sensitive, NIS2-delayed',
    plAngle: 'The BSI cooperation agreement (Feb 2025) is the opener. Sovereign Workspace + Assured Workloads + Vertex AI with EU AI Act compliance.',
    sources: [{ label: 'BMI — Germany launches government cloud (2025-03)', url: 'https://www.bmi.bund.de/SharedDocs/pressemitteilungen/EN/2025/03/dvc.html' }, { label: 'heise — Google Cloud sovereign cloud for Germany', url: 'https://www.heise.de/en/news/Google-Cloud-Sovereign-Cloud-in-Germany-by-end-of-2026-11338389.html' }],
    pains: ['p4', 'p9', 'p14'],
    stacks: {
      p4: { core: ['tsystems_sov', 'assured', 'gdc'], addons: ['eu_boundary', 'bsi_c5'], subs: ['Microsoft 365 Government + Azure for Government'] },
      p9: { core: ['workspace', 'gemini_ent', 'vertex_search'], addons: ['agentspace'], subs: ['Microsoft 365 Government'] },
      p14:{ core: ['assured', 'vertex_explain', 'audit_logs'], addons: ['sovereign_ctrl', 'chronicle'], subs: ['Azure compliance stack'] },
    },
  },
];

// Industries for the generic-industry mode
export const INDUSTRIES = [
  'FSI', 'Insurance', 'Automotive', 'Pharma', 'Chemicals', 'Industrial',
  'Retail', 'Logistics', 'Energy', 'Aviation', 'Semiconductors',
  'Capital Markets', 'Healthcare', 'Public Sector',
];

// Regulated industries — trigger sovereignty/compliance warning if missing
export const REGULATED_INDUSTRIES = ['FSI', 'Insurance', 'Healthcare', 'Pharma', 'Public Sector', 'Capital Markets'];

// ---------------------------------------------------------------------------
// PRESETS — ready-made recipes. Each fully sets context + pain + blocks.
// ---------------------------------------------------------------------------
export const PRESETS = [
  {
    id: 'db-sovereign-genai',
    name: 'Deutsche Bank — Sovereign GenAI',
    tag: 'FSI · Sovereign',
    customerId: 'deutsche-bank', painId: 'p2',
    blocks: ['vertex_ai', 'gemini_ent', 'agentspace', 'bigquery', 'document_ai', 'assured', 'tsystems_sov'],
  },
  {
    id: 'bmw-mfg-sap',
    name: 'BMW — Manufacturing & SAP',
    tag: 'Automotive · SAP',
    customerId: 'bmw', painId: 'p6',
    blocks: ['rise_sap', 'cortex', 'bigquery', 'gemini_sap', 'mfg_data_engine', 'vertex_vision'],
  },
  {
    id: 'schwarz-retail-productivity',
    name: 'Schwarz — Retail Productivity',
    tag: 'Retail · Sovereign',
    customerId: 'schwarz', painId: 'p9',
    blocks: ['workspace', 'gemini_ent', 'agentspace', 'bigquery', 'vertex_forecast'],
  },
];

// Phase templates for staged pursuit
export function pursuitPhases(pain, isRegulated) {
  return [
    { phase: 'Phase 1 — Discovery & Landing Zone', detail: isRegulated
      ? 'BSI C5-aligned landing zone with T-Systems Sovereign Cloud & Assured Workloads. 90-day fixed-price assessment.'
      : 'Fixed-price 90-day discovery: landing zone, target architecture and a scoped proof of value.' },
    { phase: 'Phase 2 — Prove the Core', detail: `Deliver the core stack for “${pain ? pain.short : 'the pain point'}” on a bounded workload to prove substitution and value.` },
    { phase: 'Phase 3 — Layer & Expand', detail: 'Add the recommended add-ons, wire in AI/analytics, and open the land-and-expand roadmap.' },
  ];
}
