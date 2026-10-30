const fetch = globalThis.fetch;
const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

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

// Stale duplicate post IDs identified in inspect_scheduled_queue.js
const DUPLICATE_IDS = [
  '6ae17a4da48463c22753adb8', // Duplicate Oct 30 FB (speed to lead)
  '6ae17a4d1aac2b225f7a9e65', // Duplicate Oct 30 LI (speed to lead)
  '6ae429272782e7f331d375c0', // Overwritten duplicate Oct 31 FB
  '6ae429262782e7f331d37590', // Overwritten duplicate Oct 31 LI
  '6ae17a4f204613d2f1418d11', // Overwritten duplicate Oct 31 FB
  '6ae17a4e204613d2f1418c99', // Overwritten duplicate Oct 31 LI
  '6ae429282782e7f331d37617', // Overwritten duplicate Nov 1 FB
  '6ae42927ba1ca51fd3f8322c', // Overwritten duplicate Nov 1 LI
  '6ae42929a83a7fb63c9685a0', // Overwritten duplicate Nov 2 FB
  '6ae42928ba1ca51fd3f83266'  // Overwritten duplicate Nov 2 LI
];

async function cleanup() {
  console.log(`Starting cleanup of ${DUPLICATE_IDS.length} redundant/duplicate posts...\n`);
  for (const id of DUPLICATE_IDS) {
    try {
      console.log(`Deleting duplicate post [${id}]...`);
      await callMcpTool('delete_post', { postId: id });
      console.log(`✓ Deleted [${id}]`);
    } catch (e) {
      console.error(`✗ Error deleting [${id}]:`, e.message);
    }
  }
  console.log('\nCleanup finished.');
}
cleanup();
