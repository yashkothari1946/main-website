const fetch = globalThis.fetch;

const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

const CONFIG = {
  channels: {
    linkedin: '6acdde02778b240e2ff4402c',
    facebook: '6acdde2d778b240e2ff44139',
    instagram: '6acdde4b778b240e2ff441f7'
  },
  creativeUrl: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/ai_business_automation_lab.png',
  scheduledTime: '2026-11-06T05:00:00.000Z' // 10:30 AM IST on Friday, Nov 6, 2026
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

const LINKEDIN_POST = `Why are smart companies still paying top talent to do robot work?

In 2026, operational drag isn't caused by a lack of effort. It's caused by broken data bridges between CRMs, ERPs, accounting software, and spreadsheets.

When your team spends 20+ hours a week copy-pasting numbers, chasing approvals, and manually emailing status updates:
❌ Human errors creep into invoices and client deliveries.
❌ Response time to high-value inquiries slows to a crawl.
❌ Scaling your customer base requires an expensive hiring spree.

At VybTek IT Solutions, we engineer Autonomous AI Business Workflows that eliminate repetitive backoffice tasks:

⚡ 1. Intelligent Process Automation:
Connect your CRM, ERP, and WhatsApp pipelines into unified self-executing workflows with 0-error machine precision.

🤖 2. Custom AI Operations Agents:
Deploy autonomous agents trained on your proprietary SOPs to handle data triage, document extraction, and routine customer queries 24/7.

📊 3. Real-Time Pipeline Intelligence:
Eliminate data lag so leadership has instant visibility into revenue metrics, order statuses, and team velocity without asking for status reports.

🚀 4. Frictionless Customer Onboarding:
Automate client contract handoffs, welcome sequences, and workspace provisioning in under 60 seconds.

---
🤝 Looking to streamline your business operations and cut administrative overhead?

Let's discuss how custom AI automation can transform your team's productivity this quarter.

👉 Send a direct message or connect with our engineering team:
🌐 Visit: https://vybtek.com/services/ai-solutions
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #AIAutomation #BusinessOperations #ProcessMining #WorkflowAutomation #EnterpriseTech #Productivity #TechLeadership #BusinessGrowth`;

const FACEBOOK_POST = `Is your team drowning in repetitive, manual paperwork and data entry? 🤖⚙️

When employees spend hours copy-pasting between spreadsheets, emails, and CRMs, mistakes happen and business growth slows down.

At VybTek IT Solutions, we help companies automate their daily operations with Custom AI Workflows:
✅ Connect your CRM, ERP, and WhatsApp pipelines seamlessly
✅ Eliminate 90% of manual data entry and backoffice bottlenecks
✅ Automate client onboarding, invoicing, and order tracking
✅ 24/7 AI-powered lead qualification and support
✅ Scale your operations without increasing administrative headcount

Work smarter, not harder. Let technology do the heavy lifting. 🚀

👉 Book a Free AI Operations Consultation:
🌐 https://vybtek.com/services/ai-solutions
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #BusinessAutomation #AIWorkflows #CustomSoftware #TechSolutions #OperationsEfficiency #BusinessScaling`;

const INSTAGRAM_POST = `Stop paying smart people to do robot work. ⚙️💡

In 2026, growing businesses don't scale by adding more spreadsheets. They build autonomous, connected AI workflows:

⚡ 90% faster task execution across operations
⚡ Zero manual data entry errors across billing & CRM
⚡ WhatsApp AI triage responding to leads in <10s
⚡ Automatic client onboarding and document processing
⚡ Scalable backoffice with zero extra administrative payroll

Ready to automate your operations and unlock your team's real potential? Connect with VybTek IT Solutions. 🤝

👉 Tap the link in our bio or get in touch directly:
🌐 https://vybtek.com
📞 Call / WhatsApp: +91 8000530501
📩 support@vybtek.com

#VybTekITSolutions #AIAutomation #WorkflowEfficiency #BusinessGrowth #TechAgency #CustomSoftware #OperationsManagement #InnovateAutomateTransform`;

(async () => {
  console.log(`Scheduling AI Business Automation campaign for ${CONFIG.scheduledTime} (Friday, Nov 6 at 10:30 AM IST)...`);

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
            metadata: { altText: 'AI Business Automation Engineered By VybTek IT Solutions' }
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
            metadata: { altText: 'AI Business Automation Engineered By VybTek IT Solutions' }
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
            metadata: { altText: 'AI Business Automation Engineered By VybTek IT Solutions' }
          }
        }
      ]
    });
    console.log(`✓ Instagram Post Scheduled: ${JSON.parse(igRes.content[0].text).id}`);
  } catch (err) {
    console.error('Instagram Error:', err.message);
  }

  console.log('\nAI Business Automation Campaign Scheduled successfully for Friday, Nov 6!');
})();
