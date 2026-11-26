const fetch = globalThis.fetch;
const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

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
  if (data.error) throw new Error(JSON.stringify(data.error));
  return data.result;
}

const duplicates = [
  '6b066ca6608549ccf2633a5d',
  '6b066ca522dfb7833a7ff4bc',
  '6b066ca740e1d58d12fcf4ac',
  '6b066ca640e1d58d12fcf458',
  '6b066ca8b6204bca46c9dca6',
  '6b066ca822dfb7833a7ff50f'
];

async function run() {
  console.log('Purging 6 colliding duplicate batch posts...');
  for (const id of duplicates) {
    try {
      await callMcpTool('delete_post', { postId: id });
      console.log('✓ Deleted duplicate post:', id);
    } catch (e) {
      console.error('Error deleting:', id, e.message);
    }
  }
  console.log('Collision purge complete.');
}

run();
