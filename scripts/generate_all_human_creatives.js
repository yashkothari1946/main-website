const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = fs.existsSync('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe')
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';

const ROOT_DIR = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT_DIR, 'images');
const CREATIVES_OUT = path.join(IMAGES_DIR, 'creatives');
if (!fs.existsSync(CREATIVES_OUT)) fs.mkdirSync(CREATIVES_OUT, { recursive: true });

const LOGO_PATH = path.join(IMAGES_DIR, 'logo.png');
const LOGO_BASE64 = 'data:image/png;base64,' + fs.readFileSync(LOGO_PATH).toString('base64');

const CREATIVES = [
  {
    filename: 'omnichannel_boardroom.png',
    bgImage: 'dm_analytics.png',
    accentColor: '#00E5FF',
    accentGrad: 'linear-gradient(90deg, #00E5FF, #3B82F6, #60A5FA)',
    badge: 'Omnichannel Growth Engine',
    kicker: 'REVENUE OPERATIONS',
    title: 'Why 1-Channel Marketing',
    titleHighlight: 'Loses 70% of Enterprise Deals.',
    subtitle: 'When algorithm updates hit, single-channel businesses crash. We align your web, performance ads, and automated WhatsApp nurturing into one unified client acquisition machine.',
    metrics: [
      { num: '+342%', label: 'Average ROI', desc: 'Multi-touch pipeline velocity' },
      { num: '8-14', label: 'Touchpoints', desc: 'Automated multi-channel retention' },
      { num: '24/7', label: 'Lead Pipeline', desc: 'Always-on client conversion' }
    ],
    cta: 'Claim Growth Audit →'
  },
  {
    filename: 'omnichannel_ads.png',
    bgImage: 'dm_ads.png',
    accentColor: '#38BDF8',
    accentGrad: 'linear-gradient(90deg, #38BDF8, #818CF8, #C084FC)',
    badge: 'Precision Ad Retargeting',
    kicker: 'PAID ACQUISITION & CRO',
    title: 'Stop Burning Ad Budget On',
    titleHighlight: 'Unqualified Clicks & High Bounce.',
    subtitle: 'High ad spend means nothing without precision retargeting and sub-second landing page speed. Turn high-intent B2B traffic into booked sales conversations.',
    metrics: [
      { num: '245%', label: 'Ad ROAS', desc: 'Performance marketing efficiency' },
      { num: '-45%', label: 'CPA Reduction', desc: 'Lower cost per qualified inquiry' },
      { num: '100%', label: 'Conversion Tracking', desc: 'Full-funnel attribution' }
    ],
    cta: 'Audit Your Ad Spend →'
  },
  {
    filename: 'speed_to_lead.png',
    bgImage: 'dm_reputation.png',
    accentColor: '#34D399',
    accentGrad: 'linear-gradient(90deg, #34D399, #10B981, #06B6D4)',
    badge: '24/7 Lead Velocity & Triage',
    kicker: 'PIPELINE CONVERSION VELOCITY',
    title: 'Sub-Minute Lead Response',
    titleHighlight: 'Equals 21x Higher Conversion.',
    subtitle: 'Waiting 2 hours to call back an inbound inquiry kills your close rate. Automated conversational workflows qualify buyers and book sales meetings in under 10 seconds.',
    metrics: [
      { num: '< 10s', label: 'Response Time', desc: 'Instant 24/7 multi-channel greeting' },
      { num: '21x', label: 'Higher Close', desc: 'Harvard Business Review research' },
      { num: '0%', label: 'Leaked Leads', desc: 'Zero prospect dropped' }
    ],
    cta: 'Accelerate Your Pipeline →'
  },
  {
    filename: 'geo_ai_search.png',
    bgImage: 'dm_seo.png',
    accentColor: '#60A5FA',
    accentGrad: 'linear-gradient(90deg, #60A5FA, #93C5FD, #00C8E6)',
    badge: 'Generative Engine Optimization',
    kicker: 'AI SEARCH & DISCOVERY',
    title: 'Is Your Brand Visible In',
    titleHighlight: 'ChatGPT, Gemini & Perplexity?',
    subtitle: 'Buyers no longer just click 10 blue links on Google—they ask AI for vendor recommendations. We architect your digital presence so LLMs cite your business as the verified authority.',
    metrics: [
      { num: 'Top 3', label: 'AI Citations', desc: 'Cited in Perplexity & ChatGPT' },
      { num: '+280%', label: 'Qualified Reach', desc: 'High-intent B2B decision makers' },
      { num: '0-Lag', label: 'Knowledge Graph', desc: 'Machine-readable semantic schema' }
    ],
    cta: 'Get Your AI Search Audit →'
  },
  {
    filename: 'custom_software.png',
    bgImage: 'wd_custom.png',
    accentColor: '#38BDF8',
    accentGrad: 'linear-gradient(90deg, #38BDF8, #60A5FA, #93C5FD)',
    badge: 'Enterprise Software Architecture',
    kicker: 'SOFTWARE MODERNIZATION',
    title: 'Stop Paying SaaS Taxes.',
    titleHighlight: 'Build & Own Your Platform.',
    subtitle: 'Generic tools charge \$3,000+/month in per-seat licenses while locking your data in silos. Custom enterprise portals, ERPs, and CRMs give you 100% IP ownership with zero licensing fees.',
    metrics: [
      { num: '100%', label: 'IP Ownership', desc: 'Complete control of code & data' },
      { num: '$0', label: 'Per-Seat Tax', desc: 'Scale headcount without license hikes' },
      { num: '3x', label: 'Team Efficiency', desc: 'Tailored to your exact workflow' }
    ],
    cta: 'Explore Custom Software →'
  },
  {
    filename: 'ai_workflow.png',
    bgImage: 'wd_automation.png',
    accentColor: '#38BDF8',
    accentGrad: 'linear-gradient(90deg, #38BDF8, #818CF8, #C084FC)',
    badge: 'AI Process Mining & Orchestration',
    kicker: 'WORKFLOW AUTOMATION & REVENUE OPS',
    title: 'Replace 40-Step Manual Tasks',
    titleHighlight: 'With Autonomous AI Execution.',
    subtitle: 'Stop paying high-skilled teams to copy-paste between spreadsheets, CRMs, and ERPs. We engineer end-to-end intelligent pipelines that execute operational tasks in real time.',
    metrics: [
      { num: '90%', label: 'Time Saved', desc: 'Zero human touches on backoffice tasks' },
      { num: '0-Error', label: 'Precision', desc: 'Machine accuracy across billing & ops' },
      { num: '4.8x', label: 'Speed Lift', desc: 'Minutes to complete multi-day tasks' }
    ],
    cta: 'Automate Operations →'
  },
  {
    filename: 'microservices_devops.png',
    bgImage: 'wd_maintenance.png',
    accentColor: '#F43F5E',
    accentGrad: 'linear-gradient(90deg, #F43F5E, #FDA4AF, #FB7185)',
    badge: 'Monolith to Microservices & Cloud',
    kicker: 'ENTERPRISE ARCHITECTURE & DEVOPS',
    title: 'Stop Letting 10-Year-Old Code',
    titleHighlight: 'Paralyze Enterprise Scaling.',
    subtitle: 'When a single bug brings down your whole production app, it is time to decouple. We refactor legacy monoliths into resilient, scalable microservices with zero operational downtime.',
    metrics: [
      { num: '99.99%', label: 'System Uptime', desc: 'Fault-isolated independent services' },
      { num: '10x', label: 'Deploy Speed', desc: 'Release features in minutes, not weeks' },
      { num: '-60%', label: 'Infra Waste', desc: 'Scale only high-demand micro-modules' }
    ],
    cta: 'Modernize Your Stack →'
  },
  {
    filename: 'enterprise_rag.png',
    bgImage: 'about_team.png',
    accentColor: '#F59E0B',
    accentGrad: 'linear-gradient(90deg, #F59E0B, #FBBF24, #FB923C)',
    badge: 'Private Enterprise RAG & AI Brain',
    kicker: 'ENTERPRISE DATA & AI SEARCH',
    title: 'Turn 10,000 Internal Documents',
    titleHighlight: 'Into An Instant AI Brain.',
    subtitle: 'Stop wasting 2.5 hours every day digging through PDFs, drive folders, and chat histories. Securely query your company\'s entire knowledge base with verified page citations in seconds.',
    metrics: [
      { num: '< 2s', label: 'Query Latency', desc: 'Instant verified citations' },
      { num: '100%', label: 'Data Security', desc: 'Zero public training; strict RBAC' },
      { num: '+65%', label: 'Productivity', desc: 'Reclaim 12+ lost hours per employee' }
    ],
    cta: 'Engineer Your AI Brain →'
  },
  {
    filename: 'whatsapp_sales.png',
    bgImage: 'dm_whatsapp.png',
    accentColor: '#10B981',
    accentGrad: 'linear-gradient(90deg, #10B981, #34D399, #06B6D4)',
    badge: 'WhatsApp Business API + AI Triage',
    kicker: 'CONVERSATIONAL SALES & CRM',
    title: 'Stop Losing 80% Of Inbound Leads.',
    titleHighlight: 'Close Deals On WhatsApp.',
    subtitle: 'With 98% open rates and sub-10 second AI response, turn inbound WhatsApp chats into qualified discovery meetings directly on your sales team\'s calendar.',
    metrics: [
      { num: '98%', label: 'Open Rate', desc: '5x higher than traditional B2B cold email' },
      { num: '< 10s', label: 'AI Response', desc: 'Instant 24/7 qualification & booking' },
      { num: '4.2x', label: 'Conversion Lift', desc: 'Frictionless chat-to-meeting speed' }
    ],
    cta: 'Deploy WhatsApp AI →'
  }
];

function buildHtml(item) {
  const bgPath = path.join(IMAGES_DIR, item.bgImage);
  const bgBase64 = 'data:image/png;base64,' + fs.readFileSync(bgPath).toString('base64');

  const metricsHtml = item.metrics.map(m => `
    <div class="metric-card">
      <div class="metric-val">${m.num}</div>
      <div class="metric-label">${m.label}</div>
      <div class="metric-desc">${m.desc}</div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  body {
    width: 1080px;
    height: 1080px;
    position: relative;
    overflow: hidden;
    background: #000;
  }
  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 1080px;
    height: 1080px;
    object-fit: cover;
    filter: brightness(0.68) contrast(1.08);
  }
  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(7, 19, 43, 0.40) 0%, rgba(7, 19, 43, 0.72) 48%, rgba(5, 10, 22, 0.96) 100%);
  }
  .content {
    position: absolute;
    inset: 0;
    padding: 60px 65px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    height: 52px;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.6));
  }
  .badge {
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid ${item.accentColor}80;
    backdrop-filter: blur(16px);
    color: ${item.accentColor};
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 10px 22px;
    border-radius: 999px;
  }
  .center-box {
    margin-top: auto;
    margin-bottom: 25px;
  }
  .kicker {
    color: ${item.accentColor};
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .kicker::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 3px;
    background: ${item.accentColor};
    border-radius: 2px;
  }
  .title {
    color: #FFFFFF;
    font-size: 50px;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -1px;
    margin-bottom: 18px;
    text-shadow: 0 4px 20px rgba(0,0,0,0.8);
  }
  .title-highlight {
    background: ${item.accentGrad};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .subtitle {
    color: #E2E8F0;
    font-size: 20px;
    line-height: 1.45;
    max-width: 940px;
    margin-bottom: 26px;
    text-shadow: 0 2px 10px rgba(0,0,0,0.7);
  }
  .metrics-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  .metric-card {
    background: rgba(15, 23, 42, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: 18px 22px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }
  .metric-val {
    font-size: 34px;
    font-weight: 900;
    color: ${item.accentColor};
    letter-spacing: -0.5px;
    margin-bottom: 4px;
  }
  .metric-label {
    font-size: 15px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 4px;
  }
  .metric-desc {
    font-size: 13px;
    color: #94A3B8;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    padding-top: 22px;
  }
  .footer-contact {
    display: flex;
    gap: 28px;
    color: #CBD5E1;
    font-size: 16px;
    font-weight: 600;
  }
  .footer-contact strong {
    color: #FFFFFF;
  }
  .cta-pill {
    background: ${item.accentGrad};
    color: #090E1A;
    font-size: 15px;
    font-weight: 800;
    padding: 12px 28px;
    border-radius: 999px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
  }
</style>
</head>
<body>
  <img src="${bgBase64}" class="bg-image" />
  <div class="overlay"></div>
  <div class="content">
    <div class="header">
      <img src="${LOGO_BASE64}" class="logo" />
      <div class="badge">${item.badge}</div>
    </div>
    <div class="center-box">
      <div class="kicker">${item.kicker}</div>
      <h1 class="title">${item.title} <span class="title-highlight">${item.titleHighlight}</span></h1>
      <p class="subtitle">${item.subtitle}</p>
      <div class="metrics-row">
        ${metricsHtml}
      </div>
    </div>
    <div class="footer">
      <div class="footer-contact">
        <div>🌐 <strong>vybtek.com</strong></div>
        <div>📞 <strong>+91 8000530501</strong></div>
        <div>📍 <strong>Enterprise IT Solutions</strong></div>
      </div>
      <div class="cta-pill">${item.cta}</div>
    </div>
  </div>
</body>
</html>`;
}

console.log('Rendering all 9 humanized creatives...');
for (const item of CREATIVES) {
  const outPng = path.join(CREATIVES_OUT, item.filename);
  const tmpHtml = path.join(ROOT_DIR, 'scratch', `${path.basename(item.filename, '.png')}.html`);
  const html = buildHtml(item);
  fs.writeFileSync(tmpHtml, html);
  console.log(`Rendering ${item.filename} using background: ${item.bgImage}...`);
  execSync(`"${EDGE_PATH}" --headless --disable-gpu --screenshot="${outPng}" --window-size=1080,1080 "${tmpHtml}"`);
  console.log(`✓ Generated ${outPng} (${fs.statSync(outPng).size} bytes)`);
}
console.log('All 9 humanized creatives rendered successfully!');
