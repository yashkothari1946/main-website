/**
 * VybTek Multi-Theme Creative Generator
 * Generates pixel-perfect 1080x1080 social media creatives with VybTek logo
 * Themes:
 *  1. cyber-obsidian (Dark tech, electric cyan)
 *  2. royal-sapphire (Deep corporate blue, cobalt)
 *  3. modern-light (Clean studio slate, minimalist enterprise)
 *  4. sunset-indigo (Dark violet, neon purple & cyan glow)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = fs.existsSync('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe')
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';

const LOGO_PATH = path.join(__dirname, '..', 'images', 'logo.png');
const LOGO_BASE64 = fs.existsSync(LOGO_PATH)
  ? `data:image/png;base64,${fs.readFileSync(LOGO_PATH).toString('base64')}`
  : 'https://vybtek.com/images/logo.png';

const THEMES = {
  'cyber-obsidian': {
    bg: '#090E1A',
    text: '#FFFFFF',
    textMuted: '#94A3B8',
    cardBg: 'rgba(255, 255, 255, 0.03)',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    accent1: '#00C8E6',
    accent2: '#3B82F6',
    gradientText: 'linear-gradient(90deg, #00C8E6, #60A5FA)',
    glow1: 'radial-gradient(circle, rgba(0, 200, 230, 0.22) 0%, transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(0, 124, 195, 0.18) 0%, transparent 70%)',
    badgeBg: 'rgba(0, 200, 230, 0.1)',
    badgeBorder: 'rgba(0, 200, 230, 0.3)',
    badgeColor: '#00C8E6',
    btnBg: 'linear-gradient(135deg, #00C8E6, #007CC3)',
    btnColor: '#090E1A',
    footerBorder: 'rgba(255, 255, 255, 0.08)'
  },
  'royal-sapphire': {
    bg: '#07132B',
    text: '#FFFFFF',
    textMuted: '#93C5FD',
    cardBg: 'rgba(30, 58, 138, 0.25)',
    cardBorder: 'rgba(96, 165, 250, 0.2)',
    accent1: '#60A5FA',
    accent2: '#00C8E6',
    gradientText: 'linear-gradient(90deg, #60A5FA, #93C5FD)',
    glow1: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(0, 200, 230, 0.15) 0%, transparent 70%)',
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    badgeBorder: 'rgba(96, 165, 250, 0.4)',
    badgeColor: '#93C5FD',
    btnBg: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
    btnColor: '#FFFFFF',
    footerBorder: 'rgba(96, 165, 250, 0.15)'
  },
  'sunset-indigo': {
    bg: '#0B091A',
    text: '#FFFFFF',
    textMuted: '#A78BFA',
    cardBg: 'rgba(139, 92, 246, 0.08)',
    cardBorder: 'rgba(167, 139, 250, 0.2)',
    accent1: '#A78BFA',
    accent2: '#EC4899',
    gradientText: 'linear-gradient(90deg, #A78BFA, #F472B6)',
    glow1: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(236, 72, 153, 0.18) 0%, transparent 70%)',
    badgeBg: 'rgba(167, 139, 250, 0.15)',
    badgeBorder: 'rgba(167, 139, 250, 0.35)',
    badgeColor: '#C4B5FD',
    btnBg: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    btnColor: '#FFFFFF',
    footerBorder: 'rgba(167, 139, 250, 0.15)'
  },
  'modern-light': {
    bg: '#F8FAFC',
    text: '#0F172A',
    textMuted: '#64748B',
    cardBg: '#FFFFFF',
    cardBorder: '#E2E8F0',
    accent1: '#0284C7',
    accent2: '#0D9488',
    gradientText: 'linear-gradient(90deg, #0284C7, #0D9488)',
    glow1: 'radial-gradient(circle, rgba(2, 132, 199, 0.08) 0%, transparent 70%)',
    glow2: 'radial-gradient(circle, rgba(13, 148, 136, 0.06) 0%, transparent 70%)',
    badgeBg: 'rgba(2, 132, 199, 0.08)',
    badgeBorder: 'rgba(2, 132, 199, 0.25)',
    badgeColor: '#0284C7',
    btnBg: 'linear-gradient(135deg, #0F172A, #1E293B)',
    btnColor: '#FFFFFF',
    footerBorder: '#E2E8F0'
  }
};

const TEMPLATES = [
  {
    id: 'geo-search',
    theme: 'cyber-obsidian',
    kicker: 'SEARCH HAS EVOLVED',
    badge: 'Generative Engine Optimization',
    title: 'Is Your Brand Visible In',
    titleHighlight: 'AI Search Engines?',
    subtitle: 'When buyers ask ChatGPT, Perplexity & Gemini for recommendations, we ensure your business is the cited solution.',
    metrics: [
      { num: 'Top 3', title: 'AI Citations', desc: 'Rank in Perplexity & ChatGPT answers' },
      { num: '+280%', title: 'Qualified Reach', desc: 'Attract high-intent decision makers' },
      { num: '0-Lag', title: 'Knowledge Graph', desc: 'Structured machine-readable data' }
    ]
  },
  {
    id: 'lead-speed',
    theme: 'royal-sapphire',
    kicker: 'PIPELINE VELOCITY',
    badge: '24/7 Lead Automation',
    title: 'Sub-Minute Inbound Triage',
    titleHighlight: 'Equals 21x Conversion',
    subtitle: 'Stop letting inquiries sit for 6 hours. AI workflows qualify prospects and book sales calls directly into your calendar.',
    metrics: [
      { num: '< 10s', title: 'Response Time', desc: 'Instant 24/7 multi-channel greeting' },
      { num: '3.4x', title: 'Discovery Calls', desc: 'Automated qualification & booking' },
      { num: '0%', title: 'Leaked Inquiries', desc: 'No prospect left unattended' }
    ]
  },
  {
    id: 'custom-software',
    theme: 'modern-light',
    kicker: 'SOFTWARE MODERNIZATION',
    badge: 'Enterprise Architecture',
    title: 'Stop Renting Generic SaaS.',
    titleHighlight: 'Own Your Platform.',
    subtitle: 'Break free from per-seat recurring taxes. Build proprietary software, portals, and ERPs designed for your exact operations.',
    metrics: [
      { num: '100%', title: 'IP Ownership', desc: 'Complete control of your code & data' },
      { num: '$0', title: 'Per-Seat Tax', desc: 'Scale headcount without license hikes' },
      { num: '3x', title: 'Team Efficiency', desc: 'Workflows built to fit your business' }
    ]
  },
  {
    id: 'omnichannel-growth',
    theme: 'sunset-indigo',
    kicker: 'REVENUE OPERATIONS',
    badge: 'Omnichannel Retargeting',
    title: 'Why 1-Channel Marketing',
    titleHighlight: 'Loses 70% of Deals',
    subtitle: 'Connect your website, paid ads, and automated WhatsApp & Email nurturing into one unified client acquisition machine.',
    metrics: [
      { num: '+342%', title: 'Average ROI', desc: 'Multi-touch pipeline acceleration' },
      { num: '8-14', title: 'Touchpoints', desc: 'Automated multi-channel retention' },
      { num: '24/7', title: 'Active Funnel', desc: 'Always-on conversion machine' }
    ]
  }
];

function buildHtml(template) {
  const t = THEMES[template.theme] || THEMES['cyber-obsidian'];

  const metricsHtml = template.metrics.map(m => `
    <div class="card">
      <div class="card-metric">${m.num}</div>
      <div class="card-title">${m.title}</div>
      <div class="card-desc">${m.desc}</div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  body {
    width: 1080px;
    height: 1080px;
    background: ${t.bg};
    color: ${t.text};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 70px;
    position: relative;
    overflow: hidden;
  }
  .glow-1 {
    position: absolute;
    top: -150px;
    right: -150px;
    width: 550px;
    height: 550px;
    background: ${t.glow1};
    filter: blur(80px);
    pointer-events: none;
  }
  .glow-2 {
    position: absolute;
    bottom: -150px;
    left: -150px;
    width: 550px;
    height: 550px;
    background: ${t.glow2};
    filter: blur(80px);
    pointer-events: none;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 10;
  }
  .logo-wrap {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .brand-logo-img {
    height: 52px;
    width: auto;
    object-fit: contain;
  }
  .badge {
    background: ${t.badgeBg};
    border: 1px solid ${t.badgeBorder};
    padding: 10px 22px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: ${t.badgeColor};
  }
  .dot {
    width: 10px;
    height: 10px;
    background: ${t.badgeColor};
    border-radius: 50%;
    box-shadow: 0 0 10px ${t.badgeColor};
  }
  .content {
    position: relative;
    z-index: 10;
    margin: 30px 0;
  }
  .kicker {
    font-size: 19px;
    color: ${t.accent1};
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 3px;
    margin-bottom: 18px;
  }
  h1 {
    font-size: 60px;
    line-height: 1.15;
    font-weight: 900;
    margin-bottom: 22px;
    letter-spacing: -1px;
    color: ${t.text};
  }
  h1 span {
    background: ${t.gradientText};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    font-size: 21px;
    color: ${t.textMuted};
    line-height: 1.5;
    max-width: 860px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 36px;
  }
  .card {
    background: ${t.cardBg};
    border: 1px solid ${t.cardBorder};
    border-radius: 20px;
    padding: 24px;
    backdrop-filter: blur(20px);
  }
  .card-metric {
    font-size: 38px;
    font-weight: 900;
    color: ${t.accent1};
    margin-bottom: 8px;
  }
  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: ${t.text};
    margin-bottom: 6px;
  }
  .card-desc {
    font-size: 13px;
    color: ${t.textMuted};
    line-height: 1.4;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${t.footerBorder};
    padding-top: 32px;
    position: relative;
    z-index: 10;
  }
  .contact-info {
    display: flex;
    gap: 35px;
    font-size: 18px;
    color: ${t.text};
    font-weight: 600;
  }
  .contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .cta-btn {
    background: ${t.btnBg};
    color: ${t.btnColor};
    font-size: 17px;
    font-weight: 800;
    padding: 16px 32px;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
</style>
</head>
<body>
  <div class="glow-1"></div>
  <div class="glow-2"></div>

  <div class="header">
    <div class="logo-wrap">
      <img src="${LOGO_BASE64}" class="brand-logo-img" alt="VybTek Logo">
    </div>
    <div class="badge">
      <div class="dot"></div>
      <span>${template.badge}</span>
    </div>
  </div>

  <div class="content">
    <div class="kicker">${template.kicker}</div>
    <h1>${template.title} <br><span>${template.titleHighlight}</span></h1>
    <p>${template.subtitle}</p>

    <div class="grid">
      ${metricsHtml}
    </div>
  </div>

  <div class="footer">
    <div class="contact-info">
      <div class="contact-item">📞 +91 8000530501</div>
      <div class="contact-item">🌐 vybtek.com</div>
    </div>
    <div class="cta-btn">Get Free Digital Audit →</div>
  </div>
</body>
</html>`;
}

function renderCreative(template, outputFilename) {
  const scratchDir = path.join(__dirname, '..', 'scratch', 'creatives');
  if (!fs.existsSync(scratchDir)) {
    fs.mkdirSync(scratchDir, { recursive: true });
  }

  const htmlPath = path.join(scratchDir, `${template.id}.html`);
  const pngPath = path.join(scratchDir, outputFilename || `${template.id}.png`);

  fs.writeFileSync(htmlPath, buildHtml(template), 'utf8');

  console.log(`Rendering creative [${template.id}] with theme "${template.theme}"...`);
  execSync(`"${EDGE_PATH}" --headless --disable-gpu --no-sandbox --screenshot="${pngPath}" --window-size=1080,1080 "${htmlPath}"`);

  console.log(`✓ Generated: ${pngPath} (${(fs.statSync(pngPath).size / 1024).toFixed(1)} KB)`);
  return pngPath;
}

function renderAll() {
  console.log('Generating full creative suite across multiple themes and contexts...');
  const rendered = [];
  for (const t of TEMPLATES) {
    const out = renderCreative(t);
    rendered.push(out);
  }
  return rendered;
}

if (require.main === module) {
  renderAll();
}

module.exports = { renderCreative, renderAll, TEMPLATES, THEMES };
