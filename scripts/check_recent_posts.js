const fetch = globalThis.fetch;
const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

async function checkRecentPosts() {
  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: 'list_posts',
      arguments: {
        organizationId: '6acddd7d94df59e6008804d8',
        first: 50,
        sort: [{ field: 'createdAt', direction: 'desc' }]
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
  const raw = JSON.parse(data.result.content[0].text);
  const edges = raw.edges || [];
  console.log(`Total posts returned: ${edges.length}`);
  edges.forEach((e, i) => {
    const p = e.node;
    console.log(`[${i+1}] ${p.channelService.toUpperCase()} | Status: ${p.status} | Due: ${p.dueAt || 'none'} | Sent: ${p.sentAt || 'none'}`);
    if (p.error) {
      console.log(`    Error: ${p.error.message || JSON.stringify(p.error)}`);
    }
    console.log(`    Snippet: ${p.text.slice(0, 80).replace(/\n/g, ' ')}`);
  });
}

checkRecentPosts().catch(console.error);
