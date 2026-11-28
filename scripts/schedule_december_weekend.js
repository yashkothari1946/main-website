const fetch = globalThis.fetch;
const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

const CONFIG = {
  orgId: '6acddd7d94df59e6008804d8',
  channels: {
    linkedin: '6acdde02778b240e2ff4402c',
    facebook: '6acdde2d778b240e2ff44139'
  }
};

async function callMcpTool(name, args) {
  const payload = {
    jsonrpc: '2.0',
    id: Date.now(),
    method: 'tools/call',
    params: { name, arguments: args }
  };
  const res = await fetch(BUFFER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream'
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
  return data.result;
}

const NEW_CAMPAIGNS = [
  {
    topic: 'Performance Marketing & Precision B2B Paid Ad Funnels',
    time: '2026-12-04T05:00:00.000Z', // Fri Dec 4, 10:30 AM IST
    image: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/omnichannel_ads.png',
    altText: 'Performance Marketing and Paid Ads by VybTek IT Solutions',
    linkedinText: `Why do 80% of B2B paid advertising campaigns fail to generate profitable revenue?

Because most agencies optimize for vanity metrics: clicks, impressions, and cheap traffic that never converts into paying accounts.

A profitable B2B performance engine requires surgical targeting and full-funnel tracking:
🎯 Precision Retargeting: Nurturing high-intent decision-makers who visited key product pages.
🎯 Intent-Driven Search: Bidding strictly on commercial-intent queries with aggressive negative keyword filtering.
🎯 Conversion Rate Optimization (CRO): Pairing every paid ad with dedicated, high-speed landing pages tailored for booked meetings.

At VybTek IT Solutions, we engineer performance marketing funnels designed to deliver qualified pipeline, not vanity clicks.

Stop burning your marketing budget on unproven tactics.

👉 Book a paid acquisition & performance audit: https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#PerformanceMarketing #GoogleAds #MetaAds #B2BMarketing #PaidAcquisition #VybTekITSolutions #MarketingROI #LeadGeneration`,
    facebookText: `Stop burning your ad budget on vanity clicks that never buy! 🎯📈

If your Google or Meta ads are generating clicks but no real inquiries, your funnel is leaking revenue.

At VybTek IT Solutions, we build high-converting paid acquisition funnels:
✅ Laser-targeted audience segmentation for decision-makers
✅ High-speed landing pages engineered for instant inquiry conversion
✅ Complete tracking and ROI attribution from click to closed client

Make every marketing rupee work harder for your business!

👉 Claim your complimentary advertising funnel review:
🌐 Visit: https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #DigitalMarketing #GoogleAds #FacebookAds #B2BLeadGeneration #MarketingROI #BusinessGrowth`
  },
  {
    topic: 'UI/UX Re-Engineering: How Frictionless Interfaces Double Inbound Conversion',
    time: '2026-12-05T12:00:00.000Z', // Sat Dec 5, 5:30 PM IST
    image: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/web_uiux_redesign.png',
    altText: 'UI/UX Redesign and Conversion Engineering by VybTek IT Solutions',
    linkedinText: `High bounce rates and abandoned inquiries aren't traffic problems—they are UX friction problems.

When prospective clients land on your web app or website:
• 3 seconds of navigation confusion causes 50%+ of users to exit.
• Cluttered forms and buried contact points kill buyer intent instantly.
• Mobile unresponsiveness destroys enterprise credibility.

At VybTek IT Solutions, our UI/UX Engineering methodology combines modern aesthetic design with cognitive science:
✨ Frictionless User Journeys: Guiding visitors directly to high-value action points.
✨ Mobile-First Responsiveness: Flawless experience across phones, tablets, and 4K displays.
✨ Micro-Interactions & Trust Architecture: Clean visual hierarchy that reinforces enterprise authority.

Design is not just how it looks—it is how effortlessly it converts.

👉 Request a UI/UX & conversion friction teardown: https://vybtek.com/services/web-development
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#UIUXDesign #UserExperience #WebDesign #ProductDesign #ConversionOptimization #VybTekITSolutions #TechDesign #SoftwareDevelopment`,
    facebookText: `Is poor website design costing you new clients? 🎨💻

If visitors find your website confusing or hard to navigate on mobile, they leave within seconds.

At VybTek IT Solutions, we transform clunky websites and web apps into high-converting digital experiences:
✨ Modern, elegant visual design tailored to your brand
✨ Lightning-fast, mobile-friendly navigation
✨ Clear call-to-actions that double inbound inquiries

Upgrade your user experience and watch your conversions climb!

👉 See how a UI/UX redesign can boost your business:
🌐 Visit: https://vybtek.com/services/web-development
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #UIUXDesign #WebDesign #WebsiteRedesign #CustomerExperience #BusinessGrowth #TechServices`
  }
];

async function run() {
  console.log('=== Scheduling Extended Campaigns (Dec 4 & Dec 5) ===\n');
  for (const c of NEW_CAMPAIGNS) {
    console.log(`Scheduling: "${c.topic}" at ${c.time}`);
    // LinkedIn
    await callMcpTool('create_post', {
      channelId: CONFIG.channels.linkedin,
      schedulingType: 'automatic',
      mode: 'customScheduled',
      dueAt: c.time,
      text: c.linkedinText,
      assets: [{ image: { url: c.image, metadata: { altText: c.altText } } }]
    });
    console.log(`  ✓ LinkedIn Post Scheduled`);

    // Facebook
    await callMcpTool('create_post', {
      channelId: CONFIG.channels.facebook,
      schedulingType: 'automatic',
      mode: 'customScheduled',
      dueAt: c.time,
      text: c.facebookText,
      metadata: { facebook: { type: 'post' } },
      assets: [{ image: { url: c.image, metadata: { altText: c.altText } } }]
    });
    console.log(`  ✓ Facebook Post Scheduled`);
    console.log('--------------------------------------------------');
  }
  console.log('Campaigns through December 5 successfully queued in Buffer!');
}

run().catch(console.error);
