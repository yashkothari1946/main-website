const fetch = globalThis.fetch;
const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

const CONFIG = {
  channels: {
    linkedin: '6acdde02778b240e2ff4402c',
    facebook: '6acdde2d778b240e2ff44139'
  },
  creativeUrl: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/custom_software.png?v=2'
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

const LI_TEXT = `The hidden tax on modern businesses: "SaaS Subscription Sprawl."

Companies start with one CRM tool, then add separate apps for project management, email marketing, billing, customer support, and document management.

Before long, you're paying $3,000 to $10,000+ every month in per-seat licenses.
Worse? None of these platforms talk to each other seamlessly. Data is trapped in silos, and employees spend hours every week doing manual data transfers.

The alternative? Custom Enterprise Software.

At VybTek IT Solutions, we engineer unified, tailor-made digital platforms that:
✅ Eliminate recurring per-user license fees.
✅ Centralize your entire business operations into a single pane of glass.
✅ Give you 100% intellectual property ownership of your code and data.
✅ Scale infinitely with zero penalties as your team expands.

Stop renting your operational infrastructure. Build what you own.

👉 Curious what custom software ROI looks like for your business? Connect with our engineering leads:
🌐 Visit: https://vybtek.com/services/custom-software
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #CustomSoftware #EnterpriseTech #SoftwareDevelopment #OperationsEfficiency #TechROI #TechLeadership #BusinessGrowth`;

const FB_TEXT = `Tired of paying thousands in recurring software subscriptions that don't even fit your workflow? 💻❌

Most businesses end up paying for 6 to 10 different SaaS tools that don't talk to each other—creating data silos, billing headaches, and wasted employee hours.

With VybTek's Custom Software Solutions:
🔹 Pay once, own forever—no per-seat monthly license fees
🔹 Built around your exact business process
🔹 100% ownership of your data and intellectual property
🔹 Seamless integration across your sales, operations, and finance

Build software that adapts to your business, not the other way around. 🚀

👉 Explore custom software solutions for your business:
🌐 Visit: https://vybtek.com/services/custom-software
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #CustomSoftware #TechSolutions #BusinessModernization #SoftwareEngineering #BusinessGrowth`;

async function updateNov1() {
  console.log('Updating Nov 1 evening posts to Custom Software Modernization...');

  // Update LinkedIn [6ae17a50204613d2f1418d5e]
  try {
    await callMcpTool('edit_post', {
      postId: '6ae17a50204613d2f1418d5e',
      channelId: CONFIG.channels.linkedin,
      text: LI_TEXT,
      schedulingType: 'automatic',
      mode: 'customScheduled',
      dueAt: '2026-11-01T12:00:00.000Z',
      assets: [
        {
          image: {
            url: CONFIG.creativeUrl,
            metadata: { altText: 'Custom Software vs SaaS Subscription Sprawl - VybTek IT Solutions' }
          }
        }
      ]
    });
    console.log('✓ LinkedIn Nov 1 updated to Custom Software.');
  } catch (e) {
    console.error('LinkedIn error:', e.message);
  }

  // Update Facebook [6ae17a501b33b85d1be25060]
  try {
    await callMcpTool('edit_post', {
      postId: '6ae17a501b33b85d1be25060',
      channelId: CONFIG.channels.facebook,
      text: FB_TEXT,
      schedulingType: 'automatic',
      mode: 'customScheduled',
      dueAt: '2026-11-01T12:00:00.000Z',
      metadata: { facebook: { type: 'post' } },
      assets: [
        {
          image: {
            url: CONFIG.creativeUrl,
            metadata: { altText: 'Custom Software vs SaaS Subscription Sprawl - VybTek IT Solutions' }
          }
        }
      ]
    });
    console.log('✓ Facebook Nov 1 updated to Custom Software.');
  } catch (e) {
    console.error('Facebook error:', e.message);
  }
}

updateNov1();
