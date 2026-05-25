import os

template = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>{title} | Vybtek IT Solutions</title>
  <meta name="description" content="{desc}">
  
  <link rel="icon" type="image/png" href="../../images/favicon.png" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link href="../../style.css" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.27/bundled/lenis.min.js"></script>
  
  <script defer src="../../headerFooter.js"></script>
</head>

<body class="bg-mesh overflow-x-hidden">
  <header><special-header></special-header></header>

  <main id="main-content">
    
    <section class="relative min-h-[75vh] flex items-center pt-28 pb-16">
      <div class="absolute inset-0 overflow-hidden -z-10">
        <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[140px] opacity-40 animate-pulse"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-100 rounded-full blur-[140px] opacity-35 animate-pulse [animation-delay:1.5s]"></div>
      </div>
      
      <div class="vt-container">
        <div class="max-w-4xl text-center mx-auto">
          <div class="vt-section-label !pl-0 !before:hidden reveal-up inline-block px-4 py-1.5 bg-indigo-50/50 rounded-full text-xs font-bold text-indigo-600">Advanced AI Engine</div>
          <h1 class="text-5xl md:text-7xl font-black text-[#0F172A] leading-[1.05] reveal-up mt-6">
            <span class="brand-gradient-text text-indigo-600">{heading}</span>
          </h1>
          <p class="text-xl md:text-2xl text-slate-600 mt-8 max-w-3xl mx-auto leading-relaxed reveal-up">
            {hero_sub}
          </p>
          <div class="flex gap-6 mt-10 justify-center reveal-up">
            <a href="../../contact.html" class="vt-btn-primary">Consult With Our Engineers</a>
          </div>
        </div>
      </div>
    </section>

    <section class="vt-section bg-slate-50 relative overflow-hidden border-t border-slate-100">
       <div class="vt-container relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
             <div class="p-10 bg-white border border-slate-100 rounded-3xl reveal-up hover:border-indigo-600/20 hover:bg-white/95 transition-all shadow-md">
                <div class="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-2xl mb-8"><i class="fas fa-microchip"></i></div>
                <h3 class="text-2xl font-bold mb-4 text-slate-800">Custom Architecture</h3>
                <p class="text-sm text-slate-500 leading-relaxed">Built from the ground up for your specific business logic, avoiding generic, unscalable templates.</p>
             </div>
             <div class="p-10 bg-white border border-slate-100 rounded-3xl reveal-up hover:border-indigo-600/20 hover:bg-white/95 transition-all shadow-md [animation-delay:0.1s]">
                <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-2xl mb-8"><i class="fas fa-lock"></i></div>
                <h3 class="text-2xl font-bold mb-4 text-slate-800">Enterprise Security</h3>
                <p class="text-sm text-slate-500 leading-relaxed">Data privacy is paramount. Our AI solutions deploy with strict access controls and GDPR compliance frameworks.</p>
             </div>
             <div class="p-10 bg-white border border-slate-100 rounded-3xl reveal-up hover:border-indigo-600/20 hover:bg-white/95 transition-all shadow-md [animation-delay:0.2s]">
                <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 text-2xl mb-8"><i class="fas fa-tachometer-alt"></i></div>
                <h3 class="text-2xl font-bold mb-4 text-slate-800">Seamless Integration</h3>
                <p class="text-sm text-slate-500 leading-relaxed">We natively plug our AI into your existing ERP, CRM, and digital platforms via robust REST/GraphQL APIs.</p>
             </div>
          </div>
       </div>
    </section>

    <section class="vt-section vt-cta">
      <div class="vt-container relative z-10">
        <h2 class="vt-cta-heading">Upgrade Your <br><span class="text-indigo-400">Capabilities</span></h2>
        <p class="vt-cta-sub">Leverage the true power of Artificial Intelligence to scale your business operations effortlessly.</p>
        <div class="flex justify-center gap-8">
          <a href="../../contact.html" class="vt-btn-primary !bg-white !text-[#002D62]">Begin Implementation</a>
        </div>
      </div>
    </section>

  </main>

  <footer><special-footer></special-footer></footer>
  <script src="../../animations.js"></script>
</body>
</html>"""

pages = [
    {
        "filename": "chatbot.html",
        "title": "Custom AI Chatbot Development",
        "desc": "Intelligent conversational agents that handle customer support, sales, and lead generation 24/7.",
        "heading": "Custom AI Chatbot Development",
        "hero_sub": "Deploy intelligent, context-aware conversational agents trained on your proprietary data to handle customer support, sales, and lead generation automatically, 24/7."
    },
    {
        "filename": "voicebot.html",
        "title": "Custom AI Voicebot Development",
        "desc": "Lifelike voice AI that handles inbound calls, outbound scheduling, and complex spoken queries instantly.",
        "heading": "Custom AI Voicebot Development",
        "hero_sub": "Replace traditional IVR menus with lifelike, conversational voice AI capable of handling complex inbound queries and proactive outbound scheduling with zero wait times."
    },
    {
        "filename": "automation.html",
        "title": "AI Automation",
        "desc": "Replace manual workflows with self-healing, automated AI pipelines that reduce overhead and errors.",
        "heading": "AI Automation",
        "hero_sub": "Streamline operations by replacing repetitive manual tasks with highly robust, self-healing AI workflows, drastically reducing overhead and eliminating human error."
    },
    {
        "filename": "agents.html",
        "title": "Custom AI Agent Development",
        "desc": "Autonomous agents capable of multi-step reasoning, executing code, and making complex decisions.",
        "heading": "Custom AI Agent Development",
        "hero_sub": "Engineer sophisticated, autonomous AI agents capable of multi-step reasoning, tool execution, and complex decision-making to operate entire business segments independently."
    },
    {
        "filename": "rag.html",
        "title": "RAG (Retrieval-Augmented Generation)",
        "desc": "RAG systems linking massive private databases to LLMs for perfectly accurate answers.",
        "heading": "RAG Systems Integration",
        "hero_sub": "Eliminate hallucinations by deeply linking massive proprietary enterprise databases and document stores directly to cutting-edge Large Language Models for perfect accuracy."
    },
    {
        "filename": "consulting.html",
        "title": "AI Consulting and Strategy",
        "desc": "Strategic advisory to help enterprise leaders identify high-ROI use cases for AI implementation.",
        "heading": "AI Consulting & Strategy",
        "hero_sub": "Partner with our elite engineers and data scientists to audit your current architecture, identify high-ROI AI use cases, and draft an airtight implementation roadmap."
    },
    {
        "filename": "llm-integration.html",
        "title": "LLM Integration",
        "desc": "Seamless API connections embedding models like GPT-4, Claude 3, and Gemini directly into your apps.",
        "heading": "LLM API Integration",
        "hero_sub": "Securely and seamlessly embed industry-leading foundational models (GPT-4, Claude 3, Gemini Pro, Llama) directly into your existing software infrastructure via robust APIs."
    }
]

out_dir = r"E:\Vybtek\development\VybTek\services\ai-dev"

for p in pages:
    content = template.format(**p)
    path = os.path.join(out_dir, p["filename"])
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {path}")

print("All AI dev pages generated successfully!")
