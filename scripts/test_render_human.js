const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = fs.existsSync('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe')
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';

const LOGO_PATH = path.join(__dirname, '..', 'images', 'logo.png');
const LOGO_BASE64 = 'data:image/png;base64,' + fs.readFileSync(LOGO_PATH).toString('base64');
const BG_IMG_PATH = path.join(__dirname, '..', 'images', 'dm_analytics.png');
const BG_BASE64 = 'data:image/png;base64,' + fs.readFileSync(BG_IMG_PATH).toString('base64');

const html = `<!DOCTYPE html>
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
    background: rgba(0, 200, 230, 0.18);
    border: 1px solid rgba(0, 200, 230, 0.45);
    backdrop-filter: blur(16px);
    color: #00E5FF;
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
    color: #00E5FF;
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
    background: #00E5FF;
    border-radius: 2px;
  }
  .title {
    color: #FFFFFF;
    font-size: 52px;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -1px;
    margin-bottom: 18px;
    text-shadow: 0 4px 20px rgba(0,0,0,0.8);
  }
  .title-highlight {
    background: linear-gradient(90deg, #00E5FF, #3B82F6, #60A5FA);
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
    color: #00E5FF;
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
    background: linear-gradient(135deg, #00C8E6, #007CC3);
    color: #090E1A;
    font-size: 15px;
    font-weight: 800;
    padding: 12px 28px;
    border-radius: 999px;
    box-shadow: 0 4px 20px rgba(0, 200, 230, 0.35);
  }
</style>
</head>
<body>
  <img src="${BG_BASE64}" class="bg-image" />
  <div class="overlay"></div>
  <div class="content">
    <div class="header">
      <img src="${LOGO_BASE64}" class="logo" />
      <div class="badge">Omnichannel Growth Engine</div>
    </div>
    <div class="center-box">
      <div class="kicker">REVENUE OPERATIONS</div>
      <h1 class="title">Why 1-Channel Marketing <span class="title-highlight">Loses 70% of Enterprise Deals.</span></h1>
      <p class="subtitle">When algorithm changes hit, single-channel businesses crash. We align your web, performance ads, and automated WhatsApp nurturing into one unified client acquisition machine.</p>
      <div class="metrics-row">
        <div class="metric-card">
          <div class="metric-val">+342%</div>
          <div class="metric-label">Average ROI</div>
          <div class="metric-desc">Multi-touch pipeline velocity</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">8-14</div>
          <div class="metric-label">Touchpoints</div>
          <div class="metric-desc">Automated multi-channel retention</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">24/7</div>
          <div class="metric-label">Lead Pipeline</div>
          <div class="metric-desc">Always-on client conversion</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-contact">
        <div>🌐 <strong>vybtek.com</strong></div>
        <div>📞 <strong>+91 8000530501</strong></div>
        <div>📍 <strong>Enterprise IT Solutions</strong></div>
      </div>
      <div class="cta-pill">Claim Growth Audit →</div>
    </div>
  </div>
</body>
</html>`;

const tmpHtml = path.join(__dirname, '..', 'scratch', 'test_human_creative.html');
const tmpPng = path.join(__dirname, '..', 'scratch', 'test_human_creative.png');
fs.writeFileSync(tmpHtml, html);
console.log('Rendering via Edge...');
execSync(`"${EDGE_PATH}" --headless --disable-gpu --screenshot="${tmpPng}" --window-size=1080,1080 "${tmpHtml}"`);
console.log('Rendered test human creative successfully:', tmpPng);
