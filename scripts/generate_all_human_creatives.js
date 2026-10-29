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
    accentColor: '#0284C7',
    badge: 'Omnichannel Growth Engine',
    kicker: 'REVENUE OPERATIONS & RETENTION',
    title: 'Why 1-Channel Marketing',
    titleHighlight: 'Loses 70% of Enterprise Deals.',
    subtitle: 'When algorithm shifts happen, single-channel businesses stall. We align your web, performance ads, and automated WhatsApp nurturing into one unified client acquisition machine.',
    metrics: [
      { num: '+342%', label: 'Average ROI', desc: 'Multi-touch pipeline velocity' },
      { num: '8-14', label: 'Touchpoints', desc: 'Automated omnichannel retention' },
      { num: '24/7', label: 'Lead Flow', desc: 'Continuous client qualification' }
    ],
    cta: 'Claim Growth Audit →'
  },
  {
    filename: 'omnichannel_ads.png',
    bgImage: 'dm_ads.png',
    accentColor: '#4F46E5',
    badge: 'Precision Ad Retargeting',
    kicker: 'PAID PERFORMANCE & CAC REDUCTION',
    title: 'Stop Burning Ad Budgets',
    titleHighlight: 'On First-Click Bounces.',
    subtitle: '97% of B2B buyers do not buy on their first visit. We deploy high-intent retargeting sequences across LinkedIn and Google that convert cold clicks into booked demos.',
    metrics: [
      { num: '-45%', label: 'Lower CAC', desc: 'Smarter audience segmentation' },
      { num: '3.8x', label: 'ROAS Lift', desc: 'Full-funnel remarketing engine' },
      { num: '100%', label: 'Attribution', desc: 'Closed-loop revenue tracking' }
    ],
    cta: 'Optimize Your Ads →'
  },
  {
    filename: 'speed_to_lead.png',
    bgImage: 'dm_reputation.png',
    accentColor: '#0EA5E9',
    badge: 'B2B Lead Acceleration',
    kicker: 'CONVERSATION TO CLIENT',
    title: 'Why 5-Minute Lead Response',
    titleHighlight: 'Triples B2B Sales.',
    subtitle: 'Inquiries answered within 5 minutes are 21x more likely to convert. We engineer 24/7 intelligent triage pipelines that turn incoming chats into qualified calendar bookings.',
    metrics: [
      { num: '< 10s', label: 'Response Time', desc: 'Instant 24/7 qualification' },
      { num: '4.2x', label: 'Conversion Lift', desc: 'Frictionless speed-to-meeting' },
      { num: '100%', label: 'CRM Sync', desc: 'Zero lost prospects or lag' }
    ],
    cta: 'Automate Lead Triage →'
  },
  {
    filename: 'geo_ai_search.png',
    bgImage: 'dm_seo.png',
    accentColor: '#2563EB',
    badge: 'Generative Engine Optimization',
    kicker: 'AI SEARCH & AUTHORITY BLUEPRINTS',
    title: 'Is Your Brand Visible When',
    titleHighlight: 'Buyers Ask ChatGPT & Perplexity?',
    subtitle: 'Legacy SEO keywords no longer guarantee discovery. We structure your digital assets with semantic knowledge graphs so top LLMs recommend your services as verified answers.',
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
    accentColor: '#0284C7',
    badge: 'Enterprise Software Architecture',
    kicker: 'SOFTWARE MODERNIZATION',
    title: 'Stop Paying SaaS Taxes.',
    titleHighlight: 'Build & Own Your Platform.',
    subtitle: 'Generic SaaS tools charge $3,000+/month in per-seat licenses while locking your data in silos. Custom enterprise portals, ERPs, and CRMs give you 100% IP ownership with zero licensing fees.',
    metrics: [
      { num: '100%', label: 'IP Ownership', desc: 'Complete control of code & data' },
      { num: '$0', label: 'Per-Seat Tax', desc: 'Scale headcount without license hikes' },
      { num: '3x', label: 'Team Efficiency', desc: 'Tailored to your exact workflow' }
    ],
    cta: 'Explore Custom Software →'
  },
  {
    filename: 'ai_workflow.png',
    bgImage: 'creative_workspace.png',
    accentColor: '#7C3AED',
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
    accentColor: '#E11D48',
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
    accentColor: '#D97706',
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
    accentColor: '#059669',
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
  },
  {
    filename: 'web_uiux_redesign.png',
    bgImage: 'wd_redesign.png',
    accentColor: '#2563EB',
    badge: 'Conversion-First UI/UX & Web',
    kicker: 'DIGITAL EXPERIENCE & SPEED OPTIMIZATION',
    title: 'You Have 3 Seconds to Impress.',
    titleHighlight: "Don't Waste It On A Slow Site.",
    subtitle: 'In 2026, 94% of first impressions are design-driven. We rebuild corporate websites into sub-second, edge-cached lead generation engines that turn visitors into enterprise clients.',
    metrics: [
      { num: '< 1.2s', label: 'Page Load Speed', desc: 'Sub-second edge caching worldwide' },
      { num: '+68%', label: 'Lead Capture', desc: 'Engineered conversion funnels' },
      { num: '100%', label: 'Mobile Optimized', desc: 'Flawless responsive experience' }
    ],
    cta: 'Request Website Audit →'
  },
  {
    filename: 'enterprise_web_portal.png',
    bgImage: 'wd_webapp.png',
    accentColor: '#0284C7',
    badge: 'Enterprise Client & Vendor Portals',
    kicker: 'CLIENT EXPERIENCE & OPS EFFICIENCY',
    title: 'Stop Managing Key Clients',
    titleHighlight: 'Through Messy Email Threads.',
    subtitle: 'Modern enterprise clients expect self-service speed. We build bespoke client and vendor portals that automate document handoffs, real-time status tracking, and invoicing.',
    metrics: [
      { num: '24/7', label: 'Self-Service', desc: 'Instant access to orders & updates' },
      { num: '-70%', label: 'Support Tickets', desc: 'Eliminate repetitive email queries' },
      { num: 'Bank-Grade', label: 'Security', desc: 'Role-based access & encrypted data' }
    ],
    cta: 'Build Your Client Portal →'
  }
];

function buildHtml(item) {
  const bgPath = path.join(IMAGES_DIR, item.bgImage);
  const bgBase64 = 'data:image/png;base64,' + fs.readFileSync(bgPath).toString('base64');

  const metricsHtml = item.metrics.map(m => `
    <div class="stat-card">
      <div class="stat-val" style="color: ${item.accentColor};">${m.num}</div>
      <div class="stat-title">${m.label}</div>
      <div class="stat-desc">${m.desc}</div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  body {
    width: 1080px;
    height: 1080px;
    position: relative;
    overflow: hidden;
    background: #F8FAFC;
  }
  .bg-photo {
    position: absolute;
    top: 0;
    right: 0;
    width: 650px;
    height: 1080px;
    object-fit: cover;
    object-position: center;
    filter: contrast(1.05) brightness(1.02);
  }
  .bg-fade {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #F8FAFC 0%, #F8FAFC 48%, rgba(248, 250, 252, 0.88) 66%, rgba(248, 250, 252, 0.25) 100%);
  }
  .content {
    position: absolute;
    inset: 0;
    padding: 64px 70px;
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
  .logo-container {
    background: #FFFFFF;
    padding: 12px 26px;
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
    border: 1px solid #E2E8F0;
    display: flex;
    align-items: center;
  }
  .logo {
    height: 48px;
    display: block;
  }
  .category-badge {
    background: ${item.accentColor};
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 10px 22px;
    border-radius: 999px;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
  }
  .main-body {
    max-width: 690px;
  }
  .kicker {
    color: ${item.accentColor};
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .kicker::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 3px;
    background: ${item.accentColor};
    border-radius: 2px;
  }
  .headline {
    color: #0F172A;
    font-size: 48px;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -1px;
    margin-bottom: 18px;
  }
  .headline span {
    color: ${item.accentColor};
  }
  .subtext {
    color: #475569;
    font-size: 20px;
    line-height: 1.5;
    margin-bottom: 30px;
    font-weight: 500;
  }
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  .stat-card {
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  }
  .stat-val {
    font-size: 34px;
    font-weight: 900;
    margin-bottom: 4px;
    letter-spacing: -0.5px;
  }
  .stat-title {
    font-size: 15px;
    font-weight: 700;
    color: #0F172A;
    margin-bottom: 4px;
  }
  .stat-desc {
    font-size: 13px;
    color: #64748B;
    line-height: 1.35;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid #E2E8F0;
    padding-top: 22px;
  }
  .footer-left {
    display: flex;
    gap: 28px;
    color: #334155;
    font-size: 16px;
    font-weight: 600;
  }
  .footer-left strong {
    color: #0F172A;
  }
  .cta-btn {
    background: #0F172A;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: 700;
    padding: 13px 28px;
    border-radius: 999px;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.2);
  }
</style>
</head>
<body>
  <img src="${bgBase64}" class="bg-photo" />
  <div class="bg-fade"></div>
  <div class="content">
    <div class="header">
      <div class="logo-container">
        <img src="${LOGO_BASE64}" class="logo" />
      </div>
      <div class="category-badge">${item.badge}</div>
    </div>
    <div class="main-body">
      <div class="kicker">${item.kicker}</div>
      <h1 class="headline">${item.title} <span>${item.titleHighlight}</span></h1>
      <p class="subtext">${item.subtitle}</p>
      <div class="cards-grid">
        ${metricsHtml}
      </div>
    </div>
    <div class="footer">
      <div class="footer-left">
        <div>🌐 <strong>vybtek.com</strong></div>
        <div>📞 <strong>+91 8000530501</strong></div>
        <div>📩 <strong>support@vybtek.com</strong></div>
      </div>
      <div class="cta-btn">${item.cta}</div>
    </div>
  </div>
</body>
</html>`;
}

console.log('Rendering all 11 high-contrast humanized creatives...');
for (const item of CREATIVES) {
  const outPng = path.join(CREATIVES_OUT, item.filename);
  const tmpHtml = path.join(ROOT_DIR, 'scratch', `${path.basename(item.filename, '.png')}.html`);
  const html = buildHtml(item);
  fs.writeFileSync(tmpHtml, html);
  console.log(`Rendering ${item.filename} using backdrop: ${item.bgImage}...`);
  execSync(`"${EDGE_PATH}" --headless --disable-gpu --screenshot="${outPng}" --window-size=1080,1080 "file:///${tmpHtml.replace(/\\/g, '/')}"`);
  console.log(`✓ Generated ${outPng} (${fs.statSync(outPng).size} bytes)`);
}
console.log('All 11 high-contrast humanized creatives rendered successfully!');
