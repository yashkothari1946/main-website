const fs = require('fs');
const path = require('path');

const blogsPath = path.join(__dirname, 'blogs.json');
const blogHtmlPath = path.join(__dirname, 'blog.html');
const blogDetailTemplatePath = path.join(__dirname, 'blog-detail.html');

// 1. Read JSON Database
let rawBlogs = [];
try {
  rawBlogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
} catch (e) {
  console.error("Failed to read blogs.json:", e);
  process.exit(1);
}

const now = new Date();

// 2. Filter & Sort by Publish Date (Scheduling Logic)
const activeBlogs = rawBlogs
  .filter(b => new Date(b.publish_date) <= now)
  .sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));

if (activeBlogs.length === 0) {
    console.log("No active blogs found to generate.");
    process.exit(0);
}

// 3. GENERATE blog.html (Index Grid)
let blogHtmlContent = fs.readFileSync(blogHtmlPath, 'utf8');

const featuredBlog = activeBlogs[0];
const gridBlogs = activeBlogs.slice(1);

// Unique & Advanced UI for Featured
const featuredHtml = `
<div class="relative group rounded-[40px] p-[1px] overflow-hidden mb-16 reveal-up">
   <!-- Animated Border -->
   <div class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
   
   <div class="glass-card rounded-[40px] overflow-hidden bg-white relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2">
         <div class="aspect-video md:aspect-auto bg-slate-900 relative overflow-hidden group/img">
            <div class="absolute inset-0 bg-gradient-to-tr from-[#002D62] to-[#007CC3] opacity-80 mix-blend-multiply z-10"></div>
            <img src="${featuredBlog.image}" alt="${featuredBlog.title}" class="w-full h-full object-cover opacity-60 group-hover/img:scale-110 transition-transform duration-700" />
            <i class="fas fa-brain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl text-white opacity-10 pointer-events-none z-20"></i>
            <div class="absolute top-6 left-6 z-20">
               <span class="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-black/20">Featured Insight</span>
            </div>
         </div>
         <div class="p-12 md:p-16 flex flex-col justify-center relative bg-white">
            <!-- decorative mesh -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(0,124,195,0.05),transparent_70%)] pointer-events-none"></div>
            
            <div class="text-[10px] font-black uppercase tracking-widest text-[#007CC3] mb-4 flex items-center gap-2"><i class="fas fa-folder-open"></i> ${featuredBlog.category}</div>
            <h2 class="text-3xl md:text-5xl font-black text-[#002D62] mb-6 leading-[1.1] group-hover:text-[#007CC3] transition-colors">${featuredBlog.title}</h2>
            <p class="text-slate-500 leading-relaxed mb-8 text-base md:text-lg">${featuredBlog.excerpt}</p>
            
            <div class="mt-auto flex items-center justify-between border-t border-slate-100 pt-8">
               <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-[#002D62] text-sm">${featuredBlog.author_name.charAt(0)}</div>
                  <div>
                     <div class="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Author</div>
                     <div class="text-xs font-black text-slate-700">${featuredBlog.author_name}</div>
                  </div>
               </div>
               <a href="blog-${featuredBlog.slug}.html" class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#002D62] text-white hover:bg-[#007CC3] transition-colors group/btn shadow-lg shadow-blue-900/20">
                  <i class="fas fa-arrow-right transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"></i>
               </a>
            </div>
         </div>
      </div>
   </div>
</div>
`;

// Advanced UI for Grid
const gridHtml = gridBlogs.map((blog, idx) => `
<div class="relative group rounded-[32px] p-[1px] overflow-hidden reveal-up" style="animation-delay: ${idx * 0.1}s">
  <div class="absolute inset-0 bg-gradient-to-br from-transparent via-slate-200 to-transparent group-hover:via-blue-400 transition-colors duration-500"></div>
  
  <a href="blog-${blog.slug}.html" class="glass-card rounded-[32px] overflow-hidden bg-white flex flex-col justify-between min-h-[420px] relative z-10 h-full hover:shadow-[0_20px_40px_rgba(0,124,195,0.1)] transition-all">
     <div class="aspect-video flex items-center justify-center relative overflow-hidden bg-slate-100">
        <img src="${blog.image}" alt="${blog.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
           <span class="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[9px] font-black text-white uppercase tracking-widest">${blog.category}</span>
        </div>
     </div>
     <div class="p-8 flex-1 flex flex-col justify-between">
        <div>
           <div class="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3"><i class="far fa-calendar-alt mr-1"></i> ${new Date(blog.publish_date).toLocaleDateString()}</div>
           <h3 class="text-xl font-black text-[#002D62] mb-4 group-hover:text-[#007CC3] transition-colors line-clamp-2">${blog.title}</h3>
           <p class="text-xs text-slate-500 line-clamp-3 leading-relaxed font-medium">${blog.excerpt}</p>
        </div>
        <div class="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-black text-[#002D62] group-hover:text-[#007CC3] transition-colors uppercase tracking-widest">
           <span>Read Article</span>
           <i class="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
        </div>
     </div>
  </a>
</div>
`).join('');

const fullGridHtml = `
<!-- BLOG_GRID_START -->
${featuredHtml}
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
${gridHtml}
</div>
<!-- BLOG_GRID_END -->
`;

blogHtmlContent = blogHtmlContent.replace(/<!-- BLOG_GRID_START -->[\s\S]*<!-- BLOG_GRID_END -->/, fullGridHtml);

// Inject Schema for index page
const schemaData = activeBlogs.map(blog => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": blog.title,
  "image": [blog.image || "images/favicon.png"],
  "datePublished": blog.publish_date,
  "author": [{
    "@type": "Person",
    "name": blog.author_name
  }]
}));
const schemaScript = `\n<script type="application/ld+json">\n${JSON.stringify(schemaData, null, 2)}\n</script>\n</head>`;
// Make sure we don't duplicate schemas if run multiple times
blogHtmlContent = blogHtmlContent.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n<\/head>/, '</head>');
blogHtmlContent = blogHtmlContent.replace('</head>', schemaScript);

fs.writeFileSync(blogHtmlPath, blogHtmlContent);
console.log("✅ Updated blog.html with SEO JSON-LD and static grid.");

// 4. GENERATE INDIVIDUAL BLOG PAGES (SEO Friendly static HTML)
let detailTemplate = '';
try {
  detailTemplate = fs.readFileSync(blogDetailTemplatePath, 'utf8');
} catch(e) {
  console.error("Failed to read blog-detail.html template:", e);
  process.exit(1);
}

for (const blog of activeBlogs) {
  let pageContent = detailTemplate;
  
  // Replace Title & Meta
  pageContent = pageContent.replace(/<title>.*?<\/title>/, `<title>${blog.title} | VybTek Insights</title>`);
  
  // Basic Schema Injection
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": [blog.image],
    "datePublished": blog.publish_date,
    "description": blog.excerpt,
    "author": [{
      "@type": "Person",
      "name": blog.author_name
    }]
  };
  
  const articleSchemaScript = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>\n</head>`;
  pageContent = pageContent.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n<\/head>/, '</head>'); // clear old if exists
  pageContent = pageContent.replace('</head>', articleSchemaScript);

  // Advanced Cinematic UI for Article Page
  const articleHtml = `
    <!-- BLOG_CONTENT_START -->
    <article class="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden reveal-up relative">
      
      <!-- Cinematic Hero -->
      <div class="relative h-[500px] w-full bg-slate-900 overflow-hidden">
        <img src="${blog.image}" class="w-full h-full object-cover opacity-60 scale-105" alt="${blog.title}" style="transform-origin: center; animation: subtleZoom 20s infinite alternate;">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#002D62]/40 to-[#0A0F1C]"></div>
        
        <div class="absolute bottom-0 left-0 w-full p-12 md:p-16 text-white z-10 flex flex-col justify-end">
           <a href="blog.html" class="text-white/60 hover:text-white mb-6 inline-flex items-center text-[10px] uppercase font-black tracking-widest transition-colors"><i class="fas fa-arrow-left mr-2"></i> Back to Insights Hub</a>
           
           <div class="flex items-center gap-3 mb-6">
              <span class="px-4 py-1.5 rounded-full bg-[#007CC3] text-white text-[10px] font-black uppercase tracking-widest shadow-lg">${blog.category}</span>
              <span class="text-white/50 text-[10px] font-bold uppercase tracking-widest"><i class="far fa-calendar-alt mr-1"></i> ${new Date(blog.publish_date).toLocaleDateString()}</span>
           </div>
           
           <h1 class="text-4xl md:text-6xl font-black leading-[1.1] max-w-4xl tracking-tight text-white mb-8" style="text-shadow: 0 10px 30px rgba(0,0,0,0.5);">${blog.title}</h1>
           
           <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#002D62] text-lg font-black shadow-lg">
                ${blog.author_name.charAt(0)}
              </div>
              <div>
                <p class="text-[9px] font-black text-white/50 uppercase tracking-widest mb-0.5">Author</p>
                <p class="font-bold text-white text-sm">${blog.author_name}</p>
              </div>
           </div>
        </div>
      </div>
      
      <!-- Content Area with Sticky Share Sidebar -->
      <div class="p-8 md:p-16 lg:p-24 grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
         
         <!-- Sticky Share -->
         <div class="hidden lg:block lg:col-span-2">
            <div class="sticky top-40 flex flex-col items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100">
               <span class="text-[9px] font-black uppercase tracking-widest text-slate-400 text-center">Share<br>Article</span>
               <div class="w-8 h-[1px] bg-slate-200"></div>
               <a href="#" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#007CC3] hover:border-[#007CC3] transition-all hover:scale-110 shadow-sm"><i class="fab fa-linkedin-in"></i></a>
               <a href="#" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-400 transition-all hover:scale-110 shadow-sm"><i class="fab fa-twitter"></i></a>
               <a href="#" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all hover:scale-110 shadow-sm"><i class="fas fa-link"></i></a>
            </div>
         </div>
         
         <!-- Main Content Body -->
         <div class="lg:col-span-10 prose prose-lg prose-slate max-w-4xl">
            <style>
               .prose p { margin-bottom: 2rem; color: #475569; }
               .prose h2 { color: #0F172A; font-weight: 900; font-size: 1.8rem; margin-top: 3rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;}
               .prose h2::before { content: ""; display: block; width: 0.5rem; height: 1.5rem; background-color: #007CC3; border-radius: 999px; }
               .prose strong { color: #0F172A; font-weight: 800; }
            </style>
            ${blog.content_html}
         </div>
         
      </div>
      
    </article>
    <!-- BLOG_CONTENT_END -->
  `;
  
  pageContent = pageContent.replace(/<!-- BLOG_CONTENT_START -->[\s\S]*<!-- BLOG_CONTENT_END -->/, articleHtml);
  
  // Ensure the JS fetch block is removed from the static template
  pageContent = pageContent.replace(/<script>[\s\S]*?document\.addEventListener\("DOMContentLoaded", async \(\) => \{[\s\S]*?<\/script>/, '');

  fs.writeFileSync(path.join(__dirname, `blog-${blog.slug}.html`), pageContent);
  console.log(`✅ Generated blog-${blog.slug}.html`);
}

console.log("🎉 Static Blog Generation Complete! All UI is advanced and SEO natively implemented.");
