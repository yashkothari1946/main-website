const fetch = globalThis.fetch;

const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

const BASE_URL = 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/';

const CREATIVE_MAP = {
  omnichannel_boardroom: {
    url: BASE_URL + 'omnichannel_boardroom.png?v=2',
    altText: 'Omnichannel Marketing Strategy Boardroom - VybTek IT Solutions'
  },
  omnichannel_ads: {
    url: BASE_URL + 'omnichannel_ads.png?v=2',
    altText: 'Performance Ad Retargeting and Conversion Optimization - VybTek IT Solutions'
  },
  speed_to_lead: {
    url: BASE_URL + 'speed_to_lead.png?v=2',
    altText: '24/7 Lead Velocity and Inbound Response - VybTek IT Solutions'
  },
  geo_ai_search: {
    url: BASE_URL + 'geo_ai_search.png?v=2',
    altText: 'Generative Engine Optimization (GEO) AI Search Strategy - VybTek IT Solutions'
  },
  custom_software: {
    url: BASE_URL + 'custom_software.png?v=2',
    altText: 'Custom Software Architecture vs SaaS Subscription Sprawl - VybTek IT Solutions'
  },
  ai_workflow: {
    url: BASE_URL + 'ai_workflow.png?v=2',
    altText: 'AI Workflow Orchestration and Business Process Automation - VybTek IT Solutions'
  },
  microservices: {
    url: BASE_URL + 'microservices_devops.png?v=2',
    altText: 'Legacy Monolith Modernization to Microservices - VybTek IT Solutions'
  },
  enterprise_rag: {
    url: BASE_URL + 'enterprise_rag.png?v=2',
    altText: 'Private Enterprise RAG and AI Knowledge Base - VybTek IT Solutions'
  },
  whatsapp: {
    url: BASE_URL + 'whatsapp_sales.png?v=2',
    altText: 'WhatsApp Business API Conversational AI Sales - VybTek IT Solutions'
  },
  web_uiux: {
    url: BASE_URL + 'web_uiux_redesign.png?v=2',
    altText: 'Conversion-First UI/UX & Web Redesign - VybTek IT Solutions'
  },
  enterprise_portal: {
    url: BASE_URL + 'enterprise_web_portal.png?v=2',
    altText: 'Custom Enterprise Web Portals - VybTek IT Solutions'
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

  // 1. Client Portals
  if (lower.includes('client portals') || lower.includes('high-value clients through messy email') || lower.includes('invoice copies and project updates')) {
    return CREATIVE_MAP.enterprise_portal;
  }

  // 2. UI/UX Redesign
  if (lower.includes('3 seconds to make an impression') || lower.includes('turning visitors into clients') || lower.includes('$50,000 on google ads and linkedin campaigns')) {
    return CREATIVE_MAP.web_uiux;
  }

  // 3. Omnichannel Growth
  if (lower.includes('eggs in one basket') || lower.includes('single channel') || lower.includes('omnichannel nurturing')) {
    if (dueAt && dueAt.includes('2026-10-30')) {
      return CREATIVE_MAP.omnichannel_ads;
    }
    return CREATIVE_MAP.omnichannel_boardroom;
  }

  // 4. Custom Software vs SaaS Sprawl
  if (lower.includes('saas subscription sprawl') || lower.includes('recurring software subscriptions') || lower.includes('stop renting generic') || lower.includes('custom software is the ultimate')) {
    return CREATIVE_MAP.custom_software;
  }

  // 5. Speed to Lead
  if (lower.includes('speed to lead') || lower.includes('respond to new business') || lower.includes('harvard business review')) {
    return CREATIVE_MAP.speed_to_lead;
  }

  // 6. GEO & AEO AI Search
  if (lower.includes('gatekeeper of b2b') || lower.includes('generative engine optimization') || lower.includes('visible when customers search on chatgpt') || lower.includes('search has changed')) {
    return CREATIVE_MAP.geo_ai_search;
  }

  // 7. AI Workflow Orchestration
  if (lower.includes('robot work') || lower.includes('manual data entry') || lower.includes('40-step') || lower.includes('copy-paste bridges')) {
    return CREATIVE_MAP.ai_workflow;
  }

  // 8. Monolith to Microservices
  if (lower.includes('monolith') || lower.includes('technical debt') || lower.includes('one small bug')) {
    return CREATIVE_MAP.microservices;
  }

  // 9. Enterprise RAG & Knowledge Base
  if (lower.includes('knowledge worker') || lower.includes('lost company documents') || lower.includes('rag') || lower.includes('searching through messy google')) {
    return CREATIVE_MAP.enterprise_rag;
  }

  // 10. WhatsApp Business API
  if (lower.includes('close deals on whatsapp') || lower.includes('dying a slow death in b2b') || lower.includes('whatsapp boasts a staggering') || lower.includes('whatsapp has a 98% open rate') || lower.includes('unanswered email inboxes')) {
    return CREATIVE_MAP.whatsapp;
  }

  return CREATIVE_MAP.omnichannel_boardroom;
}

(async () => {
  console.log('Fetching active scheduled queue from Buffer...');
  const res = await callMcpTool('list_posts', {
    organizationId: '6acddd7d94df59e6008804d8',
    status: ['scheduled'],
    first: 50
  });

  const parsed = JSON.parse(res.content[0].text);
  const posts = parsed.edges.map(e => e.node);
  console.log(`Found ${posts.length} scheduled posts to update.\n`);

  let updatedCount = 0;

  for (const post of posts) {
    const matched = matchCreative(post.text, post.dueAt);
    console.log(`Updating Post [${post.id}] (${post.channelService} | Due: ${post.dueAt})`);
    console.log(`  Assigning: ${matched.url.split('/').pop()}`);

    const editArgs = {
      postId: post.id,
      channelId: post.channelId,
      text: post.text,
      schedulingType: 'automatic',
      mode: 'customScheduled',
      dueAt: post.dueAt,
      assets: [
        {
          image: {
            url: matched.url,
            metadata: {
              altText: matched.altText
            }
          }
        }
      ]
    };

    if (post.channelService === 'instagram') {
      editArgs.metadata = { instagram: { type: 'post', shouldShareToFeed: true } };
    } else if (post.channelService === 'facebook') {
      editArgs.metadata = { facebook: { type: 'post' } };
    }

    try {
      await callMcpTool('edit_post', editArgs);
      console.log(`  ✓ Updated successfully.`);
      updatedCount++;
    } catch (err) {
      console.error(`  ✗ Error updating post: ${err.message}`);
    }

    console.log('--------------------------------------------------');
  }

  console.log(`\nAll done! Successfully refreshed ${updatedCount} / ${posts.length} scheduled posts with new high-contrast creatives.`);
})();
