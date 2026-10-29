const fetch = globalThis.fetch;

const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

const BASE_URL = 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/';

const CREATIVE_MAP = {
  omnichannel_boardroom: {
    url: BASE_URL + 'omnichannel_boardroom.png',
    altText: 'Omnichannel Marketing Strategy Boardroom - VybTek IT Solutions'
  },
  omnichannel_ads: {
    url: BASE_URL + 'omnichannel_ads.png',
    altText: 'Performance Ad Retargeting and Conversion Optimization - VybTek IT Solutions'
  },
  speed_to_lead: {
    url: BASE_URL + 'speed_to_lead.png',
    altText: '24/7 Lead Velocity and Inbound Response - VybTek IT Solutions'
  },
  geo_ai_search: {
    url: BASE_URL + 'geo_ai_search.png',
    altText: 'Generative Engine Optimization (GEO) AI Search Strategy - VybTek IT Solutions'
  },
  custom_software: {
    url: BASE_URL + 'custom_software.png',
    altText: 'Custom Software Architecture vs SaaS Subscription Sprawl - VybTek IT Solutions'
  },
  ai_workflow: {
    url: BASE_URL + 'ai_workflow.png',
    altText: 'AI Workflow Orchestration and Business Process Automation - VybTek IT Solutions'
  },
  microservices: {
    url: BASE_URL + 'microservices_devops.png',
    altText: 'Legacy Monolith Modernization to Microservices - VybTek IT Solutions'
  },
  enterprise_rag: {
    url: BASE_URL + 'enterprise_rag.png',
    altText: 'Private Enterprise RAG and AI Knowledge Base - VybTek IT Solutions'
  },
  whatsapp: {
    url: BASE_URL + 'whatsapp_sales.png',
    altText: 'WhatsApp Business API Conversational AI Sales - VybTek IT Solutions'
  }
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

function matchCreative(text, dueAt) {
  const lower = text.toLowerCase();

  // 1. Omnichannel Growth
  if (lower.includes('eggs in one basket') || lower.includes('single channel') || lower.includes('omnichannel nurturing')) {
    if (dueAt && dueAt.includes('2026-10-30')) {
      return CREATIVE_MAP.omnichannel_ads;
    }
    return CREATIVE_MAP.omnichannel_boardroom;
  }

  // 2. Custom Software vs SaaS Sprawl
  if (lower.includes('saas subscription sprawl') || lower.includes('recurring software subscriptions') || lower.includes('stop renting generic') || lower.includes('custom software is the ultimate')) {
    return CREATIVE_MAP.custom_software;
  }

  // 3. Speed to Lead
  if (lower.includes('speed to lead') || lower.includes('respond to new business') || lower.includes('harvard business review')) {
    return CREATIVE_MAP.speed_to_lead;
  }

  // 4. GEO & AEO AI Search
  if (lower.includes('gatekeeper of b2b') || lower.includes('generative engine optimization') || lower.includes('visible when customers search on chatgpt') || lower.includes('search has changed')) {
    return CREATIVE_MAP.geo_ai_search;
  }

  // 5. AI Workflow Orchestration
  if (lower.includes('robot work') || lower.includes('manual data entry') || lower.includes('40-step') || lower.includes('copy-paste bridges')) {
    return CREATIVE_MAP.ai_workflow;
  }

  // 6. Monolith to Microservices
  if (lower.includes('monolith') || lower.includes('technical debt') || lower.includes('one small bug')) {
    return CREATIVE_MAP.microservices;
  }

  // 7. Enterprise RAG & Knowledge Base
  if (lower.includes('knowledge worker') || lower.includes('lost company documents') || lower.includes('rag') || lower.includes('searching through messy google')) {
    return CREATIVE_MAP.enterprise_rag;
  }

  // 8. WhatsApp Business API (Specifically about closing on WhatsApp / WhatsApp open rates)
  if (lower.includes('close deals on whatsapp') || lower.includes('dying a slow death in b2b') || lower.includes('whatsapp boasts a staggering') || lower.includes('whatsapp has a 98% open rate') || lower.includes('unanswered email inboxes')) {
    return CREATIVE_MAP.whatsapp;
  }

  // Fallback
  return CREATIVE_MAP.omnichannel_boardroom;
}

async function run() {
  console.log('=== Precise Matching: Updating All Scheduled Buffer Posts with Unique Humanized Creatives ===\n');

  const listRes = await callMcpTool('list_posts', {
    organizationId: '6acddd7d94df59e6008804d8',
    statuses: ['scheduled'],
    pageSize: 30
  });

  const parsed = JSON.parse(listRes.content[0].text);
  const edges = parsed.edges || parsed;
  console.log(`Found ${edges.length} scheduled posts in Buffer.`);

  let updatedCount = 0;

  for (let i = 0; i < edges.length; i++) {
    const post = edges[i].node || edges[i];
    const targetCreative = matchCreative(post.text, post.dueAt);
    const creativeName = targetCreative.url.split('/').pop();

    console.log(`[${i + 1}/${edges.length}] Post ID: ${post.id} (${post.channelService})`);
    console.log(`   DueAt: ${post.dueAt}`);
    console.log(`   Topic Match: ${creativeName}`);

    const editArgs = {
      postId: post.id,
      text: post.text,
      assets: [
        {
          image: {
            url: targetCreative.url,
            metadata: {
              altText: targetCreative.altText
            }
          }
        }
      ]
    };

    if (post.channelService === 'facebook') {
      editArgs.metadata = { facebook: { type: 'post' } };
    } else if (post.channelService === 'instagram') {
      editArgs.metadata = { instagram: { type: 'post', shouldShareToFeed: true } };
    }

    try {
      await callMcpTool('edit_post', editArgs);
      console.log(`   ✓ Successfully updated post ${post.id} -> ${creativeName}`);
      updatedCount++;
    } catch (err) {
      console.error(`   ✗ Error updating post ${post.id}:`, err.message);
    }

    console.log('--------------------------------------------------');
  }

  console.log(`\nAll done! Successfully updated ${updatedCount}/${edges.length} scheduled posts with exact topic-matched humanized creatives.`);
}

run().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
