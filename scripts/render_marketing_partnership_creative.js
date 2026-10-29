const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = fs.existsSync('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe')
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';

const ROOT_DIR = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT_DIR, 'images');
const CREATIVES_OUT = path.join(IMAGES_DIR, 'creatives');
const LOGO_PATH = path.join(IMAGES_DIR, 'logo.png');
const LOGO_BASE64 = 'data:image/png;base64,' + fs.readFileSync(LOGO_PATH).toString('base64');

// We use dm_social.png or about_team.png for authentic human marketing strategy context
const bgPath = path.join(IMAGES_DIR, 'dm_social.png');
const bgBase64 = 'data:image/png;base64,' + fs.readFileSync(bgPath).toString('base64');

const item = {
  filename: 'marketing_growth_partnership.png',
  accentColor: '#0284C7',
  badge: 'B2B Marketing & Growth Partnership',
  kicker: 'INVITATION FOR GROWING BUSINESSES',
  title: 'Tired Of Inconsistent Inbound Deals?',
  titleHighlight: 'Scale Your Marketing With VybTek.',
  subtitle: 'We partner with founders, B2B enterprises, and ambitious brands to engineer predictable client acquisition engines—combining High-ROI Paid Ads, GEO & AI Search, WhatsApp Sales Automation, and Conversion Web Design.',
  metrics: [
    { num: '3.8x', label: 'Pipeline Lift', desc: 'Average inbound lead velocity' },
    { num: '< 10s', label: 'Lead Velocity', desc: 'Instant 24/7 triage on WhatsApp & Web' },
    { num: '100%', label: 'Closed-Loop', desc: 'Transparent ROI & revenue attribution' }
  ],
  cta: 'Partner With VybTek →'
};

const metricsHtml = item.metrics.map(m => `
  <div class="stat-card">
    <div class="stat-val" style="color: ${item.accentColor};">${m.num}</div>
    <div class="stat-title">${m.label}</div>
    <div class="stat-desc">${m.desc}</div>
  </div>
`).join('');

const html = `<!DOCTYPE html>
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

const outPng = path.join(CREATIVES_OUT, item.filename);
const tmpHtml = path.join(ROOT_DIR, 'scratch', 'marketing_growth_partnership.html');
fs.writeFileSync(tmpHtml, html);
console.log('Rendering marketing_growth_partnership.png...');
execSync(`"${EDGE_PATH}" --headless --disable-gpu --screenshot="${outPng}" --window-size=1080,1080 "file:///${tmpHtml.replace(/\\/g, '/')}"`);
console.log(`✓ Rendered ${outPng} (${fs.statSync(outPng).size} bytes)`);

// Also copy to artifact directory
const artifactDir = 'C:\\Users\\rahul\\.gemini\\antigravity\\brain\\607423aa-3d4a-4686-8589-69199dc24e02';
fs.copyFileSync(outPng, path.join(artifactDir, item.filename));
console.log('✓ Copied to artifact directory.');
