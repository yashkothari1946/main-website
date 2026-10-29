const fetch = globalThis.fetch;

const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

const CONFIG = {
  channels: {
    linkedin: '6acdde02778b240e2ff4402c',
    facebook: '6acdde2d778b240e2ff44139',
    instagram: '6acdde4b778b240e2ff441f7'
  },
  creativeUrl: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/marketing_growth_partnership.png',
  scheduledTime: '2026-10-30T05:00:00.000Z' // 10:30 AM IST on Friday, Oct 30
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

const LINKEDIN_POST = `Are you tired of pouring money into marketing that only brings "vanity metrics" instead of real, paying clients?

To all founders, CEOs, and business leaders scaling in 2026:

Marketing shouldn't be a creative gamble. It should be a predictable revenue engine.

At VybTek IT Solutions, we partner directly with ambitious companies to engineer full-funnel digital marketing and sales automation that fills your pipeline with qualified B2B buyers.

Here is what we build and manage for your business:

🚀 1. High-ROI Performance Advertising:
Laser-targeted campaigns on LinkedIn, Google, and Meta that focus on qualified demo bookings and closed deals—not just clicks.

🔍 2. Generative Engine Optimization (GEO & AEO):
Ensuring your business gets recommended when decision-makers search on ChatGPT, Gemini, and Perplexity for tech and enterprise solutions.

⚡ 3. WhatsApp Business API & AI Lead Triage:
Engage inbound inquiries in under 10 seconds, answer pricing/technical queries 24/7, and automatically book discovery meetings directly into your sales reps' calendars.

💻 4. Conversion-First Web & UI/UX Redesign:
Sub-1.2s loading speeds, high-converting funnel design, and edge-cached architecture that turns traffic into enterprise inquiries.

📊 5. Transparent Closed-Loop Attribution:
Know exactly which ad, campaign, and keyword resulted in actual revenue in your bank account.

---
🤝 We’re inviting ambitious businesses to connect with us this quarter:

Whether you're looking to launch an aggressive customer acquisition campaign, modernize your digital presence, or automate your sales pipeline, let's explore how we can grow together.

👉 Send a direct message here on LinkedIn, or connect with our growth team:
🌐 Visit: https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

Let's turn your marketing into your strongest competitive advantage.

#VybTekITSolutions #B2BMarketing #BusinessGrowth #DigitalMarketing #LeadGeneration #SalesAutomation #TechPartnership #EnterpriseGrowth #CEO #Founder`;

const FACEBOOK_POST = `Looking to scale your business with predictable leads and real revenue? 🚀📈

Marketing shouldn't just be about "likes" or impressions—it should consistently bring paying clients to your door.

At VybTek IT Solutions, we help businesses, startups, and enterprises build complete marketing & sales engines:

✅ High-ROI Performance Ads (Google Ads, Meta & LinkedIn)
✅ Generative Engine Optimization (Get recommended on ChatGPT, Gemini & Perplexity)
✅ WhatsApp AI Automation (Instant <10s lead qualification & meeting booking)
✅ High-Converting Website Design & SEO
✅ Full Sales Pipeline & CRM Integration

🤝 Connect with us today to see how we can help your business attract more high-value clients this quarter!

👉 Free Consultation & Growth Audit:
🌐 Visit: https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #DigitalMarketing #BusinessGrowth #MarketingAgency #LeadGen #SalesAcceleration #BusinessOwners`;

const INSTAGRAM_POST = `Is your marketing generating qualified leads, or just burning cash? 💡📊

In 2026, winning brands don't rely on random posts. They build predictable, automated client acquisition engines.

At VybTek IT Solutions, we partner with growing businesses to boost marketing, sales, and conversions:

⚡ High-ROI Paid Ad Campaigns (Meta, Google, LinkedIn)
⚡ Generative Engine Optimization (GEO for ChatGPT & AI Search)
⚡ WhatsApp Business API + Conversational AI Triage
⚡ Sub-second Speed & High-Converting Web Design
⚡ 24/7 Automated Pipeline & Calendar Bookings

Ready to take your business to the next level? Let's connect! 🚀

👉 Tap the link in our bio or get in touch directly:
🌐 https://vybtek.com
📞 Call / WhatsApp: +91 8000530501
📩 support@vybtek.com

#VybTekITSolutions #DigitalMarketing #B2BMarketing #LeadGeneration #BusinessScaling #MarketingStrategy #Entrepreneurship #TechSolutions`;

(async () => {
  console.log(`Scheduling Marketing Growth Partnership campaign for ${CONFIG.scheduledTime} (Friday 10:30 AM IST)...`);

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
            metadata: { altText: 'VybTek B2B Marketing and Sales Growth Partnership' }
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
            metadata: { altText: 'VybTek B2B Marketing and Sales Growth Partnership' }
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
            metadata: { altText: 'VybTek B2B Marketing and Sales Growth Partnership' }
          }
        }
      ]
    });
    console.log(`✓ Instagram Post Scheduled: ${JSON.parse(igRes.content[0].text).id}`);
  } catch (err) {
    console.error('Instagram Error:', err.message);
  }

  console.log('\nMarketing Partnership Campaign Scheduled across all 3 channels successfully!');
})();
