const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = fs.existsSync('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe')
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';

const ROOT_DIR = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT_DIR, 'images');
const CREATIVES_OUT = path.join(IMAGES_DIR, 'creatives');
const ARTIFACT_DIR = 'C:\\Users\\rahul\\.gemini\\antigravity\\brain\\607423aa-3d4a-4686-8589-69199dc24e02';

const LOGO_PATH = path.join(IMAGES_DIR, 'logo.png');
const LOGO_BASE64 = 'data:image/png;base64,' + fs.readFileSync(LOGO_PATH).toString('base64');

const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

const CONFIG = {
  orgId: '6acddd7d94df59e6008804d8',
  channels: {
    linkedin: '6acdde02778b240e2ff4402c',
    facebook: '6acdde2d778b240e2ff44139',
    instagram: '6acdde4b778b240e2ff441f7'
  }
};

const CREATIVE_DATA = {
  filename: 'web_uiux_redesign.png',
  bgImage: 'wd_redesign.png',
  accentColor: '#00E5FF',
  accentGrad: 'linear-gradient(90deg, #00E5FF, #38BDF8, #818CF8)',
  badge: 'UI/UX Architecture & Conversion Redesign',
  kicker: 'DIGITAL EXPERIENCE & CRO',
  title: 'If Your Website Doesn\'t Convert In 3s,',
  titleHighlight: 'You Are Bleeding B2B Revenue.',
  subtitle: '94% of enterprise first impressions are design-related. We engineer lightning-fast, mobile-first web platforms and portals designed to turn passive visitors into qualified client pipeline.',
  metrics: [
    { num: '< 1.2s', label: 'Load Latency', desc: 'Edge-optimized Core Web Vitals' },
    { num: '+68%', label: 'Lead Conversions', desc: 'Frictionless UX pipeline flows' },
    { num: '100%', label: 'Responsive Sync', desc: 'Flawless desktop & mobile UX' }
  ],
  cta: 'Schedule UI/UX Redesign Audit →'
};

function buildHtml() {
  const bgPath = path.join(IMAGES_DIR, CREATIVE_DATA.bgImage);
  const bgBase64 = 'data:image/png;base64,' + fs.readFileSync(bgPath).toString('base64');

  const metricsHtml = CREATIVE_DATA.metrics.map(m => `
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
    border: 1px solid ${CREATIVE_DATA.accentColor}80;
    backdrop-filter: blur(16px);
    color: ${CREATIVE_DATA.accentColor};
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
    color: ${CREATIVE_DATA.accentColor};
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
    background: ${CREATIVE_DATA.accentColor};
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
    background: ${CREATIVE_DATA.accentGrad};
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
    color: ${CREATIVE_DATA.accentColor};
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
    background: ${CREATIVE_DATA.accentGrad};
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
      <div class="badge">${CREATIVE_DATA.badge}</div>
    </div>
    <div class="center-box">
      <div class="kicker">${CREATIVE_DATA.kicker}</div>
      <h1 class="title">${CREATIVE_DATA.title} <span class="title-highlight">${CREATIVE_DATA.titleHighlight}</span></h1>
      <p class="subtitle">${CREATIVE_DATA.subtitle}</p>
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
      <div class="cta-pill">${CREATIVE_DATA.cta}</div>
    </div>
  </div>
</body>
</html>`;
}

async function callMcpTool(toolName, args) {
  const payload = {
    jsonrpc: '2.0',
    id: Date.now(),
    method: 'tools/call',
    params: {
      name: toolName,
      arguments: args
    }
  };

  const res = await fetch(BUFFER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream'
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  return data.result;
}

async function run() {
  console.log('--- Rendering Unique Humanized Creative for UI/UX Redesign ---');
  const outPng = path.join(CREATIVES_OUT, CREATIVE_DATA.filename);
  const tmpHtml = path.join(ROOT_DIR, 'scratch', 'web_uiux_redesign.html');
  const html = buildHtml();
  fs.writeFileSync(tmpHtml, html);

  execSync(`"${EDGE_PATH}" --headless --disable-gpu --screenshot="${outPng}" --window-size=1080,1080 "${tmpHtml}"`);
  console.log(`✓ Rendered: ${outPng}`);

  // Copy to Brain Artifact
  const artifactPng = path.join(ARTIFACT_DIR, CREATIVE_DATA.filename);
  fs.copyFileSync(outPng, artifactPng);
  console.log(`✓ Copied to artifact dir: ${artifactPng}`);

  // Commit & push to GitHub for permanent public HTTPS URL
  console.log('Pushing new creative to GitHub main...');
  execSync('git add images/creatives/web_uiux_redesign.png && git commit -m "Add humanized UI/UX redesign creative" && git pull --rebase origin main && git push origin main', { cwd: ROOT_DIR });
  console.log('✓ Pushed to GitHub main.');

  const imageUrl = `https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/${CREATIVE_DATA.filename}`;
  const scheduledTime = '2026-10-31T05:00:00.000Z'; // Oct 31 @ 10:30 AM IST

  console.log(`\nTarget Scheduling: ${scheduledTime} (Oct 31, 10:30 AM IST)`);

  // 1. LinkedIn Post
  const linkedinText = `You can spend \$50,000 on Google Ads and LinkedIn campaigns, but if your website takes 4 seconds to load and looks like 2018, you are throwing money away.

Research by Google shows:
• 53% of mobile visits are abandoned if pages take over 3 seconds to load.
• 94% of enterprise first impressions are directly design-related.
• A 1-second delay reduces conversions by 7%.

In 2026, leading B2B companies engineer their digital presence for Conversion Architecture:

1️⃣ Sub-Second Edge Performance: Static-generated pages with serverless edge caching for instant global loads.
2️⃣ High-Intent Information Hierarchy: Clear, friction-free buyer journeys that lead prospects directly to discovery calls.
3️⃣ Mobile-First Enterprise UX: Ensuring executive decision-makers have a seamless experience on tablets and smartphones.
4️⃣ Integrated Conversion Pipelines: One-click calendar booking, WhatsApp lead triage, and dynamic case studies.

Your website shouldn't just be an online brochure. It should be your highest-performing sales rep.

👉 Is your website built to convert?
🌐 Claim your free UI/UX & Web Performance Audit: https://vybtek.com/services/web-development
📞 Direct Consultation: +91 8000530501
📩 Email: support@vybtek.com

#WebDesign #UIUX #ConversionRateOptimization #WebDevelopment #B2BGrowth #EnterpriseTech #VybTekITSolutions #DigitalModernization`;

  console.log('Scheduling LinkedIn post...');
  const liRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.linkedin,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: linkedinText,
    assets: [{ image: { url: imageUrl, metadata: { altText: 'Conversion-First Web & UI/UX Redesign by VybTek IT Solutions' } } }]
  });
  console.log('✓ LinkedIn scheduled:', JSON.parse(liRes.content[0].text).id);

  // 2. Facebook Post
  const facebookText = `Is your website turning visitors into clients, or bouncing them to competitors? 💻⚠️

If your website is slow, clunky, or outdated, you are losing high-value business before visitors even read your pitch.

With VybTek's Conversion-First Web & UI/UX Redesign:
✅ Blazing fast speed: Sub-1.2 second load times on all devices.
✅ Modern, human-centered UI/UX designed to build trust.
✅ Up to +68% lift in inbound lead form completions.
✅ Seamless mobile optimization and WhatsApp lead capture! 🚀

Transform your website from a passive brochure into an active revenue engine.

👉 Get a free UI/UX audit for your business:
🌐 Visit: https://vybtek.com/services/web-development
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #WebDevelopment #UIUXDesign #WebsiteRedesign #CRO #BusinessGrowth #TechSolutions #UdaipurTech`;

  console.log('Scheduling Facebook post...');
  const fbRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.facebook,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: facebookText,
    metadata: { facebook: { type: 'post' } },
    assets: [{ image: { url: imageUrl, metadata: { altText: 'Conversion-First Web & UI/UX Redesign by VybTek' } } }]
  });
  console.log('✓ Facebook scheduled:', JSON.parse(fbRes.content[0].text).id);

  // 3. Instagram Post
  const instagramText = `You have 3 seconds to make an impression. Don't waste it on a slow, outdated website. ⏱️✨

In 2026, 94% of first impressions are design-related.

With VybTek's UI/UX & Web Redesign:
⚡ Sub-1.2s edge-cached loading speed
⚡ Human-centered conversion architecture
⚡ +68% higher lead capture and booking rates
⚡ Flawless responsive mobile experience

Turn your traffic into paying clients. 🚀

👉 Book a free website performance review:
🌐 https://vybtek.com
📞 Call / WhatsApp: +91 8000530501
📩 support@vybtek.com

#VybTekITSolutions #WebDesign #UIUX #WebsiteRedesign #WebDevelopment #BusinessGrowth #TechInnovations #LeadGeneration`;

  console.log('Scheduling Instagram post...');
  const igRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.instagram,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: instagramText,
    metadata: { instagram: { type: 'post', shouldShareToFeed: true } },
    assets: [{ image: { url: imageUrl, metadata: { altText: 'Conversion-First Web & UI/UX Redesign by VybTek' } } }]
  });
  console.log('✓ Instagram scheduled:', JSON.parse(igRes.content[0].text).id);

  console.log('\n=== Daily Iteration 13 Complete! ===');
}

run().catch(err => {
  console.error('Execution failed:', err);
  process.exit(1);
});
