class SpecialHeader extends HTMLElement {
  connectedCallback() {
    // Determine relative path to root
    const path = window.location.pathname;
    const isInsideSubdir = path.includes('/services/') || path.includes('/products/') || path.includes('/legal/');
    const rel = isInsideSubdir ? '../' : './';

    this.innerHTML = `
    <header class="fixed top-0 left-0 w-full z-[100] backdrop-blur-md border-b border-gray-100 bg-white/80 transition-all duration-300 header-main">
      <div class="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <!-- Logo -->
        <a href="${rel}index.html" class="flex items-center group">
          <img src="${rel}images/logo.png" alt="VybTek Logo" class="h-10 md:h-14 w-auto object-contain" />
        </a>

        <!-- Mobile Menu Toggle -->
        <button id="menu-toggle" class="md:hidden text-[#007CC3] text-2xl focus:outline-none">
          <i class="fas fa-bars"></i>
        </button>

        <!-- Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <ul class="flex gap-6 items-center text-[11px] font-bold uppercase tracking-widest text-[#475569] nav-list">
            <li><a href="${rel}index.html" class="nav-link hover:text-[#007CC3] transition-colors">Home</a></li>
            <li><a href="${rel}about.html" class="nav-link hover:text-[#007CC3] transition-colors">About</a></li>
            
            <!-- Services Dropdown -->
            <li class="relative group">
              <a href="${rel}services.html" class="flex items-center gap-1 hover:text-[#007CC3] transition-colors uppercase cursor-pointer nav-link">Services <i class="fas fa-chevron-down text-[10px]"></i></a>
              <div class="absolute left-0 top-[calc(100%+10px)] w-64 bg-white border border-gray-100 shadow-2xl rounded-xl p-5 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200 before:content-[''] before:absolute before:-top-[15px] before:left-0 before:w-full before:h-[20px]">
                <div class="grid grid-cols-1 gap-4">
                  <a href="${rel}services.html" class="flex items-center gap-3 p-2 rounded-lg bg-blue-50 text-[#007CC3] hover:bg-[#007CC3] hover:text-white transition-all">
                    <div class="w-8 h-8 rounded flex items-center justify-center"><i class="fas fa-th-large text-xs"></i></div>
                    <div class="text-[10px] font-black uppercase">View All Services</div>
                  </a>
                  <div class="h-[1px] bg-gray-100 my-1"></div>
                  <a href="${rel}services/ai-solutions.html" class="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <div class="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-[#007CC3] group-hover/item:bg-[#007CC3] group-hover/item:text-white transition-all"><i class="fas fa-brain text-xs"></i></div>
                    <div>
                      <div class="text-[10px] font-black text-[#002D62]">AI Solutions</div>
                      <div class="text-[9px] text-gray-400 normal-case font-medium">Custom AI & LLMs</div>
                    </div>
                  </a>
                  <a href="${rel}services/erp-crm.html" class="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <div class="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-[#007CC3] group-hover/item:bg-[#007CC3] group-hover/item:text-white transition-all"><i class="fas fa-database text-xs"></i></div>
                    <div>
                      <div class="text-[10px] font-black text-[#002D62]">ERP & CRM</div>
                      <div class="text-[9px] text-gray-400 normal-case font-medium">Enterprise Management</div>
                    </div>
                  </a>
                  <a href="${rel}services/web-app.html" class="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <div class="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-[#007CC3] group-hover/item:bg-[#007CC3] group-hover/item:text-white transition-all"><i class="fas fa-code text-xs"></i></div>
                    <div>
                      <div class="text-[10px] font-black text-[#002D62]">Web & Apps</div>
                      <div class="text-[9px] text-gray-400 normal-case font-medium">Next.js & Mobile</div>
                    </div>
                  </a>
                  <a href="${rel}services/branding.html" class="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <div class="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-[#007CC3] group-hover/item:bg-[#007CC3] group-hover/item:text-white transition-all"><i class="fas fa-bullhorn text-xs"></i></div>
                    <div>
                      <div class="text-[10px] font-black text-[#002D62]">SEO & Branding</div>
                      <div class="text-[9px] text-gray-400 normal-case font-medium">Market Domination</div>
                    </div>
                  </a>
                </div>
              </div>
            </li>

            <!-- Products Dropdown -->
            <li class="relative group">
              <a href="${rel}products.html" class="flex items-center gap-1 hover:text-[#007CC3] transition-colors uppercase cursor-pointer nav-link">Products <i class="fas fa-chevron-down text-[10px]"></i></a>
              <div class="absolute left-0 top-[calc(100%+10px)] w-80 bg-white border border-gray-100 shadow-2xl rounded-xl p-5 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200 before:content-[''] before:absolute before:-top-[15px] before:left-0 before:w-full before:h-[20px]">
                <div class="grid grid-cols-1 gap-3">
                  <a href="${rel}products.html" class="flex items-center gap-3 p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                    <div class="w-8 h-8 rounded flex items-center justify-center"><i class="fas fa-layer-group text-xs"></i></div>
                    <div class="text-[10px] font-black uppercase">View All Products</div>
                  </a>
                  <div class="h-[1px] bg-gray-100 my-1"></div>
                  <a href="${rel}products/crm.html" class="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <div class="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all"><i class="fas fa-users-gear text-xs"></i></div>
                    <div>
                      <div class="text-[10px] font-black text-[#002D62]">Enterprise CRM</div>
                      <div class="text-[9px] text-gray-400 normal-case font-medium">VybCore Revenue Engine</div>
                    </div>
                  </a>
                  <a href="${rel}products/ai-chatbot.html" class="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <div class="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-[#007CC3] group-hover/item:bg-[#007CC3] group-hover/item:text-white transition-all"><i class="fas fa-comment-dots text-xs"></i></div>
                    <div>
                      <div class="text-[10px] font-black text-[#002D62]">AI Chatbot</div>
                      <div class="text-[9px] text-gray-400 normal-case font-medium">VybChat Orchestration</div>
                    </div>
                  </a>
                  <div class="h-[1px] bg-gray-100 my-1"></div>
                  <a href="${rel}products.html#catalog" class="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <div class="w-8 h-8 rounded bg-orange-50 flex items-center justify-center text-orange-600"><i class="fas fa-building text-xs"></i></div>
                    <div class="text-[10px] font-black text-[#002D62]">Property Management</div>
                  </a>
                  <a href="${rel}products.html#catalog" class="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <div class="w-8 h-8 rounded bg-green-50 flex items-center justify-center text-green-600"><i class="fas fa-graduation-cap text-xs"></i></div>
                    <div class="text-[10px] font-black text-[#002D62]">Education CRM</div>
                  </a>
                  <a href="${rel}products.html#catalog" class="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <div class="w-8 h-8 rounded bg-purple-50 flex items-center justify-center text-purple-600"><i class="fas fa-share-nodes text-xs"></i></div>
                    <div class="text-[10px] font-black text-[#002D62]">Social Platform</div>
                  </a>
                  <a href="${rel}products.html#catalog" class="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <div class="w-8 h-8 rounded bg-cyan-50 flex items-center justify-center text-cyan-600"><i class="fas fa-microphone-lines text-xs"></i></div>
                    <div class="text-[10px] font-black text-[#002D62]">Voice AI</div>
                  </a>
                </div>
              </div>
            </li>

            <li><a href="${rel}portfolio.html" class="nav-link hover:text-[#007CC3] transition-colors">Portfolio</a></li>
            <li><a href="${rel}industries.html" class="nav-link hover:text-[#007CC3] transition-colors">Industries</a></li>
            <li><a href="${rel}blog.html" class="nav-link hover:text-[#007CC3] transition-colors">Insights</a></li>
            <li><a href="${rel}careers.html" class="nav-link hover:text-[#007CC3] transition-colors">Careers</a></li>
            <li><a href="${rel}contact.html" class="nav-link hover:text-[#007CC3] transition-colors">Contact</a></li>
            
            <li><a href="${rel}contact.html#consultation" class="bg-[#007CC3] text-white px-5 py-2.5 rounded-none font-black text-[10px] uppercase tracking-tighter hover:bg-[#002D62] transition-all shadow-lg hover:scale-105 active:scale-95">Book Consultation</a></li>
          </ul>
        </div>
      </div>

      <!-- Mobile Menu (Glass UI) -->
      <div id="mobile-menu-overlay" class="fixed inset-0 bg-black/50 z-[190] opacity-0 pointer-events-none transition-opacity duration-300 backdrop-blur-sm"></div>
      <div id="mobile-menu" class="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white/80 backdrop-blur-xl border-l border-white/20 shadow-2xl z-[200] transform translate-x-full transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col">
        <div class="flex items-center justify-between p-6 border-b border-gray-100/50">
           <span class="text-xl font-extrabold tracking-tight text-[#002D62] uppercase">Menu</span>
           <button id="menu-close" class="text-2xl text-gray-500 hover:text-[#007CC3] transition-colors"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6">
          <nav class="space-y-6 text-lg font-bold uppercase tracking-tighter text-[#002D62]">
            <a href="${rel}index.html" class="block hover:text-[#007CC3] transition-colors">Home</a>
            <a href="${rel}about.html" class="block hover:text-[#007CC3] transition-colors">About</a>
            
            <!-- Services Accordion -->
            <div class="mobile-accordion">
              <button class="w-full flex items-center justify-between hover:text-[#007CC3] transition-colors mobile-accordion-btn">
                <span>Services</span>
                <i class="fas fa-chevron-down text-sm transition-transform duration-300"></i>
              </button>
              <div class="mobile-accordion-content hidden pl-4 pt-4 space-y-4 text-sm font-medium normal-case text-gray-600">
                <a href="${rel}services.html" class="block text-[#007CC3] font-bold">View All Services</a>
                <a href="${rel}services/ai-solutions.html" class="block hover:text-[#007CC3]">AI Solutions</a>
                <a href="${rel}services/erp-crm.html" class="block hover:text-[#007CC3]">ERP & CRM</a>
                <a href="${rel}services/web-app.html" class="block hover:text-[#007CC3]">Web & Apps</a>
                <a href="${rel}services/branding.html" class="block hover:text-[#007CC3]">SEO & Branding</a>
              </div>
            </div>

            <!-- Products Accordion -->
            <div class="mobile-accordion">
              <button class="w-full flex items-center justify-between hover:text-[#007CC3] transition-colors mobile-accordion-btn">
                <span>Products</span>
                <i class="fas fa-chevron-down text-sm transition-transform duration-300"></i>
              </button>
              <div class="mobile-accordion-content hidden pl-4 pt-4 space-y-4 text-sm font-medium normal-case text-gray-600">
                <a href="${rel}products.html" class="block text-[#007CC3] font-bold">View All Products</a>
                <a href="${rel}products/crm.html" class="block hover:text-[#007CC3]">Enterprise CRM</a>
                <a href="${rel}products/ai-chatbot.html" class="block hover:text-[#007CC3]">AI Chatbot</a>
              </div>
            </div>

            <a href="${rel}portfolio.html" class="block hover:text-[#007CC3] transition-colors">Portfolio</a>
            <a href="${rel}industries.html" class="block hover:text-[#007CC3] transition-colors">Industries</a>
            <a href="${rel}blog.html" class="block hover:text-[#007CC3] transition-colors">Insights</a>
            <a href="${rel}careers.html" class="block hover:text-[#007CC3] transition-colors">Careers</a>
            <a href="${rel}contact.html" class="block hover:text-[#007CC3] transition-colors">Contact</a>
          </nav>
        </div>
        
        <div class="p-6 border-t border-gray-100/50">
          <a href="${rel}contact.html#consultation" class="block w-full text-center bg-[#007CC3] text-white px-5 py-3 font-black text-xs uppercase tracking-tighter hover:bg-[#002D62] transition-colors shadow-lg">Book Consultation</a>
        </div>
      </div>
    </header>
    `;
    this.activateCurrentNavLink();
    this.setupMobileMenu();
  }

  activateCurrentNavLink() {
    const navLinks = this.querySelectorAll(".nav-link");
    const currentPath = window.location.pathname.split("/").pop().replace(".html", "") || "index";

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const linkPath = href.split("/").pop().replace(".html", "");

      if (linkPath === currentPath) {
        link.classList.add("active-link");
        link.classList.remove("inactive-link");

        const parentGroup = link.closest(".group");
        if (parentGroup) {
          parentGroup.classList.add("active-dropdown");
        }
      } else {
        link.classList.remove("active-link");
        link.classList.add("inactive-link");
      }
    });
  }

  setupMobileMenu() {
    const toggleBtn = this.querySelector("#menu-toggle");
    const closeBtn = this.querySelector("#menu-close");
    const mobileMenu = this.querySelector("#mobile-menu");
    const overlay = this.querySelector("#mobile-menu-overlay");

    const openMenu = () => {
      overlay.classList.remove("opacity-0", "pointer-events-none");
      mobileMenu.classList.remove("translate-x-full");
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      overlay.classList.add("opacity-0", "pointer-events-none");
      mobileMenu.classList.add("translate-x-full");
      // Restore body scroll
      document.body.style.overflow = '';
    };

    toggleBtn?.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);
    overlay?.addEventListener("click", closeMenu);

    // Accordion Logic
    const accordionBtns = this.querySelectorAll(".mobile-accordion-btn");
    accordionBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector("i");
        
        // Toggle current
        content.classList.toggle("hidden");
        icon.style.transform = content.classList.contains("hidden") ? "rotate(0deg)" : "rotate(180deg)";
      });
    });
  }
}

class SpecialFooter extends HTMLElement {
  connectedCallback() {
    // Determine relative path to root
    const path = window.location.pathname;
    const isInsideSubdir = path.includes('/services/') || path.includes('/products/') || path.includes('/legal/');
    const rel = isInsideSubdir ? '../' : './';

    this.innerHTML = `
      <footer class="bg-[#05060A] text-white relative overflow-hidden border-t border-white/5 pt-20">
        <!-- Ambient Background Lights -->
        <div class="absolute -top-24 -left-24 w-[600px] h-[600px] bg-[#007CC3]/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <!-- 1. PRE-FOOTER CTA -->
        <div class="max-w-7xl mx-auto px-6 md:px-10 mb-24">
          <div class="glass-card p-10 md:p-16 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-10 bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-r from-[#007CC3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="relative z-10 text-center md:text-left">
              <h2 class="text-3xl md:text-5xl font-black mb-4 tracking-tighter">Ready to <span class="text-[#007CC3]">Innovate?</span></h2>
              <p class="text-white/50 font-medium max-w-md">Join the elite group of US and UK enterprises scaling with Vybtek's AI-first engineering.</p>
            </div>
            <div class="relative z-10 flex flex-wrap justify-center gap-4">
              <a href="${rel}contact.html" class="bg-[#007CC3] text-white px-10 py-5 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-white hover:text-[#05060A] transition-all shadow-[0_0_30px_rgba(0,124,195,0.3)] hover:scale-105 active:scale-95">Start Project</a>
              <a href="${rel}portfolio.html" class="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-white/10 transition-all">Case Studies</a>
            </div>
          </div>
        </div>

        <!-- 2. MAIN FOOTER CONTENT -->
        <div class="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-16 pb-20 relative z-10">
          
          <!-- BRAND BLOCK -->
          <div class="md:col-span-4">
            <a href="${rel}index.html" class="inline-block mb-10">
              <img src="${rel}images/logo.png" alt="VybTek" class="h-14 w-auto brightness-0 invert" />
            </a>
            <p class="text-white/40 text-sm leading-loose font-medium mb-10 max-w-xs">
              Architecting digital dominance through custom AI ecosystems, high-fidelity branding, and strategic marketing execution.
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#007CC3] hover:border-[#007CC3] transition-all duration-500 hover:-translate-y-1"><i class="fab fa-linkedin-in text-sm"></i></a>
              <a href="#" class="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#007CC3] hover:border-[#007CC3] transition-all duration-500 hover:-translate-y-1"><i class="fab fa-x-twitter text-sm"></i></a>
              <a href="#" class="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#007CC3] hover:border-[#007CC3] transition-all duration-500 hover:-translate-y-1"><i class="fab fa-instagram text-sm"></i></a>
            </div>
          </div>

          <!-- LINKS GRID -->
          <div class="md:col-span-2">
            <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-[#007CC3] mb-8">Navigation</h4>
            <ul class="space-y-4">
              <li><a href="${rel}about.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold flex items-center gap-2 group/link"><span class="w-1 h-1 bg-[#007CC3] rounded-full scale-0 group-hover/link:scale-100 transition-transform"></span> About Us</a></li>
              <li><a href="${rel}portfolio.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold flex items-center gap-2 group/link"><span class="w-1 h-1 bg-[#007CC3] rounded-full scale-0 group-hover/link:scale-100 transition-transform"></span> Portfolio</a></li>
              <li><a href="${rel}blog.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold flex items-center gap-2 group/link"><span class="w-1 h-1 bg-[#007CC3] rounded-full scale-0 group-hover/link:scale-100 transition-transform"></span> Insights</a></li>
              <li><a href="${rel}careers.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold flex items-center gap-2 group/link"><span class="w-1 h-1 bg-[#007CC3] rounded-full scale-0 group-hover/link:scale-100 transition-transform"></span> Careers</a></li>
            </ul>
          </div>

          <div class="md:col-span-2">
            <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-[#007CC3] mb-8">Solutions</h4>
            <ul class="space-y-4">
              <li><a href="${rel}services/ai-solutions.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">AI Development</a></li>
              <li><a href="${rel}services/branding.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">SEO & Digital Branding</a></li>
              <li><a href="${rel}services/erp-crm.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">ERP & CRM</a></li>
              <li><a href="${rel}products/ai-chatbot.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">AI Chatbots</a></li>
            </ul>
          </div>

          <!-- NEWSLETTER BLOCK -->
          <div class="md:col-span-4">
            <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-[#007CC3] mb-8">Join the Vanguard</h4>
            <p class="text-[11px] text-white/40 mb-8 leading-relaxed font-medium">Get exclusive insights on how AI is reshaping US and UK enterprise sectors.</p>
            <div class="relative group">
              <input type="email" placeholder="work email address" class="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-xs font-bold focus:outline-none focus:border-[#007CC3] transition-all placeholder:text-white/10">
              <button class="absolute right-2 top-2 bottom-2 bg-[#007CC3] hover:bg-white hover:text-[#05060A] text-white px-6 rounded-xl text-[10px] font-black uppercase transition-all">Join</button>
            </div>
            <div class="mt-6 flex items-center gap-3">
               <div class="flex -space-x-2">
                  <div class="w-6 h-6 rounded-full border-2 border-[#05060A] bg-gray-600"></div>
                  <div class="w-6 h-6 rounded-full border-2 border-[#05060A] bg-gray-500"></div>
                  <div class="w-6 h-6 rounded-full border-2 border-[#05060A] bg-gray-400"></div>
               </div>
               <span class="text-[9px] font-bold text-white/30 uppercase tracking-widest">+500 industry leaders joined</span>
            </div>
          </div>
        </div>

        <!-- 3. BOTTOM UTILITY BAR -->
        <div class="border-t border-white/5 py-10 bg-black/20">
          <div class="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="flex flex-col md:flex-row items-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
              <p>&copy; 2025 VYBTEK SOLUTIONS. ALL RIGHTS RESERVED.</p>
              <div class="flex gap-6">
                <a href="${rel}legal/privacy.html" class="hover:text-white transition-colors">Privacy</a>
                <a href="${rel}legal/terms.html" class="hover:text-white transition-colors">Terms</a>
                <a href="${rel}sitemap.html" class="hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
            <div class="flex items-center gap-6">
               <span class="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Based in Udaipur, Global Delivery</span>
               <div class="w-[1px] h-4 bg-white/10"></div>
               <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  <span class="text-[9px] font-black text-white/40 uppercase tracking-widest">Global HQ Online</span>
               </div>
            </div>
          </div>
        </div>
      </footer>
    `;

    this.activateCurrentFooterLink();
  }

  activateCurrentFooterLink() {
    const footerLinks = this.querySelectorAll(".footer-link");
    const currentPath = window.location.pathname.split("/").pop().replace(".html", "") || "index";

    footerLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const linkPath = href.split("/").pop().replace(".html", "");

      if (linkPath === currentPath) {
        link.classList.add("active-footer-link");
        link.classList.remove("inactive-footer-link");
      } else {
        link.classList.add("inactive-footer-link");
        link.classList.remove("active-footer-link");
      }
    });
  }
}

customElements.define("special-header", SpecialHeader);
customElements.define("special-footer", SpecialFooter);

// --- Dynamic Breadcrumb Component ---
class SpecialBreadcrumb extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname;
    // Determine relative path to root for breadcrumb home link
    const isInsideSubdir = path.includes('/services/') || path.includes('/products/') || path.includes('/legal/');
    const rel = isInsideSubdir ? '../' : './';

    // Don't render on home page
    if (path === "/" || path.endsWith("index.html") || path === "") return;

    // Parse path segments
    const segments = path.split("/").filter(seg => seg.length > 0 && !seg.endsWith(".io")); // ignore domain parts if any
    
    let breadcrumbHTML = `
      <div class="sticky top-[105px] left-0 right-0 z-[90] pointer-events-none breadcrumb-container">
        <div class="max-w-7xl mx-auto px-6 md:px-10 w-full flex justify-start">
          <nav class="inline-flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 pointer-events-auto bg-white/40 backdrop-blur-xl border border-white/20 shadow-sm px-4 py-2 rounded-full breadcrumb-nav">
            <a href="${rel}index.html" class="hover:text-[#007CC3] transition-colors flex items-center gap-1.5 home-link"><i class="fas fa-house-chimney text-[7px]"></i> Home</a>
    `;

    let currentPath = "";
    
    segments.forEach((segment, index) => {
      // Clean up segment name (remove .html, replace dashes with spaces)
      let name = segment.replace(".html", "").replace(/-/g, " ");
      // Capitalize
      name = name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      
      currentPath += "/" + segment;
      
      breadcrumbHTML += `
        <span class="text-slate-400 opacity-40">/</span>
      `;

      // If it's the last item, don't make it a link and highlight it
      if (index === segments.length - 1) {
        breadcrumbHTML += `<span class="text-[#007CC3]">${name}</span>`;
      } else {
        // If it's a directory like /services/ try to link to services.html, else just raw path
        let linkPath = currentPath;
        if (!segment.includes(".html")) {
            linkPath = currentPath + ".html"; // e.g. /services -> /services.html
        }
        
        breadcrumbHTML += `<a href="${linkPath}" class="hover:text-[#007CC3] transition-colors">${name}</a>`;
      }
    });

    breadcrumbHTML += `
        </nav>
      </div>
    `;

    this.innerHTML = breadcrumbHTML;
  }
}
customElements.define("special-breadcrumb", SpecialBreadcrumb);

// Auto-inject breadcrumb into all pages with <main>
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const path = window.location.pathname;
  if (main && path !== "/" && !path.endsWith("index.html") && !path.endsWith("/")) {
    const breadcrumb = document.createElement("special-breadcrumb");
    main.prepend(breadcrumb);
  }
});
