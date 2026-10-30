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
        status: ['scheduled'],
        first: 50,
        sort: [{ field: 'dueAt', direction: 'asc' }]
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
  console.log(`TOTAL SCHEDULED POSTS: ${edges.length}\n`);
  edges.forEach((e, idx) => {
    const n = e.node;
    const date = new Date(n.dueAt);
    const istHours = (date.getUTCHours() + 5.5) % 24;
    console.log(`[${idx+1}] ID: ${n.id} | Due: ${n.dueAt} (IST: ${istHours}:00) | Channel: ${n.channelService}`);
    console.log(`     Snippet: ${n.text.substring(0, 70).replace(/\n/g, ' ')}...`);
    console.log('--------------------------------------------------');
  });
}
main();
