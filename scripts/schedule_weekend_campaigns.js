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
    topic: 'WhatsApp Automated Sales & Client Onboarding Pipeline',
    time: '2026-11-28T05:00:00.000Z', // Nov 28, 10:30 AM IST
    image: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/whatsapp_sales.png',
    altText: 'WhatsApp Automated Sales and Client Onboarding by VybTek IT Solutions',
    linkedinText: `Why are top B2B companies shifting customer acquisition and support directly to WhatsApp?

Because email open rates average 21%, while WhatsApp messages enjoy a 98% open rate and 45-60% response rate within the first hour.

If your sales team is still chasing prospects across cold emails and phone calls that go to voicemail, you are losing high-intent buyers to competitors who meet them where they already are.

At VybTek IT Solutions, we engineer official WhatsApp Business API & AI automation suites that:
✅ Triage inbound inquiries and qualify buyer intent in under 15 seconds.
✅ Send catalog selections, brochures, and dynamic portfolio links instantly.
✅ Book discovery calls straight into your sales calendar.
✅ Deliver instant automated follow-ups without manual rep intervention.

Ready to turn your WhatsApp channel into a 24/7 revenue engine?

👉 Explore our Conversational Commerce & Automation services: https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#WhatsAppBusiness #SalesAutomation #B2BGrowth #LeadConversion #VybTekITSolutions #CustomerExperience #TechInnovation #DigitalMarketing`,
    facebookText: `Turn WhatsApp into your most profitable 24/7 sales channel! 📲💼

With a 98% open rate, WhatsApp outperforms traditional email marketing by a mile. 

At VybTek IT Solutions, we build custom automated WhatsApp workflows that:
⚡ Respond to leads in seconds
⚡ Share product catalogs & portfolios
⚡ Automatically book discovery meetings
⚡ Nurture prospects until they convert

Don't let interested leads wait hours for a reply. Modernize your sales pipeline today!

👉 Connect with our team:
🌐 Visit: https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #WhatsAppAutomation #LeadGeneration #BusinessGrowth #SalesPipeline #DigitalSolutions`
  },
  {
    topic: 'Enterprise Web Modernization: Why Slow Websites Bleed B2B Revenue',
    time: '2026-11-29T12:00:00.000Z', // Nov 29, 5:30 PM IST
    image: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/enterprise_web_portal.png',
    altText: 'Enterprise Web Portal Modernization by VybTek IT Solutions',
    linkedinText: `Your website is not just a digital brochure—it is your primary sales rep that never sleeps.

Yet, most enterprise websites suffer from:
❌ Clunky monolithic templates that take 5+ seconds to load on mobile.
❌ Weak technical SEO and broken Core Web Vitals that tank search ranking.
❌ Confusing user journeys with zero conversion-rate-optimization (CRO).

Every 1-second delay in page load time reduces conversions by up to 7%.

At VybTek IT Solutions, we design and build bespoke high-speed web portals, Next.js web applications, and enterprise platforms tailored for frictionless user experience and high conversion.

What we build:
⚡ Sub-second page loads with modern Jamstack & Next.js architectures.
⚡ High-converting UX/UI designed for enterprise credibility.
⚡ Full API integrations with your CRM, analytics, and marketing engines.

Let's turn your web presence into an active pipeline generator.

👉 Schedule a technical architecture & UX review: https://vybtek.com/services/web-development
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#WebDevelopment #EnterpriseTech #UXDesign #ConversionOptimization #NextJS #VybTekITSolutions #SoftwareEngineering #TechLeadership`,
    facebookText: `Is your website winning new clients—or driving them away? 🌐🚀

In B2B business, your website is your digital storefront. A slow, outdated website damages credibility and kills conversions.

At VybTek IT Solutions, we build high-speed, stunning custom websites and enterprise portals designed to convert visitors into booked meetings.

✨ Blazing-fast page loads (Next.js & Modern Tech)
✨ Mobile-first, responsive UX/UI
✨ Built-in SEO & Lead Capture Integrations

👉 Upgrade your web presence today:
🌐 Visit: https://vybtek.com/services/web-development
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #WebDevelopment #WebsiteRedesign #BusinessGrowth #CustomSoftware #TechSolutions`
  }
];

async function run() {
  console.log('=== Scheduling Weekend Campaigns (Nov 28 & Nov 29) ===\n');
  for (const c of NEW_CAMPAIGNS) {
    console.log(`Scheduling: "${c.topic}" at ${c.time}`);
    // LinkedIn
    const liRes = await callMcpTool('create_post', {
      channelId: CONFIG.channels.linkedin,
      schedulingType: 'automatic',
      mode: 'customScheduled',
      dueAt: c.time,
      text: c.linkedinText,
      assets: [{ image: { url: c.image, metadata: { altText: c.altText } } }]
    });
    console.log(`  ✓ LinkedIn Post Scheduled`);

    // Facebook
    const fbRes = await callMcpTool('create_post', {
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
  console.log('All weekend campaigns successfully queued in Buffer!');
}

run().catch(console.error);
