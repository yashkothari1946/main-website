const fetch = globalThis.fetch;

const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

const CONFIG = {
  channels: {
    linkedin: '6acdde02778b240e2ff4402c',
    facebook: '6acdde2d778b240e2ff44139',
    instagram: '6acdde4b778b240e2ff441f7'
  },
  creativeUrl: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/digital_marketing_services_hero.png',
  scheduledTime: '2026-11-04T05:00:00.000Z' // 10:30 AM IST on Wednesday, Nov 4, 2026
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

// Tailored platform copy highlighting full digital marketing services, onboarding new clients, and generating curiosity
const LINKEDIN_POST = `Most B2B digital marketing strategies fail because they are treated as disconnected experiments:

An ad agency running search keywords.
A freelancer writing generic blog posts.
A sales rep manually emailing prospects days late.

When your marketing, search authority, and sales workflows don't connect, you burn budget and lose 70%+ of qualified prospects.

At VybTek IT Solutions, we engineer unified Digital Marketing Systems that turn online visibility into predictable revenue:

🚀 1. Precision Performance Advertising:
Laser-targeted campaigns on LinkedIn and Google Ads that focus on qualified enterprise demo bookings—not vanity clicks.

🔍 2. Generative Engine Optimization (GEO & AEO):
Ensuring your business gets cited and recommended when buyers ask ChatGPT, Gemini, and Perplexity for enterprise solutions.

💬 3. WhatsApp Business API & AI Lead Triage:
Engage inbound inquiries in under 10 seconds 24/7, answer technical questions, and book meetings directly into your sales team's calendar.

⚡ 4. High-Conversion Edge Web Architecture:
Sub-1.2 second loading speeds with conversion-engineered UX that turns traffic into signed contracts.

📊 5. Closed-Loop Revenue Attribution:
Transparent reporting showing exactly which channel drove actual revenue into your business.

---
🤝 Looking to accelerate your company's growth this quarter?

We are partnering with ambitious B2B businesses, founders, and enterprise brands to build full-scale customer acquisition engines.

👉 Comment "GROWTH" or connect directly with our team:
🌐 Visit: https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #DigitalMarketing #B2BMarketing #BusinessGrowth #LeadGeneration #SalesAcceleration #TechPartnership #MarketingStrategy`;

const FACEBOOK_POST = `Is your digital marketing bringing you real, paying customers—or just vanity likes? 📈💼

In 2026, winning businesses don't rely on guesswork. They build connected marketing engines that consistently generate high-value inbound inquiries.

At VybTek IT Solutions, our full-suite Digital Marketing Services help you scale:
✅ High-ROI Paid Ad Campaigns (Google, Meta & LinkedIn)
✅ Generative Engine Optimization (Get recommended on ChatGPT & Perplexity)
✅ 24/7 WhatsApp AI Lead Qualification & Calendar Bookings
✅ High-Speed, Conversion-Engineered Website Development
✅ Closed-Loop ROI Tracking on every marketing rupee

Stop letting high-intent clients slip away to competitors.

🤝 Connect with VybTek today and let's build your custom growth roadmap!

👉 Book a Free Digital Marketing Audit:
🌐 https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 support@vybtek.com

#VybTekITSolutions #DigitalMarketing #BusinessGrowth #MarketingStrategy #LeadGen #SalesGrowth #BusinessScaling`;

const INSTAGRAM_POST = `Ready to scale your brand with predictable client acquisition? 🚀✨

At VybTek IT Solutions, we provide full-stack Digital Marketing Services engineered for high conversion and measurable ROI:

⚡ High-ROI Paid Advertising (Meta, Google, LinkedIn)
⚡ Generative Engine Optimization (GEO for ChatGPT & AI Search)
⚡ WhatsApp AI Conversational Triage (<10s automated response)
⚡ Sub-second Speed & High-Converting Web Design
⚡ 24/7 Automated Pipeline & Calendar Scheduling

Stop guessing. Start scaling with a proven digital marketing partner. 🤝

👉 Tap the link in our bio or get in touch with our team:
🌐 https://vybtek.com
📞 Call / WhatsApp: +91 8000530501
📩 support@vybtek.com

#VybTekITSolutions #DigitalMarketing #MarketingStrategy #BusinessGrowth #LeadGeneration #B2BGrowth #TechSolutions #InnovateAutomateTransform`;

(async () => {
  console.log(`Scheduling Digital Marketing Services Campaign for ${CONFIG.scheduledTime} (Wednesday, Nov 4 at 10:30 AM IST)...`);

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
            metadata: { altText: 'Digital Marketing Services By VybTek IT Solutions' }
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
            metadata: { altText: 'Digital Marketing Services By VybTek IT Solutions' }
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
            metadata: { altText: 'Digital Marketing Services By VybTek IT Solutions' }
          }
        }
      ]
    });
    console.log(`✓ Instagram Post Scheduled: ${JSON.parse(igRes.content[0].text).id}`);
  } catch (err) {
    console.error('Instagram Error:', err.message);
  }

  console.log('\nDigital Marketing Services Campaign Scheduled successfully!');
})();
