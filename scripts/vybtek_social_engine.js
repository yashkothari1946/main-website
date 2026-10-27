/**
 * VybTek Social Media Automation & Scheduling Engine
 * Powered by Buffer MCP / API
 * 
 * Channels:
 * - LinkedIn Page: VybTek IT Solution (6acdde02778b240e2ff4402c)
 * - Facebook Page: VybTek IT Solutions (6acdde2d778b240e2ff44139)
 * - Instagram: vybtek_it (6acdde4b778b240e2ff441f7)
 */

const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

const CONFIG = {
  orgId: '6acddd7d94df59e6008804d8',
  timezone: 'Asia/Kolkata',
  channels: {
    linkedin: '6acdde02778b240e2ff4402c',
    facebook: '6acdde2d778b240e2ff44139',
    instagram: '6acdde4b778b240e2ff441f7'
  },
  assets: {
    geoSearch: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/geo_ai_search.png',
    leadSpeed: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/speed_to_lead.png',
    customSoftware: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/custom_software.png',
    omnichannel: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/omnichannel_boardroom.png',
    aiWorkflow: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/ai_workflow.png',
    microservices: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/microservices_devops.png',
    enterpriseRAG: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/enterprise_rag.png',
    whatsapp: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/whatsapp_sales.png'
  }
};

// Research-backed high-engagement B2B content campaign templates
const CAMPAIGN_CONTENT = [
  {
    topic: 'GEO & AEO: The Future of Search Beyond Google',
    image: CONFIG.assets.geoSearch,
    altText: 'Generative Engine Optimization (GEO) and AI Search Strategy by VybTek',
    linkedinText: `Google is no longer the sole gatekeeper of B2B discovery.

Today, buyers ask Perplexity, ChatGPT, and Gemini: "What are the best IT consulting and software development partners for enterprise scaling?"

If your brand is only optimized for legacy SEO keywords, you are completely invisible to generative AI search engines.

Here is the 3-step Generative Engine Optimization (GEO) framework we deploy at VybTek:

1️⃣ Semantic Knowledge Graph Architecture: Structuring your digital assets so LLMs index your core competencies as facts, not marketing noise.
2️⃣ High-Authority Citations & Problem-Solving Blueprints: Crafting content that AI models cite as direct answers.
3️⃣ Technical Schema Alignment: Delivering clean machine-readable schemas that generative bots parse effortlessly.

Don't wait for your organic traffic to drop by 40% before taking action.

👉 Is your company ready for AI search? Visit https://vybtek.com/services/digital-marketing to book a comprehensive GEO & SEO audit.

#GEO #AEO #AISearch #B2BMarketing #SEOStrategy #VybTekITSolutions #TechLeadership #DigitalTransformation`,
    facebookText: `Is your business visible when customers search on ChatGPT, Gemini, or Perplexity? 🤖🔍

Search has changed. People don't just click 10 blue links anymore—they ask AI for recommendations. 

At VybTek IT Solutions, we optimize your brand for GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) so your business gets recommended when buyers search for tech and digital solutions.

🚀 Stay ahead of the curve.
🌐 Explore our digital marketing & search solutions: https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #AISearch #GEO #AEO #DigitalMarketing #BusinessGrowth #SEO`
  },
  {
    topic: 'Lead Velocity: Why 5-Minute Lead Response Multiplies Conversion',
    image: CONFIG.assets.leadSpeed,
    altText: 'AI Lead Automation and Pipeline Conversion by VybTek IT Solutions',
    linkedinText: `Speed to lead is the single most underrated competitive advantage in B2B sales.

Harvard Business Review research showed that companies responding to leads within 5 minutes are 21x more likely to enter the sales cycle compared to those waiting 30+ minutes.

Yet, the average B2B company takes 42 hours to respond to an inbound form.

By the time you email back:
❌ They've already spoken with your competitor.
❌ Their urgency has cooled down.
❌ Your cost-per-acquisition doubles.

At VybTek IT Solutions, we engineer 24/7 AI conversational workflows that:
⚡ Triage and qualify inbound inquiries within 10 seconds.
⚡ Answer technical and pricing inquiries based on your knowledge base.
⚡ Automatically schedule qualified discovery calls directly into your calendar.

Stop letting high-intent leads slip through the cracks.

👉 Comment "SPEED" or visit https://vybtek.com/services/digital-marketing to see how automated lead triage can accelerate your pipeline.

#LeadGeneration #SalesAutomation #B2BGrowth #AIWorkflows #VybTekITSolutions #CustomerExperience #TechInnovation`,
    facebookText: `How fast does your team respond to new business inquiries? ⏱️

If a potential client contacts you and waits hours for a reply, chances are they've already moved on to someone else.

With VybTek's AI-Powered Lead Automation:
✅ Inquiries are greeted within 10 seconds, 24/7.
✅ Leads are qualified automatically.
✅ Discovery meetings get booked directly on your calendar.

Turn more website and social visitors into paying clients!

👉 Speak with our team today:
🌐 Visit: https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #LeadAutomation #SalesGrowth #AIForBusiness #DigitalMarketing #ScaleYourBusiness`
  },
  {
    topic: 'Custom Software vs. SaaS Subscription Sprawl',
    image: CONFIG.assets.customSoftware,
    altText: 'Custom Enterprise Software and Web Applications by VybTek IT Solutions',
    linkedinText: `The hidden tax on modern businesses: "SaaS Subscription Sprawl."

Companies start with one CRM tool, then add an automation app, a project management suite, three browser extensions, and custom Zapier bridges.

Before long:
• You're paying \$3,000+/month in fragmented per-seat licenses.
• Data is siloed across 6 disparate databases.
• Custom business logic breaks whenever an API changes.

There comes an inflection point where off-the-shelf software stops accelerating your business and starts constraining it.

Custom software engineering from VybTek IT Solutions gives you:
🎯 Tailored workflows that match your exact operational edge.
🔒 Complete ownership of your proprietary data and IP.
📉 Zero per-user pricing penalties as your team scales.

Don't bend your business processes to fit generic software. Build the exact system your business needs to win.

👉 Let's discuss your software roadmap: https://vybtek.com/services/software-development

#SoftwareEngineering #CustomSoftware #EnterpriseTech #VybTekITSolutions #DigitalModernization #CloudSolutions #TechROI`,
    facebookText: `Tired of paying thousands in recurring software subscriptions that don't even fit your workflow? 💻

Generic tools can only take your business so far. When you're ready to scale without per-user licensing fees, custom software is the ultimate competitive advantage.

At VybTek IT Solutions, we engineer custom web applications, portals, and ERP/CRM systems designed specifically for your unique operations.

✨ Own your system.
✨ Automate your daily operations.
✨ Scale without limits.

👉 Get a free consultation on your software project:
🌐 Visit: https://vybtek.com/services/software-development
📞 Call / WhatsApp: +91 8000530501

#VybTekITSolutions #CustomSoftware #WebDevelopment #AppDevelopment #BusinessEfficiency #TechSolutions`
  },
  {
    topic: 'Omnichannel Nurturing: Why 1-Channel Marketing Leaks 70% Revenue',
    image: CONFIG.assets.omnichannel,
    altText: 'Omnichannel Marketing and Retention by VybTek IT Solutions',
    linkedinText: `If your marketing strategy relies entirely on a single channel, you are operating on borrowed time.

Algorithm changes on LinkedIn, ad policy shifts on Meta, or Google core updates can wipe out 50% of your inbound flow overnight.

Resilient businesses build an integrated Omnichannel Engine:
1. Top of Funnel: High-value organic content & precision performance ads.
2. Conversion Hub: Modern, high-speed website optimized for conversion rate (CRO).
3. Automated Retention: WhatsApp workflows + personalized email nurturing sequences that re-engage inactive prospects.

The result isn't just more leads—it's a compounding asset that builds brand equity every single month.

At VybTek IT Solutions, we align every layer of your digital presence into one cohesive growth engine.

👉 Claim a complimentary 360° Digital Growth Audit: https://vybtek.com/services/digital-marketing

#Omnichannel #DigitalMarketing #MarketingStrategy #BusinessResilience #VybTekITSolutions #GrowthEngine #B2B`,
    facebookText: `Don't put all your marketing eggs in one basket! 🧺

A true digital presence connects your website, social media, paid ads, and automated WhatsApp/Email follow-ups into one smooth experience.

When your brand stays consistently visible across every touchpoint, your conversion rate skyrockets. 🚀

Let VybTek IT Solutions build and manage your complete digital marketing ecosystem.

👉 Get started today:
🌐 Visit: https://vybtek.com/services/digital-marketing
📞 Call / WhatsApp: +91 8000530501
📩 Email: support@vybtek.com

#VybTekITSolutions #DigitalMarketing #OmnichannelMarketing #BrandBuilding #BusinessGrowth #UdaipurBusiness`
  }
];

// Helper: Make MCP Tool Call
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
  if (data.error) {
    throw new Error(JSON.stringify(data.error));
  }
  return data.result;
}

// Compute peak engagement timestamps in Asia/Kolkata (+05:30)
// Optimal B2B posting times:
// Slot 1: 10:30 AM IST (Morning focus)
// Slot 2: 05:30 PM IST (Evening catch-up)
function getNextPeakTime(dayOffset, isEveningSlot = false) {
  const now = new Date();
  const target = new Date(now.getTime() + dayOffset * 24 * 60 * 60 * 1000);
  
  // Set in UTC equivalent for IST (+05:30):
  // 10:30 AM IST = 05:00 UTC
  // 05:30 PM IST = 12:00 UTC
  const hours = isEveningSlot ? 12 : 5;
  const minutes = 0;
  
  target.setUTCHours(hours, minutes, 0, 0);

  // If already past today's slot, advance to next day
  if (target <= now) {
    target.setUTCDate(target.getUTCDate() + 1);
  }

  return target.toISOString();
}

// List Current Queue
async function listQueue() {
  console.log('Fetching active Buffer queue for VybTek...');
  const res = await callMcpTool('list_posts', {
    organizationId: CONFIG.orgId,
    statuses: ['scheduled', 'draft'],
    pageSize: 15
  });
  
  const textContent = res.content.find(c => c.type === 'text')?.text;
  if (!textContent) {
    console.log('No posts in queue.');
    return [];
  }
  
  const parsed = JSON.parse(textContent);
  const edges = parsed.edges || (Array.isArray(parsed) ? parsed : []);
  console.log(`Found ${edges.length} posts in queue:`);
  edges.forEach((p, idx) => {
    const node = p.node || p;
    console.log(`[${idx + 1}] ID: ${node.id} | Channel: ${node.channelService} | Due: ${node.dueAt} | Text: ${node.text.slice(0, 65)}...`);
  });
  return edges;
}

// Schedule Multi-Day Automated Content Campaign
async function scheduleCampaign() {
  console.log('=== Initiating Automated Multi-Day Campaign Scheduling ===\n');
  const results = [];

  for (let i = 0; i < CAMPAIGN_CONTENT.length; i++) {
    const item = CAMPAIGN_CONTENT[i];
    const dayOffset = i + 1; // Start from tomorrow
    const scheduledTime = getNextPeakTime(dayOffset, i % 2 === 1);

    console.log(`[Campaign Day ${dayOffset}] Scheduling: "${item.topic}"`);
    console.log(`Target Time: ${scheduledTime} (IST Peak Engagement Window)`);

    // 1. LinkedIn Post
    try {
      const liRes = await callMcpTool('create_post', {
        channelId: CONFIG.channels.linkedin,
        schedulingType: 'automatic',
        mode: 'customScheduled',
        dueAt: scheduledTime,
        text: item.linkedinText,
        assets: [
          {
            image: {
              url: item.image,
              metadata: { altText: item.altText }
            }
          }
        ]
      });
      console.log(`  ✓ LinkedIn Post Scheduled (ID: ${JSON.parse(liRes.content[0].text).id})`);
      results.push({ channel: 'linkedin', topic: item.topic, status: 'scheduled', time: scheduledTime });
    } catch (err) {
      console.error(`  ✗ Error scheduling LinkedIn: ${err.message}`);
    }

    // 2. Facebook Post
    try {
      const fbRes = await callMcpTool('create_post', {
        channelId: CONFIG.channels.facebook,
        schedulingType: 'automatic',
        mode: 'customScheduled',
        dueAt: scheduledTime,
        text: item.facebookText,
        metadata: { facebook: { type: 'post' } },
        assets: [
          {
            image: {
              url: item.image,
              metadata: { altText: item.altText }
            }
          }
        ]
      });
      console.log(`  ✓ Facebook Post Scheduled (ID: ${JSON.parse(fbRes.content[0].text).id})`);
      results.push({ channel: 'facebook', topic: item.topic, status: 'scheduled', time: scheduledTime });
    } catch (err) {
      console.error(`  ✗ Error scheduling Facebook: ${err.message}`);
    }

    console.log('--------------------------------------------------');
  }

  console.log(`\nCampaign Scheduling Complete. ${results.length} posts queued.`);
  return results;
}

// Publish a specific post immediately using get_post + edit_post with shareNow mode
async function publishNow(postId, channelId = CONFIG.channels.linkedin) {
  console.log(`Publishing post ${postId} immediately...`);
  const getRes = await callMcpTool('get_post', { postId });
  const postData = JSON.parse(getRes.content[0].text);
  
  const editArgs = {
    postId: postId,
    channelId: postData.channelId || channelId,
    mode: 'shareNow',
    schedulingType: 'automatic',
    text: postData.text
  };

  if (postData.assets && postData.assets.length > 0) {
    editArgs.assets = postData.assets.map(a => {
      if (a.type === 'image') {
        return {
          image: {
            url: a.source || a.thumbnail,
            metadata: { altText: a.image?.altText || 'VybTek IT Solutions' }
          }
        };
      }
      return a;
    });
  }

  const res = await callMcpTool('edit_post', editArgs);
  console.log('Publish result:', JSON.stringify(res));
  return res;
}

// CLI Routing
const action = process.argv[2] || '--schedule';
const targetArg = process.argv[3];

(async () => {
  try {
    if (action === '--status' || action === '--queue') {
      await listQueue();
    } else if (action === '--schedule') {
      await scheduleCampaign();
      await listQueue();
    } else if (action === '--publish-now' && targetArg) {
      await publishNow(targetArg);
    } else {
      console.log('Usage:');
      console.log('  node scripts/vybtek_social_engine.js --status');
      console.log('  node scripts/vybtek_social_engine.js --schedule');
      console.log('  node scripts/vybtek_social_engine.js --publish-now <postId>');
    }
  } catch (e) {
    console.error('Execution failed:', e);
    process.exit(1);
  }
})();
