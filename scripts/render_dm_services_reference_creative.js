const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = fs.existsSync('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe')
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';

const ROOT_DIR = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT_DIR, 'images');
const LOGO_PATH = path.join(IMAGES_DIR, 'logo.png');
const LOGO_BASE64 = 'data:image/png;base64,' + fs.readFileSync(LOGO_PATH).toString('base64');
const BG_HERO_PATH = path.join(IMAGES_DIR, 'generated_marketing_hero.jpg');
const BG_HERO_BASE64 = 'data:image/jpeg;base64,' + fs.readFileSync(BG_HERO_PATH).toString('base64');

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
    left: 0;
    width: 1080px;
    height: 1080px;
    object-fit: cover;
    object-position: 68% center;
    filter: contrast(1.02) brightness(1.0);
  }
  /* Soft white fade at top and bottom to make headlines and footer pop crisply like user reference */
  .top-fade {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 380px;
    background: linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,0.0) 100%);
    z-index: 2;
  }
  .bottom-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 240px;
    background: linear-gradient(0deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.80) 50%, rgba(255,255,255,0.0) 100%);
    z-index: 2;
  }
  .content {
    position: absolute;
    inset: 0;
    padding: 50px 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
  }
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo-box {
    background: #FFFFFF;
    padding: 10px 22px;
    border-radius: 14px;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
    border: 1px solid #E2E8F0;
  }
  .logo {
    height: 42px;
    display: block;
  }
  .badge {
    background: #0284C7;
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 10px 22px;
    border-radius: 999px;
    box-shadow: 0 4px 14px rgba(2, 132, 199, 0.25);
  }
  .hero-headline-box {
    text-align: center;
    margin-top: 15px;
  }
  .super-title {
    font-size: 72px;
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -2px;
    color: #034694;
    text-transform: uppercase;
    margin-bottom: 8px;
    text-shadow: 0 2px 10px rgba(255,255,255,0.8);
  }
  .super-subtitle {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 6px;
    color: #0F172A;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
  .super-subtitle::before, .super-subtitle::after {
    content: '';
    display: inline-block;
    width: 40px;
    height: 3px;
    background: #034694;
    border-radius: 2px;
  }
  .pill-features {
    display: flex;
    justify-content: center;
    gap: 14px;
    margin-top: 14px;
  }
  .pill {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    border: 1px solid #CBD5E1;
    color: #1E293B;
    font-size: 13px;
    font-weight: 700;
    padding: 6px 16px;
    border-radius: 999px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  .footer-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid rgba(226, 232, 240, 0.9);
    padding-top: 18px;
  }
  .footer-left {
    display: flex;
    gap: 26px;
    color: #334155;
    font-size: 15px;
    font-weight: 700;
  }
  .footer-left strong {
    color: #0F172A;
  }
  .cta-pill {
    background: #034694;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: 800;
    padding: 12px 28px;
    border-radius: 999px;
    box-shadow: 0 6px 20px rgba(3, 70, 148, 0.3);
  }
</style>
</head>
<body>
  <img src="${BG_HERO_BASE64}" class="bg-photo" />
  <div class="top-fade"></div>
  <div class="bottom-fade"></div>
  <div class="content">
    <div>
      <div class="header-row">
        <div class="logo-box">
          <img src="${LOGO_BASE64}" class="logo" />
        </div>
        <div class="badge">Performance & Revenue Engine</div>
      </div>
      <div class="hero-headline-box">
        <h1 class="super-title">Digital<br/>Marketing</h1>
        <div class="super-subtitle">Services By VybTek</div>
        <div class="pill-features">
          <div class="pill">🚀 High-ROI Paid Ads</div>
          <div class="pill">🔍 AI Search & GEO</div>
          <div class="pill">💬 WhatsApp AI Sales</div>
          <div class="pill">⚡ 100% Closed-Loop ROI</div>
        </div>
      </div>
    </div>

    <div class="footer-row">
      <div class="footer-left">
        <div>🌐 <strong>vybtek.com</strong></div>
        <div>📞 <strong>+91 8000530501</strong></div>
        <div>📩 <strong>support@vybtek.com</strong></div>
      </div>
      <div class="cta-pill">Book Free Strategy Call →</div>
    </div>
  </div>
</body>
</html>`;

const outPng = path.join(ROOT_DIR, 'images', 'creatives', 'digital_marketing_services_hero.png');
const tmpHtml = path.join(ROOT_DIR, 'scratch', 'test_dm_hero.html');
fs.writeFileSync(tmpHtml, html);
console.log('Rendering digital_marketing_services_hero.png...');
execSync(`"${EDGE_PATH}" --headless --disable-gpu --screenshot="${outPng}" --window-size=1080,1080 "file:///${tmpHtml.replace(/\\/g, '/')}"`);
console.log(`✓ Rendered ${outPng} (${fs.statSync(outPng).size} bytes)`);

// Copy to artifact directory
const artifactDir = 'C:\\Users\\rahul\\.gemini\\antigravity\\brain\\607423aa-3d4a-4686-8589-69199dc24e02';
fs.copyFileSync(outPng, path.join(artifactDir, 'digital_marketing_services_hero.png'));
console.log('✓ Copied to artifact directory.');
