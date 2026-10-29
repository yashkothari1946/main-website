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
  filename: 'enterprise_web_portal.png',
  bgImage: 'wd_webapp.png',
  accentColor: '#38BDF8',
  accentGrad: 'linear-gradient(90deg, #38BDF8, #60A5FA, #93C5FD)',
  badge: 'Enterprise Web Apps & Client Portals',
  kicker: 'ENTERPRISE SOFTWARE ENGINEERING',
  title: 'Modern B2B Buyers Refuse',
  titleHighlight: 'To Do Business Via Email Chains.',
  subtitle: 'Static PDF invoices and manual email status updates are costing you enterprise deals. We build secure, branded customer portals with real-time order tracking, self-service ticketing, and automated billing.',
  metrics: [
    { num: '100%', label: 'Self-Service', desc: '24/7 client portal access with 0 friction' },
    { num: '-70%', label: 'Admin Overhead', desc: 'Automated billing, status, & contracts' },
    { num: '< 800ms', label: 'Portal Speed', desc: 'Edge-cached high-security architecture' }
  ],
  cta: 'Engineer Your Client Portal →'
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
    filter: brightness(0.66) contrast(1.10);
  }
  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(7, 19, 43, 0.42) 0%, rgba(7, 19, 43, 0.74) 48%, rgba(5, 10, 22, 0.96) 100%);
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
  console.log('--- Rendering Unique Humanized Creative for Enterprise Web Portals ---');
  const outPng = path.join(CREATIVES_OUT, CREATIVE_DATA.filename);
  const tmpHtml = path.join(ROOT_DIR, 'scratch', 'enterprise_web_portal.html');
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
  execSync('git add images/creatives/enterprise_web_portal.png && git commit -m "Add humanized Enterprise Web Portal creative" && git pull --rebase origin main && git push origin main', { cwd: ROOT_DIR });
  console.log('✓ Pushed to GitHub main.');

  const imageUrl = `https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/${CREATIVE_DATA.filename}`;
  const scheduledTime = '2026-11-02T05:00:00.000Z'; // Nov 2 @ 10:30 AM IST

  console.log(`\nTarget Scheduling: ${scheduledTime} (Nov 2, 10:30 AM IST)`);

  // 1. LinkedIn Post
  const linkedinText = `If your B2B customers still have to email you asking: "What's the status of my order?", "Can you re-send last month's invoice?", or "Did you receive my file?"...

You are operating with a massive competitive disadvantage.

Consumer expectations have spilled into enterprise B2B. Buyers demand self-service transparency:

❌ Waiting 4 hours for an email reply creates friction.
❌ Fragmented spreadsheets and email attachments lead to billing errors.
❌ Unsecured file transfers risk sensitive client IP.

At VybTek IT Solutions, we engineer Custom Enterprise Client Portals & Web Applications:

1️⃣ 24/7 Self-Service Visibility: Real-time project tracking, automated invoice payment, and dynamic status updates.
2️⃣ Granular Role-Based Permissions (RBAC): Multi-tier access for executive buyers, billing managers, and technical liaisons.
3️⃣ Enterprise Security & Speed: Sub-second edge caching with end-to-end data encryption.
4️⃣ Automated Operations: Automatically syncs with your internal ERP and CRM with zero double-entry.

Give your enterprise clients the seamless digital experience they expect.

👉 Ready to build your proprietary customer portal?
🌐 Explore custom web engineering: https://vybtek.com/services/web-development
📞 Direct Consultation: +91 8000530501
📩 Email: support@vybtek.com

#WebDevelopment #EnterpriseSoftware #CustomerPortals #B2BTech #DigitalTransformation #CustomSoftware #VybTekITSolutions #TechModernization`;

  console.log('Scheduling LinkedIn post...');
  const liRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.linkedin,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: linkedinText,
    assets: [{ image: { url: imageUrl, metadata: { altText: 'Custom Enterprise Web Portals and Client Applications by VybTek IT Solutions' } } }]
  });
  console.log('✓ LinkedIn scheduled:', JSON.parse(liRes.content[0].text).id);

  // 2. Facebook Post
  const facebookText = `Are your clients still asking for invoice copies and project updates via email? 📧⏳

In 2026, top-performing businesses give their clients a branded, self-service customer portal.

With VybTek's Custom Client Portals & Web Applications:
✅ 24/7 Self-Service: Clients track progress, download invoices, and access files instantly.
✅ Cut administrative overhead by 70%.
✅ Bank-grade encryption and secure access controls.
✅ Fully integrated with your CRM and accounting software. 🚀

Deliver a modern, premium experience that keeps enterprise clients loyal!

👉 Book a free portal architecture consultation:
🌐 Visit: https://vybtek.com/services/web-development
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #WebDevelopment #ClientPortal #CustomSoftware #BusinessAutomation #EnterpriseTech #UdaipurTech`;

  console.log('Scheduling Facebook post...');
  const fbRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.facebook,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: facebookText,
    metadata: { facebook: { type: 'post' } },
    assets: [{ image: { url: imageUrl, metadata: { altText: 'Custom Enterprise Web Portals by VybTek' } } }]
  });
  console.log('✓ Facebook scheduled:', JSON.parse(fbRes.content[0].text).id);

  // 3. Instagram Post
  const instagramText = `Stop managing high-value clients through messy email threads. 💻📁

Modern B2B clients expect self-service speed.

With VybTek's Custom Client Portals:
⚡ 24/7 real-time project & order tracking
⚡ One-click invoice downloads & automated payments
⚡ 70% lower administrative support tickets
⚡ Bank-grade security & role-based permissions

Upgrade how your business serves enterprise clients. 🚀

👉 Connect with our senior engineering team:
🌐 https://vybtek.com
📞 Call / WhatsApp: +91 8000530501
📩 support@vybtek.com

#VybTekITSolutions #ClientPortal #WebDevelopment #CustomSoftware #EnterpriseTech #BusinessModernization #TechSolutions`;

  console.log('Scheduling Instagram post...');
  const igRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.instagram,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: instagramText,
    metadata: { instagram: { type: 'post', shouldShareToFeed: true } },
    assets: [{ image: { url: imageUrl, metadata: { altText: 'Custom Enterprise Web Portals by VybTek' } } }]
  });
  console.log('✓ Instagram scheduled:', JSON.parse(igRes.content[0].text).id);

  console.log('\n=== Daily Iteration 14 Complete! ===');
}

run().catch(err => {
  console.error('Execution failed:', err);
  process.exit(1);
});
