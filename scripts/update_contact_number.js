const BUFFER_ENDPOINT = 'https://mcp.buffer.com/mcp';
const API_KEY = process.env.BUFFER_API_KEY || 'EXvKj9N-hO_FicegWEvENJ6I0gjMYBpwpJaxPklXOIS';
const ORG_ID = '6acddd7d94df59e6008804d8';
const NEW_PHONE = '+91 8000530501';

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

async function run() {
  console.log('Fetching all scheduled posts...');
  const res = await callMcpTool('list_posts', {
    organizationId: ORG_ID,
    statuses: ['scheduled'],
    pageSize: 50
  });

  const parsed = JSON.parse(res.content[0].text);
  const edges = parsed.edges || [];
  console.log(`Found ${edges.length} scheduled posts.`);

  let updatedCount = 0;

  for (const item of edges) {
    const post = item.node;
    let oldText = post.text;
    let newText = oldText;

    // Check if phone number patterns exist in the text
    const phoneRegexes = [
      /\+91[\s-]?900[\s-]?1200[\s-]?450/g,
      /900[\s-]?1200[\s-]?450/g,
      /\+91[\s-]?9602843161/g,
      /9602843161/g
    ];

    let hasExistingPhone = false;
    for (const r of phoneRegexes) {
      if (r.test(newText)) {
        hasExistingPhone = true;
        newText = newText.replace(r, NEW_PHONE);
      }
    }

    // If no existing phone number was found, check if it has a CTA section to append the phone number
    if (!hasExistingPhone) {
      if (newText.includes('📞')) {
        newText = newText.replace(/📞.*(\n|$)/, `📞 Call / WhatsApp: ${NEW_PHONE}$1`);
      } else if (newText.includes('👉')) {
        // Append before hashtags or at the end of CTA
        const parts = newText.split(/(\n#[a-zA-Z0-9_]+)/);
        if (parts.length > 1) {
          parts[0] = parts[0].trim() + `\n📞 Call / WhatsApp: ${NEW_PHONE}\n`;
          newText = parts.join('');
        } else {
          newText = newText + `\n\n📞 Call / WhatsApp: ${NEW_PHONE}`;
        }
      }
    }

    if (newText !== oldText) {
      console.log(`\nUpdating Post ID: ${post.id} (${post.channelService})`);
      console.log(`Channel ID: ${post.channelId}`);

      const editArgs = {
        postId: post.id,
        channelId: post.channelId,
        schedulingType: post.schedulingType || 'automatic',
        text: newText
      };

      if (post.dueAt) {
        editArgs.dueAt = post.dueAt;
        editArgs.mode = 'customScheduled';
      }

      if (post.channelService === 'facebook') {
        editArgs.metadata = { facebook: { type: 'post' } };
      }

      if (post.assets && post.assets.length > 0) {
        editArgs.assets = post.assets.map(a => {
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

      try {
        const editRes = await callMcpTool('edit_post', editArgs);
        console.log(`  ✓ Updated successfully!`);
        updatedCount++;
      } catch (err) {
        console.error(`  ✗ Error updating post ${post.id}:`, err.message);
      }
    } else {
      console.log(`Post ID: ${post.id} already up to date or unchanged.`);
    }
  }

  console.log(`\nFinished updating posts. Total updated: ${updatedCount}`);
}

run().catch(console.error);
