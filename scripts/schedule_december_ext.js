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
    topic: 'Microservices Architecture & DevOps Modernization: Scaling Without Outages',
    time: '2026-12-02T05:00:00.000Z', // Wed Dec 2, 10:30 AM IST
    image: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/microservices_devops.png',
    altText: 'Microservices and DevOps Engineering by VybTek IT Solutions',
    linkedinText: `Can your digital infrastructure survive a 10x traffic spike without crashing?

When high-growth companies scale, legacy monolithic backends reveal their cracks:
❌ A single bug in payment processing brings down the entire customer portal.
❌ Deploying a simple UI update requires a terrifying 4-hour scheduled maintenance window.
❌ Cloud hosting bills skyrocket because you cannot scale individual services independently.

At VybTek IT Solutions, we re-architect legacy web systems into resilient, cloud-native microservices:
⚡ Decoupled Service Mesh: Isolate failures so one service never takes down the platform.
⚡ Automated CI/CD Pipelines: Push code updates multiple times per day with zero downtime.
⚡ Intelligent Auto-Scaling: Scale server capacity up during peak rushes and down during quiet hours to slash AWS/GCP bills.

Modernize your software foundation before your next big growth surge breaks it.

👉 Discuss your infrastructure modernization roadmap: https://vybtek.com/services/cloud-solutions
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#Microservices #DevOps #CloudEngineering #SoftwareArchitecture #AWS #VybTekITSolutions #Scalability #TechLeadership`,
    facebookText: `Is your website or app built to handle sudden traffic surges? 💻⚙️

Nothing kills customer trust faster than a platform crash during peak sales or marketing campaigns.

At VybTek IT Solutions, we help growing businesses upgrade to cloud-native microservices & DevOps automation:
✅ 99.99% uptime with isolated service architectures
✅ Zero-downtime updates and automated deployments
✅ Optimized cloud costs that scale automatically with user demand

Build software that grows with your business!

👉 Book a technical architecture consultation:
🌐 Visit: https://vybtek.com/services/cloud-solutions
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #CloudArchitecture #DevOps #Microservices #TechInfrastructure #SoftwareEngineering`
  },
  {
    topic: 'Enterprise RAG & Private Knowledge AI: Zero Hallucinations, Maximum ROI',
    time: '2026-12-03T12:00:00.000Z', // Thu Dec 3, 5:30 PM IST
    image: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/enterprise_rag.png',
    altText: 'Enterprise Retrieval-Augmented Generation (RAG) by VybTek IT Solutions',
    linkedinText: `Generic AI chatbots sound convincing, but in enterprise operations, hallucinations and data leaks are unacceptable.

To deliver actual business value, AI must understand your specific products, contracts, SOPs, and client histories with 100% factual accuracy.

That is why leading organizations are deploying Retrieval-Augmented Generation (RAG) architectures engineered by VybTek IT Solutions:
🔒 100% Data Sovereignty: Your proprietary data remains completely private inside your secure cloud perimeter.
🎯 Grounded Truth: Every AI response is cited directly from internal manuals, ERP records, or verified policy docs.
⚡ Instant Retrieval: Complex legal, medical, or technical queries answered in under 2 seconds.

Transform decades of company documentation into an instant operational superpower.

👉 Request a private enterprise RAG proof-of-concept: https://vybtek.com/services/ai-solutions
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#EnterpriseAI #RAG #GenerativeAI #KnowledgeManagement #VybTekITSolutions #AIWorkflows #TechInnovation #B2BTech`,
    facebookText: `Turn your company documents and manuals into an instant AI assistant! 🧠📄

Tired of employees spending hours searching through folders, PDFs, and emails to find customer or operational answers?

With VybTek's Enterprise RAG (Retrieval-Augmented Generation) solutions:
✨ AI answers questions instantly using only your verified company data
✨ Zero guesswork or hallucinations—every answer is cited from source files
✨ Keeps your business data 100% private and secure

Boost your team's productivity and client response speed!

👉 Discover custom AI solutions for your business:
🌐 Visit: https://vybtek.com/services/ai-solutions
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #EnterpriseAI #AIAssistant #BusinessProductivity #WorkflowAutomation #TechSolutions`
  }
];

async function run() {
  console.log('=== Scheduling Extended Campaigns (Dec 2 & Dec 3) ===\n');
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
  console.log('Campaigns through December 3 successfully queued in Buffer!');
}

run().catch(console.error);
