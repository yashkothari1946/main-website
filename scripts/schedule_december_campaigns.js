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

const NEXT_CAMPAIGNS = [
  {
    topic: 'Enterprise AI Automation: Eliminating 40+ Hours of Operational Drag',
    time: '2026-11-30T05:00:00.000Z', // Monday Nov 30, 10:30 AM IST
    image: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/ai_business_automation_lab.png',
    altText: 'Enterprise AI Automation and Operational Intelligence by VybTek IT Solutions',
    linkedinText: `The biggest competitive gap in business today isn't budget—it is operational velocity.

While high-growth companies use intelligent AI agents to automate contract review, invoice reconciliations, and CRM updates, traditional businesses are still drowning in manual data entry.

At VybTek IT Solutions, we engineer bespoke Enterprise AI Workflows that integrate seamlessly into your existing software stack:
🤖 Intelligent Document Extraction: Parse invoices, RFPs, and legal agreements in seconds.
⚡ Automated CRM & ERP Sync: Zero manual handoffs between sales, ops, and finance.
🧠 Custom Private LLM Pipelines: Query company knowledge bases securely with zero data leaks.

Stop burning high-value human talent on low-value repetitive tasks.

👉 Explore our Enterprise AI & Automation solutions: https://vybtek.com/services/ai-solutions
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#ArtificialIntelligence #EnterpriseAI #WorkflowAutomation #OperationalEfficiency #VybTekITSolutions #TechModernization #BusinessTransformation`,
    facebookText: `Is manual data entry and admin work slowing down your business growth? 🤖⚡

Top-performing companies don't hire dozens of clerks for routine admin—they deploy intelligent AI workflows.

At VybTek IT Solutions, we build custom AI automation systems that:
✅ Extract data from documents and PDFs automatically
✅ Sync client records across your CRM, ERP, and accounting tools
✅ Eliminate human error and cut processing time by 80%

Free up your team to focus on revenue and client relationships!

👉 Discover how AI can transform your operations:
🌐 Visit: https://vybtek.com/services/ai-solutions
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #AIAutomation #BusinessProductivity #WorkflowEfficiency #TechInnovation #SoftwareDevelopment`
  },
  {
    topic: 'Fractional CTO & Strategic Tech Advisory for Scaling Businesses',
    time: '2026-12-01T12:00:00.000Z', // Tuesday Dec 1, 5:30 PM IST
    image: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/b2b_growth_advisory_boardroom.png',
    altText: 'Strategic B2B Growth and Technology Advisory by VybTek IT Solutions',
    linkedinText: `Scaling companies reach a critical junction: you need elite technical leadership, but a full-time \$250,000+ CTO doesn't fit the current budget.

Without strategic technology leadership:
❌ Junior developers build architectural debt that costs 10x to rebuild later.
❌ You overpay for bloated vendor contracts and incompatible SaaS tools.
❌ Security vulnerabilities and scalability bottlenecks go unnoticed until an outage hits.

VybTek IT Solutions provides Strategic B2B Technology Advisory & Fractional CTO Services to fast-growing businesses.

We help founders and executive boards:
🎯 Architect scalable cloud and microservices foundations.
🎯 Audit and optimize tech infrastructure to slash operational costs.
🎯 Build robust data privacy, compliance, and enterprise security frameworks.

Get the strategic guidance of senior tech leadership with the flexibility your business needs.

👉 Book a confidential tech strategy session: https://vybtek.com/services/it-consulting
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#FractionalCTO #TechLeadership #ITConsulting #CloudArchitecture #VybTekITSolutions #BusinessScale #TechStrategy`,
    facebookText: `Need expert technology leadership to guide your business growth? 🚀👔

Hiring a full-time executive CTO can be cost-prohibitive. But without technical oversight, costly software mistakes happen quickly.

With VybTek's Strategic IT Consulting & Fractional Advisory:
✅ Audit your current software and cloud setup to eliminate waste
✅ Choose the right scalable tech stack for your next growth phase
✅ Protect your company data with enterprise-grade security standards

Get senior tech direction tailored to your exact roadmap.

👉 Schedule a consultation:
🌐 Visit: https://vybtek.com/services/it-consulting
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #ITConsulting #TechAdvisory #BusinessStrategy #CloudSolutions #SoftwareLeadership`
  }
];

async function run() {
  console.log('=== Scheduling Next Week Campaigns (Nov 30 & Dec 1) ===\n');
  for (const c of NEXT_CAMPAIGNS) {
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
  console.log('Campaigns through December 1 successfully queued in Buffer!');
}

run().catch(console.error);
