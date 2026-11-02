const fetch = globalThis.fetch;
const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

async function callMcpTool(toolName, args) {
  const payload = {
    jsonrpc: '2.0',
    id: Date.now(),
    method: 'tools/call',
    params: { name: toolName, arguments: args }
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

// Redundant posts clashing with our curated high-contrast campaigns:
// Nov 2: 6ae7630ddbb50f7b82dfc0dc (LI - clashing with client portals)
// Nov 3: 6ae7630e93985ec108e0bad5 (LI), 6ae7630e8755094b829151be (FB)
// Nov 4: 6ae7630f36ecc99848144fd2 (FB), 6ae7630f36ecc99848144fa7 (LI)
// Nov 5: 6ae763118755094b82915286 (FB), 6ae76310354a6ae7df89cf47 (LI)
const redundant = [
  '6ae7630ddbb50f7b82dfc0dc',
  '6ae7630e93985ec108e0bad5',
  '6ae7630e8755094b829151be',
  '6ae7630f36ecc99848144fd2',
  '6ae7630f36ecc99848144fa7',
  '6ae763118755094b82915286',
  '6ae76310354a6ae7df89cf47'
];

async function clean() {
  console.log('Cleaning redundant batch entries to ensure zero post clashes...');
  for (const id of redundant) {
    try {
      await callMcpTool('delete_post', { postId: id });
      console.log('✓ Deleted redundant post:', id);
    } catch(e) {
      console.error('Error deleting:', id, e.message);
    }
  }
  console.log('Cleanup finished.');
}
clean();
