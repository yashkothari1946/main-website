const fetch = globalThis.fetch;

const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

const CONFIG = {
  channels: {
    linkedin: '6acdde02778b240e2ff4402c',
    facebook: '6acdde2d778b240e2ff44139',
    instagram: '6acdde4b778b240e2ff441f7'
  },
  creativeUrl: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/b2b_marketing_flywheel.png',
  scheduledTime: '2026-11-03T05:00:00.000Z' // 10:30 AM IST on Tuesday, Nov 3, 2026
};

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

const LINKEDIN_POST = `Why do 80% of B2B companies hit a revenue plateau between $1M and $10M?

They rely almost exclusively on "Word-of-Mouth" and client referrals.

Referrals are fantastic—until they fluctuate. When inbound referrals slow down, operations stall, and sales reps are left scrambling.

Predictable scaling requires a predictable Client Acquisition Engine.

Here is the 4-tier Growth Flywheel we engineer for B2B brands at VybTek IT Solutions:

1️⃣ Generative Engine Optimization (GEO & AEO):
When enterprise buyers ask ChatGPT or Perplexity for the top tech and service partners, your company is cited as the definitive answer.

2️⃣ Intent-Driven Paid Retargeting:
Zero budget waste on broad clicks. We target high-intent B2B decision makers across LinkedIn and Google Ads with problem-solving case studies.

3️⃣ 24/7 WhatsApp Conversational Sales Triage:
Engage new inbound prospects in under 10 seconds. Answer pricing, capability, and SLA inquiries automatically, and schedule discovery calls directly onto your sales reps' calendars.

4️⃣ Conversion-First Web Architecture:
Sub-1.2 second loading speeds with high-contrast UI/UX engineered to turn corporate visitors into booked client consultations.

Stop leaving your revenue growth to luck.

👉 Ready to turn your marketing into your primary competitive moat? Let's connect:
🌐 https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 support@vybtek.com

#VybTekITSolutions #B2BMarketing #BusinessGrowth #SalesEngine #LeadGeneration #DigitalMarketing #RevenueOps #EnterpriseScaling #TechSolutions`;

const FACEBOOK_POST = `Still relying entirely on word-of-mouth to grow your business? 📈⚠️

Referrals are great, but they are unpredictable. One month your team is overwhelmed with work, and the next month inbound inquiries go quiet.

To build sustainable, predictable growth in 2026, you need an automated Marketing & Sales Engine.

At VybTek IT Solutions, we help companies build full-funnel marketing machines:
✅ High-ROI Paid Advertising on Meta, Google & LinkedIn
✅ Generative Engine Optimization (Get recommended on ChatGPT & Perplexity)
✅ 24/7 WhatsApp AI Lead Qualification & Instant Meeting Booking
✅ Conversion-Engineered UI/UX & High-Speed Web Development
✅ Closed-Loop Revenue Attribution Tracking

Stop guessing with your marketing. Let's build a predictable system that fills your pipeline every single month. 🚀

👉 Schedule a Free Growth Strategy Consultation:
🌐 https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 support@vybtek.com

#VybTekITSolutions #DigitalMarketing #BusinessGrowth #LeadGeneration #B2BGrowth #SalesAutomation #MarketingStrategy`;

const INSTAGRAM_POST = `Word-of-mouth is great. A predictable sales engine is better. 💼🚀

When you depend solely on referrals, your growth is out of your hands.

Top-performing B2B brands in 2026 build multi-channel marketing engines that consistently generate high-value inbound inquiries:

⚡ Precision Paid Ads targeting active decision makers
⚡ AI Search Optimization (GEO for ChatGPT & Perplexity)
⚡ WhatsApp AI Triage that qualifies leads in under 10 seconds
⚡ Conversion-first websites that turn visitors into booked calls
⚡ 100% transparent attribution on every marketing dollar

Ready to scale with confidence? Connect with VybTek today! 🤝

👉 Tap the link in our bio or get in touch directly:
🌐 https://vybtek.com
📞 Call / WhatsApp: +91 8000530501
📩 support@vybtek.com

#VybTekITSolutions #DigitalMarketing #B2BMarketing #MarketingEngine #BusinessScaling #SalesGrowth #LeadGen #TechAgency`;

(async () => {
  console.log(`Scheduling Daily Iteration 15 for ${CONFIG.scheduledTime} (Tuesday, Nov 3 at 10:30 AM IST)...`);

  // 1. LinkedIn
  try {
    const liRes = await callMcpTool('create_post', {
      channelId: CONFIG.channels.linkedin,
      schedulingType: 'automatic',
      mode: 'customScheduled',
      dueAt: CONFIG.scheduledTime,
      text: LINKEDIN_POST,
      assets: [
        {
          image: {
            url: CONFIG.creativeUrl,
            metadata: { altText: 'VybTek B2B Marketing and Sales Flywheel Engine' }
          }
        }
      ]
    });
    console.log(`✓ LinkedIn Post Scheduled: ${JSON.parse(liRes.content[0].text).id}`);
  } catch (err) {
    console.error('LinkedIn Error:', err.message);
  }

  // 2. Facebook
  try {
    const fbRes = await callMcpTool('create_post', {
      channelId: CONFIG.channels.facebook,
      schedulingType: 'automatic',
      mode: 'customScheduled',
      dueAt: CONFIG.scheduledTime,
      text: FACEBOOK_POST,
      metadata: { facebook: { type: 'post' } },
      assets: [
        {
          image: {
            url: CONFIG.creativeUrl,
            metadata: { altText: 'VybTek B2B Marketing and Sales Flywheel Engine' }
          }
        }
      ]
    });
    console.log(`✓ Facebook Post Scheduled: ${JSON.parse(fbRes.content[0].text).id}`);
  } catch (err) {
    console.error('Facebook Error:', err.message);
  }

  // 3. Instagram
  try {
    const igRes = await callMcpTool('create_post', {
      channelId: CONFIG.channels.instagram,
      schedulingType: 'automatic',
      mode: 'customScheduled',
      dueAt: CONFIG.scheduledTime,
      text: INSTAGRAM_POST,
      metadata: { instagram: { type: 'post', shouldShareToFeed: true } },
      assets: [
        {
          image: {
            url: CONFIG.creativeUrl,
            metadata: { altText: 'VybTek B2B Marketing and Sales Flywheel Engine' }
          }
        }
      ]
    });
    console.log(`✓ Instagram Post Scheduled: ${JSON.parse(igRes.content[0].text).id}`);
  } catch (err) {
    console.error('Instagram Error:', err.message);
  }

  console.log('\nDaily Iteration 15 Complete!');
})();
