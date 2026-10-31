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

const redundant = [
  '6ae57b79406ab8a0189e4269',
  '6ae57b791891472093b5fa68',
  '6ae57b7ab84259308bbc62bd',
  '6ae57b7a1891472093b5fac7',
  '6ae57b7bb84259308bbc62f6',
  '6ae57b7b1891472093b5fb1e'
];

async function clean() {
  console.log('Cleaning redundant batch posts to ensure zero duplicate queue...');
  for (const id of redundant) {
    try {
      await callMcpTool('delete_post', { postId: id });
      console.log('✓ Deleted redundant post:', id);
    } catch(e) {
      console.error('Error deleting:', id, e.message);
    }
  }
}
clean();
