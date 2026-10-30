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
    height: 1920px;
    position: relative;
    overflow: hidden;
    background: #F8FAFC;
  }
  .bg-photo {
    position: absolute;
    top: 0;
    left: 0;
    width: 1080px;
    height: 1920px;
    object-fit: cover;
    object-position: 65% center;
    filter: contrast(1.02) brightness(0.98);
  }
  /* Top and Bottom soft white gradients for Story safe zones & contrast */
  .top-fade {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 600px;
    background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.88) 60%, rgba(255,255,255,0.0) 100%);
    z-index: 2;
  }
  .bottom-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 550px;
    background: linear-gradient(0deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.88) 60%, rgba(255,255,255,0.0) 100%);
    z-index: 2;
  }
  .content {
    position: absolute;
    inset: 0;
    padding: 120px 70px 140px 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
  }
  .top-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .logo-box {
    background: #FFFFFF;
    padding: 14px 30px;
    border-radius: 18px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    border: 1px solid #E2E8F0;
    margin-bottom: 30px;
  }
  .logo {
    height: 52px;
    display: block;
  }
  .badge {
    background: #0284C7;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 12px 28px;
    border-radius: 999px;
    box-shadow: 0 4px 16px rgba(2, 132, 199, 0.25);
    margin-bottom: 24px;
  }
  .super-title {
    font-size: 78px;
    font-weight: 900;
    line-height: 1.0;
    letter-spacing: -2px;
    color: #034694;
    text-transform: uppercase;
    margin-bottom: 12px;
    text-shadow: 0 2px 10px rgba(255,255,255,0.8);
  }
  .super-subtitle {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 6px;
    color: #0F172A;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 24px;
  }
  .super-subtitle::before, .super-subtitle::after {
    content: '';
    display: inline-block;
    width: 40px;
    height: 3px;
    background: #034694;
    border-radius: 2px;
  }
  .features-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    max-width: 800px;
  }
  .feature-pill {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid #CBD5E1;
    color: #0F172A;
    font-size: 15px;
    font-weight: 700;
    padding: 10px 22px;
    border-radius: 999px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  }
  .bottom-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .story-card {
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 24px;
    padding: 32px 40px;
    box-shadow: 0 12px 36px rgba(15, 23, 42, 0.1);
    width: 100%;
    margin-bottom: 30px;
  }
  .story-card-title {
    font-size: 26px;
    font-weight: 800;
    color: #0F172A;
    margin-bottom: 12px;
  }
  .story-card-desc {
    font-size: 18px;
    color: #475569;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  .metrics-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .metric-item {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 14px;
    padding: 14px;
  }
  .metric-val {
    font-size: 28px;
    font-weight: 900;
    color: #0284C7;
  }
  .metric-lbl {
    font-size: 12px;
    font-weight: 700;
    color: #64748B;
    text-transform: uppercase;
    margin-top: 2px;
  }
  .cta-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    width: 100%;
  }
  .cta-btn {
    background: #034694;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 800;
    padding: 18px 44px;
    border-radius: 999px;
    box-shadow: 0 8px 24px rgba(3, 70, 148, 0.35);
    display: inline-block;
  }
  .contact-footer {
    display: flex;
    gap: 30px;
    color: #334155;
    font-size: 16px;
    font-weight: 700;
  }
  .contact-footer strong {
    color: #0F172A;
  }
</style>
</head>
<body>
  <img src="${BG_HERO_BASE64}" class="bg-photo" />
  <div class="top-fade"></div>
  <div class="bottom-fade"></div>
  
  <div class="content">
    <div class="top-section">
      <div class="logo-box">
        <img src="${LOGO_BASE64}" class="logo" />
      </div>
      <div class="badge">GROWTH & CLIENT ACQUISITION</div>
      <h1 class="super-title">Scale Your<br/>Marketing</h1>
      <div class="super-subtitle">With VybTek IT Solutions</div>
      <div class="features-grid">
        <div class="feature-pill">🚀 High-ROI Paid Ads</div>
        <div class="feature-pill">🔍 AI Search & GEO</div>
        <div class="feature-pill">💬 WhatsApp AI Sales</div>
      </div>
    </div>

    <div class="bottom-section">
      <div class="story-card">
        <div class="story-card-title">Turn Cold Traffic Into Predictable Revenue</div>
        <p class="story-card-desc">We build full-funnel digital marketing & AI sales engines that help founders and businesses attract high-value clients consistently.</p>
        <div class="metrics-row">
          <div class="metric-item">
            <div class="metric-val">3.8x</div>
            <div class="metric-lbl">Pipeline Lift</div>
          </div>
          <div class="metric-item">
            <div class="metric-val">&lt; 10s</div>
            <div class="metric-lbl">Lead Response</div>
          </div>
          <div class="metric-item">
            <div class="metric-val">100%</div>
            <div class="metric-lbl">ROI Visibility</div>
          </div>
        </div>
      </div>

      <div class="cta-block">
        <div class="cta-btn">DM Us "GROWTH" For A Free Audit →</div>
        <div class="contact-footer">
          <div>🌐 <strong>vybtek.com</strong></div>
          <div>📞 <strong>+91 8000530501</strong></div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

const outPng = path.join(ROOT_DIR, 'images', 'creatives', 'instagram_story_marketing.png');
const tmpHtml = path.join(ROOT_DIR, 'scratch', 'test_instagram_story.html');
fs.writeFileSync(tmpHtml, html);
console.log('Rendering 1080x1920 instagram_story_marketing.png...');
execSync(`"${EDGE_PATH}" --headless --disable-gpu --screenshot="${outPng}" --window-size=1080,1920 "file:///${tmpHtml.replace(/\\/g, '/')}"`);
console.log(`✓ Rendered ${outPng} (${fs.statSync(outPng).size} bytes)`);

// Copy to artifact directory
const artifactDir = 'C:\\Users\\rahul\\.gemini\\antigravity\\brain\\607423aa-3d4a-4686-8589-69199dc24e02';
fs.copyFileSync(outPng, path.join(artifactDir, 'instagram_story_marketing.png'));
console.log('✓ Copied to artifact directory.');
