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

const OUT_DIR = path.join(__dirname, '..', 'scratch', 'creatives');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ARTIFACT_DIR = 'C:\\Users\\rahul\\.gemini\\antigravity\\brain\\607423aa-3d4a-4686-8589-69199dc24e02';

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
  id: 'legacy-modernization',
  kicker: 'ENTERPRISE ARCHITECTURE & MODERNIZATION',
  badge: 'Monolith to Microservices Engineering',
  title: 'Stop Letting 10-Year-Old Code',
  titleHighlight: 'Paralyze Enterprise Scaling.',
  subtitle: 'When a single bug brings down your whole production app, it is time to decouple. We refactor legacy monoliths into resilient, scalable microservices with zero operational downtime.',
  metrics: [
    { num: '99.99%', title: 'System Uptime', desc: 'Fault-isolated services that never crash the whole application' },
    { num: '10x', title: 'Deploy Velocity', desc: 'Ship independent feature updates in minutes, not months' },
    { num: '-60%', title: 'Infrastructure Waste', desc: 'Auto-scale only high-demand micro-modules on demand' }
  ]
};

function generateHtml() {
  const mHtml = CREATIVE_DATA.metrics.map(m => `
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
    background: #140A0F;
    color: #FFFFFF;
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
    background: radial-gradient(circle, rgba(244, 63, 94, 0.24) 0%, transparent 70%);
    filter: blur(80px);
    pointer-events: none;
  }
  .glow-2 {
    position: absolute;
    bottom: -150px;
    left: -150px;
    width: 550px;
    height: 550px;
    background: radial-gradient(circle, rgba(251, 113, 133, 0.16) 0%, transparent 70%);
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
    background: rgba(244, 63, 94, 0.12);
    border: 1px solid rgba(244, 63, 94, 0.35);
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #FDA4AF;
  }
  .main {
    position: relative;
    z-index: 10;
    margin: 20px 0;
  }
  .kicker {
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #FDA4AF;
    margin-bottom: 14px;
  }
  .title {
    font-size: 54px;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -1px;
    margin-bottom: 20px;
  }
  .title-highlight {
    background: linear-gradient(90deg, #F43F5E, #FDA4AF, #FB7185);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
  }
  .subtitle {
    font-size: 21px;
    line-height: 1.5;
    color: #94A3B8;
    max-width: 860px;
    margin-bottom: 38px;
    font-weight: 400;
  }
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }
  .card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(244, 63, 94, 0.22);
    border-radius: 18px;
    padding: 26px 22px;
    backdrop-filter: blur(12px);
  }
  .card-metric {
    font-size: 38px;
    font-weight: 900;
    color: #FDA4AF;
    letter-spacing: -0.5px;
    margin-bottom: 8px;
  }
  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 6px;
  }
  .card-desc {
    font-size: 13px;
    color: #94A3B8;
    line-height: 1.4;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 26px;
    position: relative;
    z-index: 10;
  }
  .footer-contact {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .footer-item {
    font-size: 15px;
    font-weight: 600;
    color: #94A3B8;
  }
  .footer-item strong {
    color: #FFFFFF;
  }
  .cta-pill {
    background: linear-gradient(135deg, #F43F5E, #BE123C);
    color: #FFFFFF;
    padding: 14px 28px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0.5px;
  }
</style>
</head>
<body>
  <div class="glow-1"></div>
  <div class="glow-2"></div>

  <div class="header">
    <div class="logo-wrap">
      <img src="${LOGO_BASE64}" alt="VybTek IT Solutions Logo" class="brand-logo-img" />
    </div>
    <div class="badge">${CREATIVE_DATA.badge}</div>
  </div>

  <div class="main">
    <div class="kicker">${CREATIVE_DATA.kicker}</div>
    <h1 class="title">
      ${CREATIVE_DATA.title}
      <span class="title-highlight">${CREATIVE_DATA.titleHighlight}</span>
    </h1>
    <p class="subtitle">${CREATIVE_DATA.subtitle}</p>

    <div class="metrics-grid">
      ${mHtml}
    </div>
  </div>

  <div class="footer">
    <div class="footer-contact">
      <div class="footer-item">🌐 <strong>vybtek.com</strong></div>
      <div class="footer-item">📞 <strong>+91 8000530501</strong></div>
      <div class="footer-item">📍 <strong>Enterprise IT Solutions</strong></div>
    </div>
    <div class="cta-pill">Schedule Architecture Review →</div>
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
  console.log('--- Generating High-Converting Creative for Monolith to Microservices ---');
  const htmlContent = generateHtml();
  const htmlPath = path.join(OUT_DIR, `${CREATIVE_DATA.id}.html`);
  const pngPath = path.join(OUT_DIR, `${CREATIVE_DATA.id}.png`);
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`Saved HTML: ${htmlPath}`);

  console.log('Rendering 1080x1080 PNG via headless Edge...');
  const cmd = `"${EDGE_PATH}" --headless --disable-gpu --screenshot="${pngPath}" --window-size=1080,1080 "${htmlPath}"`;
  execSync(cmd);
  console.log(`Rendered PNG: ${pngPath}`);

  // Mirror to Brain Artifact directory
  const artifactPng = path.join(ARTIFACT_DIR, `${CREATIVE_DATA.id}.png`);
  fs.copyFileSync(pngPath, artifactPng);
  console.log(`Copied creative to brain artifact: ${artifactPng}`);

  // Target scheduling: Oct 28, 2026 at 10:30 AM IST (05:00 UTC)
  const scheduledTime = '2026-10-28T05:00:00.000Z';
  console.log(`Target Scheduling Time: ${scheduledTime} (Oct 28, 10:30 AM IST)`);

  const imageUrl = 'https://vybtek.com/images/app_hero.png';

  // 1. LinkedIn Post
  const linkedinText = `Your engineering team wants to release a simple UI tweak.

Instead, the entire production deployment takes 4 hours, requires 6 engineers on standby, and triggers unexpected database lockups.

Welcome to the Monolith Trap.

As software grows, tightly coupled legacy codebases become your company's greatest growth bottleneck:
❌ A single bug in reporting crashes the checkout funnel.
❌ Deployments become so risky they are pushed to once a month.
❌ You must scale the entire backend infrastructure for one resource-heavy feature.

At VybTek IT Solutions, we specialize in Strangler Fig Monolith-to-Microservices refactoring:

1️⃣ Domain-Driven Boundary Decomposition: Extracting business services without stopping current operations.
2️⃣ Event-Driven Asynchronous Architecture: Decoupling communication via robust message queues for 99.99% fault tolerance.
3️⃣ Zero-Downtime Migration: Seamless traffic routing using API gateways and automated canary releases.
4️⃣ Independent Scalability: Auto-scale only high-throughput microservices, cutting cloud infrastructure costs by up to 60%.

Don't let legacy technical debt hold your enterprise back.

👉 Plan your modernization roadmap:
🌐 Explore custom software architecture: https://vybtek.com/services/software-development
📞 Direct Consultation: +91 8000530501
📩 Email: support@vybtek.com

#SoftwareArchitecture #Microservices #LegacyModernization #EnterpriseTech #CloudComputing #DevOps #VybTekITSolutions #TechLeadership`;

  console.log('Scheduling on LinkedIn...');
  const liRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.linkedin,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: linkedinText,
    assets: [{ image: { url: imageUrl, metadata: { altText: 'Legacy Monolith Modernization to Microservices by VybTek IT Solutions' } } }]
  });
  console.log('✓ LinkedIn scheduled:', liRes.content[0].text);

  // 2. Facebook Post
  const facebookText = `Is legacy technical debt slowing down your business growth? 💻⚠️

When your entire website or application crashes because of one small bug, it's time to modernize your architecture.

With VybTek's Monolith-to-Microservices Modernization:
✅ Break free from fragile, tangled codebases.
✅ Achieve 99.99% system uptime with fault-isolated services.
✅ Ship new features in minutes instead of weeks.
✅ Cut cloud hosting bills by up to 60% with smart auto-scaling.
✅ 100% zero-downtime refactoring! 🚀

Modernize your software without disrupting daily business operations.

👉 Book your software architecture review:
🌐 Visit: https://vybtek.com/services/software-development
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #SoftwareDevelopment #Microservices #TechModernization #CloudSolutions #AppDevelopment #UdaipurTech`;

  console.log('Scheduling on Facebook...');
  const fbRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.facebook,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: facebookText,
    metadata: { facebook: { type: 'post' } },
    assets: [{ image: { url: imageUrl, metadata: { altText: 'Legacy Monolith Modernization to Microservices by VybTek' } } }]
  });
  console.log('✓ Facebook scheduled:', fbRes.content[0].text);

  // 3. Instagram Post
  const instagramText = `One small bug shouldn't crash your whole business. ⚠️💥

If your app is built on a tangled, 10-year-old monolith:
❌ Releases take days of testing
❌ Scaling costs a fortune
❌ System crashes happen without warning

With VybTek's Microservices Modernization:
⚡ 99.99% fault-isolated uptime
⚡ 10x faster feature deployment
⚡ 60% lower cloud infrastructure costs
⚡ Zero downtime during migration

Build technology that scales with your ambitions. 🚀

👉 Connect with our senior engineering team:
🌐 https://vybtek.com
📞 Call / WhatsApp: +91 8000530501
📩 support@vybtek.com

#VybTekITSolutions #Microservices #SoftwareEngineering #TechModernization #AppDevelopment #CustomSoftware #BusinessGrowth`;

  console.log('Scheduling on Instagram...');
  const igRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.instagram,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: instagramText,
    metadata: { instagram: { type: 'post', shouldShareToFeed: true } },
    assets: [{ image: { url: imageUrl, metadata: { altText: 'Legacy Monolith Modernization to Microservices by VybTek' } } }]
  });
  console.log('✓ Instagram scheduled:', igRes.content[0].text);

  console.log('\n=== Daily Iteration 11 Complete! ===');
}

run().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
