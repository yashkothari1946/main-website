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
  id: 'ai-workflow-orchestration',
  kicker: 'WORKFLOW AUTOMATION & REVENUE OPS',
  badge: 'AI Process Mining & Orchestration',
  title: 'Replace 40-Step Manual Workflows With',
  titleHighlight: 'Autonomous AI Execution.',
  subtitle: 'Stop paying high-skilled teams to copy-paste between spreadsheets, CRMs, and ERPs. We engineer end-to-end intelligent pipelines that execute operational tasks in real time.',
  metrics: [
    { num: '90%', title: 'Time Saved', desc: 'Zero human touches on repetitive backoffice operations' },
    { num: '0-Error', title: 'Precision', desc: 'Machine accuracy across billing, onboarding, and compliance' },
    { num: '4.8x', title: 'Speed Lift', desc: 'Minutes to complete multi-step tasks that took days' }
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
    background: #0A0D18;
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
    background: radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 70%);
    filter: blur(80px);
    pointer-events: none;
  }
  .glow-2 {
    position: absolute;
    bottom: -150px;
    left: -150px;
    width: 550px;
    height: 550px;
    background: radial-gradient(circle, rgba(129, 140, 248, 0.18) 0%, transparent 70%);
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
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.35);
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #38BDF8;
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
    color: #38BDF8;
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
    background: linear-gradient(90deg, #38BDF8, #818CF8, #C084FC);
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
    border: 1px solid rgba(56, 189, 248, 0.22);
    border-radius: 18px;
    padding: 26px 22px;
    backdrop-filter: blur(12px);
  }
  .card-metric {
    font-size: 38px;
    font-weight: 900;
    color: #38BDF8;
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
    background: linear-gradient(135deg, #38BDF8, #6366F1);
    color: #0A0D18;
    padding: 14px 28px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 900;
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
    <div class="cta-pill">Automate Your Operations →</div>
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
  console.log('--- Generating High-Converting Creative for AI Workflow Orchestration ---');
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

  // Target scheduling: Oct 29, 2026 at 10:30 AM IST (05:00 UTC)
  const scheduledTime = '2026-10-29T05:00:00.000Z';
  console.log(`Target Scheduling Time: ${scheduledTime} (Oct 29, 10:30 AM IST)`);

  const imageUrl = 'https://vybtek.com/images/digital_marketing_hero.png';

  // 1. LinkedIn Post
  const linkedinText = `Your highest-paid employees shouldn't be human copy-paste bridges between software tools.

Consider a typical customer onboarding process:
1. Sales rep marks deal "Closed Won" in CRM.
2. Operations manually copies client details to an Excel sheet.
3. Accounting generates an invoice in QuickBooks.
4. Project manager creates 8 tasks across Jira/Trello.
5. Legal emails an NDA template.

It takes 3 days, 14 manual touchpoints, and one typo creates a billing nightmare.

In 2026, leading businesses orchestrate this with Autonomous AI Workflows:

⚡ Instant Trigger Execution: The second an event occurs, multi-system workflows fire asynchronously.
⚡ Intelligent Document Extraction: AI extracts line items, validates tax IDs, and routes contracts without human intervention.
⚡ Self-Healing Pipelines: If a third-party API responds with an error, the engine retries with exponential backoff and alerts on true anomalies.
⚡ 90% Overhead Reduction: Your team shifts from repetitive data entry to high-impact strategic growth.

Stop paying knowledge workers to do robot work.

👉 Want to audit your operations and automate your core business workflows?
🌐 Explore custom automation architectures: https://vybtek.com/services/software-development
📞 Direct Consultation: +91 8000530501
📩 Email: support@vybtek.com

#WorkflowAutomation #BusinessProcessAutomation #AIPipelines #OperationsExcellence #EnterpriseTech #VybTekITSolutions #ProductivityGains`;

  console.log('Scheduling on LinkedIn...');
  const liRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.linkedin,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: linkedinText,
    assets: [{ image: { url: imageUrl, metadata: { altText: 'AI Workflow Orchestration and Automation by VybTek IT Solutions' } } }]
  });
  console.log('✓ LinkedIn scheduled:', liRes.content[0].text);

  // 2. Facebook Post
  const facebookText = `Is your team drowning in repetitive, manual data entry every single day? 🤖📊

Copy-pasting between spreadsheets, CRMs, and invoicing software wastes hours and causes expensive mistakes.

With VybTek's AI-Powered Workflow Orchestration:
✅ Replace 40-step manual processes with automated pipelines.
✅ 90% reduction in backoffice task time.
✅ 100% precision: Zero human errors in billing, onboarding, and compliance.
✅ Connect your CRM, ERP, and communication tools into one unified system. 🚀

Let your team focus on business growth while AI handles the routine tasks.

👉 Book an operations automation consultation:
🌐 Visit: https://vybtek.com/services/software-development
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #WorkflowAutomation #BusinessEfficiency #CustomSoftware #TechSolutions #Productivity #UdaipurTech`;

  console.log('Scheduling on Facebook...');
  const fbRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.facebook,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: facebookText,
    metadata: { facebook: { type: 'post' } },
    assets: [{ image: { url: imageUrl, metadata: { altText: 'AI Workflow Orchestration by VybTek' } } }]
  });
  console.log('✓ Facebook scheduled:', fbRes.content[0].text);

  // 3. Instagram Post
  const instagramText = `Stop paying smart people to do robot work. 🤖⚙️

If your business relies on manual copy-pasting between spreadsheets, CRMs, and emails:
❌ You are bleeding billable hours
❌ Mistakes happen constantly
❌ Operations grind to a halt when someone is out sick

With VybTek's AI Process Orchestration:
⚡ 90% faster task execution
⚡ Zero data entry errors
⚡ Fully connected CRM, ERP & WhatsApp pipelines
⚡ Scalable operations without hiring more backoffice staff

Work smarter, not harder. 🚀

👉 Connect with our tech team today:
🌐 https://vybtek.com
📞 Call / WhatsApp: +91 8000530501
📩 support@vybtek.com

#VybTekITSolutions #WorkflowAutomation #AIPipelines #BusinessGrowth #TechModernization #CustomSoftware #Productivity`;

  console.log('Scheduling on Instagram...');
  const igRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.instagram,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: instagramText,
    metadata: { instagram: { type: 'post', shouldShareToFeed: true } },
    assets: [{ image: { url: imageUrl, metadata: { altText: 'AI Workflow Orchestration by VybTek' } } }]
  });
  console.log('✓ Instagram scheduled:', igRes.content[0].text);

  console.log('\n=== Daily Iteration 12 Complete! ===');
}

run().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
