const fetch = globalThis.fetch;

const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

const CONFIG = {
  channels: {
    linkedin: '6acdde02778b240e2ff4402c',
    facebook: '6acdde2d778b240e2ff44139',
    instagram: '6acdde4b778b240e2ff441f7'
  },
  creativeUrl: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/b2b_growth_advisory_boardroom.png',
  scheduledTime: '2026-11-05T05:00:00.000Z' // 10:30 AM IST on Thursday, Nov 5, 2026
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

const LINKEDIN_POST = `Why do enterprise B2B sales cycles drag on for 6 to 9 months?

Because prospective clients are forced to educate themselves through disconnected marketing collateral, slow email responses, and generic pitch decks.

In modern enterprise procurement, 83% of the buyer journey happens BEFORE they ever speak with a sales executive.

If your marketing strategy isn't actively shaping that self-education journey, your competitor is.

At VybTek IT Solutions, we partner with enterprise leaders and high-growth B2B companies to engineer full-funnel digital growth engines:

🎯 1. Account-Based Retargeting:
Deliver high-impact, problem-solving case studies directly to buying committees and CXOs across LinkedIn and Google.

🔍 2. Generative Engine Optimization (GEO & AEO):
Ensure your brand is cited and recommended as the category authority when enterprise procurement teams query ChatGPT, Gemini, and Perplexity.

🤖 3. WhatsApp Business API & Conversational Triage:
Enable sub-10 second automated response for inbound executive inquiries, providing verified technical specs and booking direct discovery consultations.

💻 4. High-Performance Digital Experience:
Sub-1.2s edge-cached web architecture with role-based client portals that remove friction from contracts, onboarding, and project status updates.

📊 5. Predictable Revenue Engineering:
Transparent attribution tracking every lead, pipeline stage, and customer acquisition metric.

---
🤝 Looking to accelerate your enterprise deal velocity this quarter?

Let's discuss how VybTek can engineer a predictable customer acquisition engine for your company.

👉 Connect with our enterprise tech & growth team:
🌐 Visit: https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #B2BMarketing #EnterpriseGrowth #SalesVelocity #DigitalMarketing #TechLeadership #RevenueOperations #BusinessScaling`;

const FACEBOOK_POST = `Is your B2B sales cycle moving too slowly? ⏳💼

When potential clients reach out, waiting hours or days for responses causes deals to cool off and leads to wander to competitors.

At VybTek IT Solutions, we help companies build modern digital marketing and sales engines that turn interest into signed enterprise contracts:

✅ High-ROI Targeted Advertising (LinkedIn, Google & Meta)
✅ Generative Engine Optimization (Get recommended on ChatGPT & Perplexity)
✅ 24/7 WhatsApp AI Lead Qualification & Calendar Scheduling
✅ High-Speed, Conversion-Engineered Web Experiences
✅ Closed-Loop Revenue Attribution Tracking

Stop losing high-value deals to friction. Build an automated growth engine that scales your business predictably. 🚀

👉 Book a Free Growth Strategy Consultation:
🌐 https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #DigitalMarketing #B2BGrowth #SalesAcceleration #BusinessGrowth #MarketingStrategy #LeadGeneration`;

const INSTAGRAM_POST = `Enterprise growth isn't about luck. It's about engineering. 📈🚀

In 2026, the companies scaling the fastest are those with connected marketing, search authority, and automated sales workflows:

⚡ Account-Based Advertising targeting active buying committees
⚡ AI Search Visibility (GEO for ChatGPT & Perplexity)
⚡ WhatsApp AI Triage answering inquiries in <10 seconds
⚡ Conversion-first web experiences that turn traffic into clients
⚡ 100% transparent ROI tracking on every growth initiative

Ready to build a predictable client acquisition engine for your brand? Partner with VybTek IT Solutions. 🤝

👉 Tap the link in our bio or get in touch directly:
🌐 https://vybtek.com
📞 Call / WhatsApp: +91 8000530501
📩 support@vybtek.com

#VybTekITSolutions #DigitalMarketing #B2BGrowth #SalesEngine #BusinessScaling #MarketingStrategy #TechPartnership #InnovateAutomateTransform`;

(async () => {
  console.log(`Scheduling B2B Growth Strategy campaign for ${CONFIG.scheduledTime} (Thursday, Nov 5 at 10:30 AM IST)...`);

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
            metadata: { altText: 'B2B Growth Strategy Engineered By VybTek IT Solutions' }
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
            metadata: { altText: 'B2B Growth Strategy Engineered By VybTek IT Solutions' }
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
            metadata: { altText: 'B2B Growth Strategy Engineered By VybTek IT Solutions' }
          }
        }
      ]
    });
    console.log(`✓ Instagram Post Scheduled: ${JSON.parse(igRes.content[0].text).id}`);
  } catch (err) {
    console.error('Instagram Error:', err.message);
  }

  console.log('\nB2B Growth Strategy Campaign Scheduled successfully for Thursday, Nov 5!');
})();
