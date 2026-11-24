const fetch = globalThis.fetch;
const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';

async function checkChannels() {
  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: 'list_channels',
      arguments: { organizationId: '6acddd7d94df59e6008804d8' }
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
  const channels = JSON.parse(data.result.content[0].text);
  for (const c of channels) {
    console.log(`Channel: ${c.name} | Service: ${c.service} | ID: ${c.id}`);
    console.log(`  isDisconnected: ${c.isDisconnected} | hasErrors: ${c.hasErrors} | paused: ${c.paused}`);
    if (c.error) {
      console.log(`  ERROR: ${JSON.stringify(c.error)}`);
    }
  }
}

checkChannels().catch(console.error);
