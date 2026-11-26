const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'vybtek_social_engine.js');
let content = fs.readFileSync(file, 'utf8');

const targetStart = '// Schedule Multi-Day Automated Content Campaign';
const targetEnd = '// Publish a specific post immediately';

const startIdx = content.indexOf(targetStart);
const endIdx = content.indexOf(targetEnd);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find target boundaries');
  process.exit(1);
}

const replacement = `// Schedule Multi-Day Automated Content Campaign
async function scheduleCampaign() {
  console.log('=== Initiating Automated Multi-Day Campaign Scheduling ===\\n');
  const existingPosts = await listQueue();
  const results = [];

  for (let i = 0; i < CAMPAIGN_CONTENT.length; i++) {
    const item = CAMPAIGN_CONTENT[i];
    const dayOffset = i + 1; // Start from tomorrow
    const scheduledTime = getNextPeakTime(dayOffset, i % 2 === 1);
    const targetDateStr = scheduledTime.slice(0, 10);

    console.log(\`[Campaign Day \${dayOffset}] Evaluating: "\${item.topic}"\`);
    console.log(\`Target Time: \${scheduledTime} (IST Peak Engagement Window)\`);

    const alreadyScheduledLI = existingPosts.some(p => 
      (p.channelId === CONFIG.channels.linkedin || p.channelService === 'linkedin') && 
      (p.dueAt?.startsWith(targetDateStr) || (p.text && p.text.slice(0, 40) === item.linkedinText.slice(0, 40)))
    );

    const alreadyScheduledFB = existingPosts.some(p => 
      (p.channelId === CONFIG.channels.facebook || p.channelService === 'facebook') && 
      (p.dueAt?.startsWith(targetDateStr) || (p.text && p.text.slice(0, 40) === item.facebookText.slice(0, 40)))
    );

    // 1. LinkedIn Post
    if (!alreadyScheduledLI) {
      try {
        const liRes = await callMcpTool('create_post', {
          channelId: CONFIG.channels.linkedin,
          schedulingType: 'automatic',
          mode: 'customScheduled',
          dueAt: scheduledTime,
          text: item.linkedinText,
          assets: [{ image: { url: item.image, metadata: { altText: item.altText } } }]
        });
        console.log(\`  ✓ LinkedIn Post Scheduled (ID: \${JSON.parse(liRes.content[0].text).id})\`);
        results.push({ channel: 'linkedin', topic: item.topic, status: 'scheduled', time: scheduledTime });
      } catch (err) {
        console.error(\`  ✗ Error scheduling LinkedIn: \${err.message}\`);
      }
    } else {
      console.log(\`  ↷ LinkedIn Post skipped (Already scheduled for \${targetDateStr})\`);
    }

    // 2. Facebook Post
    if (!alreadyScheduledFB) {
      try {
        const fbRes = await callMcpTool('create_post', {
          channelId: CONFIG.channels.facebook,
          schedulingType: 'automatic',
          mode: 'customScheduled',
          dueAt: scheduledTime,
          text: item.facebookText,
          metadata: { facebook: { type: 'post' } },
          assets: [{ image: { url: item.image, metadata: { altText: item.altText } } }]
        });
        console.log(\`  ✓ Facebook Post Scheduled (ID: \${JSON.parse(fbRes.content[0].text).id})\`);
        results.push({ channel: 'facebook', topic: item.topic, status: 'scheduled', time: scheduledTime });
      } catch (err) {
        console.error(\`  ✗ Error scheduling Facebook: \${err.message}\`);
      }
    } else {
      console.log(\`  ↷ Facebook Post skipped (Already scheduled for \${targetDateStr})\`);
    }

    console.log('--------------------------------------------------');
  }

  console.log(\`\\nCampaign Scheduling Complete. \${results.length} new posts queued.\`);
  return results;
}

`;

content = content.slice(0, startIdx) + replacement + content.slice(endIdx);
fs.writeFileSync(file, content, 'utf8');
console.log('Successfully patched vybtek_social_engine.js with deduplication logic!');
