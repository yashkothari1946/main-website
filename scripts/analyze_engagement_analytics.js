const fetch = globalThis.fetch;
const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

async function main() {
  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: 'list_posts',
      arguments: {
        organizationId: '6acddd7d94df59e6008804d8',
        status: ['sent'],
        includeMetrics: true,
        first: 40
      }
    }
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
  const edges = JSON.parse(data.result.content[0].text).edges;
  console.log(`Fetched ${edges.length} sent posts with metrics:\n`);
  
  const hourlyStats = {};

  edges.forEach(e => {
    const n = e.node;
    const sentTime = n.sentAt || n.dueAt;
    const date = new Date(sentTime);
    // Convert to IST (UTC+5.5)
    const istHours = (date.getUTCHours() + 5.5) % 24;
    const hourFloor = Math.floor(istHours);
    
    if (!hourlyStats[hourFloor]) hourlyStats[hourFloor] = { count: 0, channels: {}, reactions: 0, comments: 0 };
    hourlyStats[hourFloor].count++;
    hourlyStats[hourFloor].channels[n.channelService] = (hourlyStats[hourFloor].channels[n.channelService] || 0) + 1;
    
    if (n.metrics) {
      n.metrics.forEach(m => {
        if (m.type === 'reactions') hourlyStats[hourFloor].reactions += (m.value || 0);
        if (m.type === 'comments') hourlyStats[hourFloor].comments += (m.value || 0);
      });
    }

    console.log(`[${n.channelService.toUpperCase()}] IST Hour: ${hourFloor}:00 | Sent: ${sentTime} | Text: "${n.text.substring(0, 50).replace(/\n/g, ' ')}..."`);
  });

  console.log('\n--- Hourly Distribution (IST) ---');
  console.log(JSON.stringify(hourlyStats, null, 2));
}
main();
