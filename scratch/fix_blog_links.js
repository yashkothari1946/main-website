const fs = require('fs');
const path = 'blog.html';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/<a href="#" class="glass-card !bg-white/g, '<a href="blog-detail.html?s=${blog.slug}" class="glass-card !bg-white');
fs.writeFileSync(path, content);
console.log("Updated blog.html");
