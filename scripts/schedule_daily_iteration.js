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
  id: 'whatsapp-ai-automation',
  kicker: 'CONVERSATIONAL COMMERCE & SALES',
  badge: 'WhatsApp Business API + AI Workflows',
  title: 'Stop Losing 80% Of Leads In Spam.',
  titleHighlight: 'Close Deals On WhatsApp.',
  subtitle: 'With 98% open rates and sub-10 second AI triage, engage and convert high-intent B2B buyers directly on the chat app they use every single day.',
  metrics: [
    { num: '98%', title: 'Open Rate', desc: '5x higher engagement than traditional B2B cold email' },
    { num: '< 10s', title: 'AI Response', desc: 'Instant 24/7 qualification & meeting booking' },
    { num: '4.2x', title: 'Conversion Lift', desc: 'Frictionless chat-to-calendar pipeline acceleration' }
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
    background: #061A14;
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
    background: radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%);
    filter: blur(80px);
    pointer-events: none;
  }
  .glow-2 {
    position: absolute;
    bottom: -150px;
    left: -150px;
    width: 550px;
    height: 550px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.20) 0%, transparent 70%);
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
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.35);
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #34D399;
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
    color: #34D399;
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
    background: linear-gradient(90deg, #10B981, #34D399, #06B6D4);
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
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 18px;
    padding: 26px 22px;
    backdrop-filter: blur(12px);
  }
  .card-metric {
    font-size: 38px;
    font-weight: 900;
    color: #34D399;
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
    background: linear-gradient(135deg, #10B981, #059669);
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
    <div class="cta-pill">Book Free Automation Audit →</div>
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
  console.log('--- Generating High-Converting Creative for WhatsApp AI Automation ---');
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

  // Target scheduling: Oct 26, 2026 at 10:30 AM IST (05:00 UTC)
  const scheduledTime = '2026-10-26T05:00:00.000Z';
  console.log(`Target Scheduling Time: ${scheduledTime} (Oct 26, 10:30 AM IST)`);

  const imageUrl = 'https://vybtek.com/images/dm_hero_vybtek.jpg';

  // 1. LinkedIn Post
  const linkedinText = `Email is dying a slow death in B2B sales.

Average cold email open rates are hovering under 18%, and response rates are down to 1.5%.

Meanwhile, your prospects open WhatsApp within 3 minutes of receiving a notification.

In 2026, leading B2B enterprises are deploying WhatsApp Business API integrated with AI Workflows:

1️⃣ Zero-Latency Lead Capture: When a prospect clicks an ad or website widget, they are immediately connected in WhatsApp.
2️⃣ 24/7 AI Sales Engineer: An intelligent agent answers technical queries, clarifies pricing tiers, and qualifies company budget in seconds.
3️⃣ One-Click Calendar Booking: Qualified prospects receive personalized meeting slots directly inside the chat interface.
4️⃣ Automated Follow-Ups: Intelligent re-engagement sequences that achieve 85%+ read rates without feeling spammy.

The result? Our clients experience a 4.2x lift in sales meeting velocity.

Stop losing high-value buyers to crowded email inboxes.

👉 Ready to integrate WhatsApp AI automation into your sales pipeline?
🌐 Explore our digital marketing & automation suite: https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp our team: +91 8000530501
📩 Email: support@vybtek.com

#WhatsAppBusiness #ConversationalAI #B2BMarketing #SalesAutomation #LeadGeneration #VybTekITSolutions #BusinessGrowth`;

  console.log('Scheduling on LinkedIn...');
  const liRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.linkedin,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: linkedinText,
    assets: [{ image: { url: imageUrl, metadata: { altText: 'WhatsApp Business API AI Workflows by VybTek IT Solutions' } } }]
  });
  console.log('✓ LinkedIn scheduled:', liRes.content[0].text);

  // 2. Facebook Post
  const facebookText = `Why wait days for email replies when you can close deals on WhatsApp in minutes? 💬⚡

Traditional email open rates are plummeting, but WhatsApp boasts a staggering 98% open rate.

With VybTek's AI-Powered WhatsApp Business Automation:
✅ Instantly capture leads from your ads and website.
✅ 24/7 AI triage answers questions and qualifies buyers.
✅ Book discovery meetings directly into your team's calendar.
✅ High-converting automated follow-up sequences.

Transform your customer acquisition into an instant conversational experience! 🚀

👉 Book a free automation consultation:
🌐 Visit: https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #WhatsAppAPI #SalesAutomation #LeadConversion #ConversationalAI #DigitalMarketing #UdaipurTech`;

  console.log('Scheduling on Facebook...');
  const fbRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.facebook,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: facebookText,
    metadata: { facebook: { type: 'post' } },
    assets: [{ image: { url: imageUrl, metadata: { altText: 'WhatsApp Business API AI Workflows by VybTek' } } }]
  });
  console.log('✓ Facebook scheduled:', fbRes.content[0].text);

  // 3. Instagram Post
  const instagramText = `Stop letting hot leads die in unanswered email inboxes. 📱💥

WhatsApp has a 98% open rate and a sub-3 minute response time.

With VybTek's WhatsApp Business API + Conversational AI:
⚡ Sub-10 second automated greeting and lead triage
⚡ 24/7 answering of technical and pricing questions
⚡ Direct-to-calendar meeting scheduling
⚡ 4.2x higher conversion from click to client

Don't wait for competitors to modernize first.

👉 Click the link in our bio or connect with our team directly:
🌐 https://vybtek.com
📞 Call / WhatsApp: +91 8000530501
📩 support@vybtek.com

#VybTekITSolutions #WhatsAppBusiness #AIAutomation #ConversationalCommerce #BusinessGrowth #TechInnovations #LeadGen`;

  console.log('Scheduling on Instagram...');
  const igRes = await callMcpTool('create_post', {
    channelId: CONFIG.channels.instagram,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt: scheduledTime,
    text: instagramText,
    metadata: { instagram: { type: 'post', shouldShareToFeed: true } },
    assets: [{ image: { url: imageUrl, metadata: { altText: 'WhatsApp Business API AI Workflows by VybTek' } } }]
  });
  console.log('✓ Instagram scheduled:', igRes.content[0].text);

  console.log('\n=== Daily Research, Creative Generation & Buffer Scheduling Complete! ===');
}

run().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
