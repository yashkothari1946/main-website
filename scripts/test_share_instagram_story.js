const fetch = globalThis.fetch;

const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

const CONFIG = {
  channelId: '6acdde4b778b240e2ff441f7', // Instagram vybtek_it
  creativeUrl: 'https://raw.githubusercontent.com/yashkothari1946/main-website/main/images/creatives/instagram_story_marketing.png'
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

async function testShareStory() {
  console.log('Testing shareNow for Instagram Story...');
  
  // Attempt with metadata.instagram.type = 'story'
  const args = {
    channelId: CONFIG.channelId,
    mode: 'shareNow',
    schedulingType: 'automatic',
    text: 'Scale Your Marketing With VybTek IT Solutions 🚀 DM us "GROWTH" or visit vybtek.com | Call: +91 8000530501',
    metadata: {
      instagram: {
        type: 'story',
        shouldShareToFeed: false,
        link: 'https://vybtek.com/services/digital-marketing'
      }
    },
    assets: [
      {
        image: {
          url: CONFIG.creativeUrl,
          metadata: {
            altText: 'Scale Your Marketing With VybTek IT Solutions - Instagram Story'
          }
        }
      }
    ]
  };

  try {
    const res = await callMcpTool('create_post', args);
    console.log('✓ Successfully created Story post:', res.content[0].text);
  } catch (err) {
    console.error('Error creating Story with automatic:', err.message);
    console.log('\nRetrying with schedulingType: "notification" (Buffer mobile notification reminder for Story)...');
    try {
      args.schedulingType = 'notification';
      const res2 = await callMcpTool('create_post', args);
      console.log('✓ Successfully created Story with notification reminder:', res2.content[0].text);
    } catch (err2) {
      console.error('Error with notification reminder:', err2.message);
    }
  }
}

testShareStory();
