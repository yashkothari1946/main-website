window.__ENV__ = {
  NEXT_PUBLIC_API_URL: (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? 'http://localhost:5000'
    : 'https://api.vybtek.com'
};

const scriptTag = document.querySelector('script[src*="headerFooter.js"]');
let globalRel = './';
if (scriptTag) {
  const src = scriptTag.getAttribute('src');
  globalRel = src.split('headerFooter.js')[0];
  if (globalRel === '') globalRel = './';
}

class SpecialHeader extends HTMLElement {
  connectedCallback() {
    const rel = globalRel;

    this.innerHTML = `
    <header class="fixed top-0 left-0 w-full z-[100] backdrop-blur-md border-b border-gray-100 bg-white/80 transition-all duration-300 header-main">
      <div class="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <!-- Logo -->
        <a href="${rel}index.html" class="flex items-center group">
          <img src="${rel}images/logo.png" alt="VybTek Logo" class="h-6 md:h-8 w-auto object-contain" />
        </a>

        <!-- Mobile Menu Toggle -->
        <button id="menu-toggle" class="md:hidden text-[#007CC3] text-2xl focus:outline-none">
          <i class="fas fa-bars"></i>
        </button>

        <!-- Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <ul class="flex gap-6 items-center text-[11px] font-bold uppercase tracking-widest text-[#475569] nav-list">
            
            <!-- What We Do Dropdown -->
            <li class="relative group">
              <a href="${rel}services.html" class="flex items-center gap-1 hover:text-[#007CC3] transition-colors cursor-pointer nav-link">What We Do <i class="fas fa-chevron-down text-[10px]"></i></a>
              <div class="absolute left-0 top-[calc(100%+10px)] w-60 bg-white border border-gray-100 shadow-2xl rounded-xl p-3 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200 before:content-[''] before:absolute before:-top-[15px] before:left-0 before:w-full before:h-[20px]">
                <a href="${rel}services.html#digital-branding" class="block p-3 hover:bg-slate-50 rounded-lg text-[#0D1B3E] font-black transition-colors">Digital Branding</a>
                <a href="${rel}services.html#it-services" class="block p-3 hover:bg-slate-50 rounded-lg text-[#0D1B3E] font-black transition-colors">IT & Tech Solutions</a>
              </div>
            </li>

            <!-- Who We Help -->
            <li><a href="${rel}industries.html" class="nav-link hover:text-[#007CC3] transition-colors">Who We Help</a></li>

            <!-- Who We Are Dropdown -->
            <li class="relative group">
              <a href="#" class="flex items-center gap-1 hover:text-[#007CC3] transition-colors cursor-pointer nav-link">Who We Are <i class="fas fa-chevron-down text-[10px]"></i></a>
              <div class="absolute left-0 top-[calc(100%+10px)] w-48 bg-white border border-gray-100 shadow-2xl rounded-xl p-3 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200 before:content-[''] before:absolute before:-top-[15px] before:left-0 before:w-full before:h-[20px]">
                <a href="${rel}about.html" class="block p-3 hover:bg-slate-50 rounded-lg text-[#0D1B3E] font-black transition-colors">About Us</a>
                <a href="${rel}careers.html" class="block p-3 hover:bg-slate-50 rounded-lg text-[#0D1B3E] font-black transition-colors">Careers</a>
                <a href="${rel}contact.html" class="block p-3 hover:bg-slate-50 rounded-lg text-[#0D1B3E] font-black transition-colors">Contact Us</a>
              </div>
            </li>

            <!-- Resources Dropdown -->
            <li class="relative group">
              <a href="#" class="flex items-center gap-1 hover:text-[#007CC3] transition-colors cursor-pointer nav-link">Resources <i class="fas fa-chevron-down text-[10px]"></i></a>
              <div class="absolute left-0 top-[calc(100%+10px)] w-48 bg-white border border-gray-100 shadow-2xl rounded-xl p-3 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200 before:content-[''] before:absolute before:-top-[15px] before:left-0 before:w-full before:h-[20px]">
                <a href="${rel}blog.html" class="block p-3 hover:bg-slate-50 rounded-lg text-[#0D1B3E] font-black transition-colors">Blog</a>
                <a href="${rel}portfolio.html" class="block p-3 hover:bg-slate-50 rounded-lg text-[#0D1B3E] font-black transition-colors">Case Studies</a>
                <a href="${rel}faq.html" class="block p-3 hover:bg-slate-50 rounded-lg text-[#0D1B3E] font-black transition-colors">FAQ</a>
                <a href="${rel}resources.html" class="block p-3 hover:bg-slate-50 rounded-lg text-[#0D1B3E] font-black transition-colors">Guides / Resources</a>
              </div>
            </li>

            <!-- Secondary Optional Button -->
            <li><a href="${rel}contact.html" class="nav-link hover:text-[#007CC3] transition-colors text-[#475569] font-bold ml-2 hidden lg:inline-block">Contact Us</a></li>
            
            <!-- Primary Button -->
            <li><a href="${rel}contact.html#consultation" class="bg-[#007CC3] text-white px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-tighter hover:bg-[#0D1B3E] transition-all shadow-lg hover:scale-105 active:scale-95">Book a Free Consultation</a></li>
          </ul>
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
    const rel = globalRel;

    // Overlay and panel must live on document.body — fixed descendants of a
    // backdrop-filter ancestor are positioned relative to that ancestor, not
    // the viewport, which breaks full-screen overlay and slide-in panel.
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/50 z-[190] opacity-0 pointer-events-none transition-opacity duration-300';
    overlay.style.backdropFilter = 'blur(4px)';

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white border-l border-gray-200 shadow-2xl z-[200] translate-x-full transition-transform duration-300 ease-out flex flex-col';
    mobileMenu.innerHTML = `
      <div class="flex items-center justify-between p-6 border-b border-gray-100">
        <span class="text-xl font-extrabold tracking-tight text-[#0D1B3E] uppercase">Menu</span>
        <button id="menu-close" class="text-2xl text-gray-500 hover:text-[#007CC3] transition-colors p-1"><i class="fas fa-times"></i></button>
      </div>
      <div class="flex-1 overflow-y-auto p-6">
        <nav class="space-y-6 text-lg font-bold uppercase tracking-tighter text-[#0D1B3E]">
          <div class="mobile-accordion">
            <button class="w-full flex items-center justify-between hover:text-[#007CC3] transition-colors mobile-accordion-btn py-1">
              <span>What We Do</span>
              <i class="fas fa-chevron-down text-sm transition-transform duration-300"></i>
            </button>
            <div class="mobile-accordion-content hidden pl-6 pt-3 space-y-4 text-sm font-medium normal-case text-gray-600 border-l-2 border-gray-100 ml-2 mt-2">
              <a href="${rel}services.html" class="block hover:text-[#007CC3] font-bold">All Services</a>
              <a href="${rel}services.html#digital-branding" class="block hover:text-[#007CC3]">Digital Branding</a>
              <a href="${rel}services.html#it-services" class="block hover:text-[#007CC3]">IT &amp; Tech Solutions</a>
            </div>
          </div>
          <a href="${rel}industries.html" class="block hover:text-[#007CC3] transition-colors py-1">Who We Help</a>
          <div class="mobile-accordion">
            <button class="w-full flex items-center justify-between hover:text-[#007CC3] transition-colors mobile-accordion-btn py-1">
              <span>Who We Are</span>
              <i class="fas fa-chevron-down text-sm transition-transform duration-300"></i>
            </button>
            <div class="mobile-accordion-content hidden pl-6 pt-3 space-y-4 text-sm font-medium normal-case text-gray-600 border-l-2 border-gray-100 ml-2 mt-2">
              <a href="${rel}about.html" class="block hover:text-[#007CC3]">About Us</a>
              <a href="${rel}careers.html" class="block hover:text-[#007CC3]">Careers</a>
              <a href="${rel}contact.html" class="block hover:text-[#007CC3]">Contact Us</a>
            </div>
          </div>
          <div class="mobile-accordion">
            <button class="w-full flex items-center justify-between hover:text-[#007CC3] transition-colors mobile-accordion-btn py-1">
              <span>Resources</span>
              <i class="fas fa-chevron-down text-sm transition-transform duration-300"></i>
            </button>
            <div class="mobile-accordion-content hidden pl-6 pt-3 space-y-4 text-sm font-medium normal-case text-gray-600 border-l-2 border-gray-100 ml-2 mt-2">
              <a href="${rel}blog.html" class="block hover:text-[#007CC3]">Blog</a>
              <a href="${rel}portfolio.html" class="block hover:text-[#007CC3]">Case Studies</a>
              <a href="${rel}faq.html" class="block hover:text-[#007CC3]">FAQ</a>
              <a href="${rel}resources.html" class="block hover:text-[#007CC3]">Guides / Resources</a>
            </div>
          </div>
        </nav>
      </div>
      <div class="p-6 border-t border-gray-100">
        <a href="${rel}contact.html#consultation" class="block w-full text-center bg-[#007CC3] text-white px-5 py-3 rounded-full font-black text-xs uppercase tracking-tighter hover:bg-[#0D1B3E] transition-colors shadow-lg">Book Consultation</a>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(mobileMenu);

    const closeBtn = mobileMenu.querySelector('#menu-close');

    const openMenu = () => {
      overlay.classList.remove('opacity-0', 'pointer-events-none');
      mobileMenu.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      overlay.classList.add('opacity-0', 'pointer-events-none');
      mobileMenu.classList.add('translate-x-full');
      document.body.style.overflow = '';
    };

    toggleBtn?.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Close menu when any nav link is tapped
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    // Accordion Logic
    mobileMenu.querySelectorAll('.mobile-accordion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        content.classList.toggle('hidden');
        icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    });
  }
}

class SpecialFooter extends HTMLElement {
  connectedCallback() {
    const rel = globalRel;

    this.innerHTML = `
      <footer class="bg-[#0D1B3E] text-white relative overflow-hidden border-t border-white/5 pt-20">
        <!-- Ambient Background Lights -->
        <div class="absolute -top-24 -left-24 w-[600px] h-[600px] bg-[#007CC3]/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1044C8]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <!-- 1. PRE-FOOTER CTA (Requirement #9) -->
        <div class="max-w-7xl mx-auto px-6 md:px-10 mb-24">
          <div class="glass-card p-10 md:p-16 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-10 bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-r from-[#007CC3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="relative z-10 text-center md:text-left">
              <h2 class="text-3xl md:text-5xl font-black mb-4 tracking-tighter">Ready to <span class="text-[#007CC3]">Innovate?</span></h2>
              <p class="text-white/50 font-medium max-w-md">Join the elite group of global enterprises scaling with Vybtek's engineering.</p>
            </div>
            <div class="relative z-10 flex flex-wrap justify-center gap-4">
              <a href="${rel}contact.html#consultation" class="bg-[#007CC3] text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-[#0D1B3E] transition-all shadow-[0_0_30px_rgba(0,124,195,0.3)] hover:scale-105 active:scale-95">Book Free Consultation</a>
              <a href="${rel}contact.html#quote" class="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">Get a Quote</a>
              <a href="${rel}contact.html" class="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">Start Project</a>
            </div>
          </div>
        </div>

        <!-- 2. MAIN FOOTER CONTENT -->
        <div class="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-8 pb-20 relative z-10">
          
          <!-- BRAND & CONTACT (Req #7) -->
          <div class="md:col-span-3">
            <a href="${rel}index.html" class="inline-block bg-white/95 px-4 py-2 rounded-xl mb-6 shadow-sm hover:shadow-md transition-all duration-300">
              <img src="${rel}images/logo.png" alt="VybTek" class="h-8 w-auto object-contain" />
            </a>
            <p class="text-white/40 text-sm leading-loose font-medium mb-6 max-w-xs">
              Architecting digital dominance through custom AI ecosystems, high-fidelity branding, and strategic marketing execution.
            </p>
            <div class="space-y-3 text-white/50 text-xs font-medium">
              <p class="flex items-start gap-3"><i class="fas fa-envelope text-[#007CC3] mt-1"></i> <span>Support@vybtek.com</span></p>
              <p class="flex items-start gap-3"><i class="fas fa-phone text-[#007CC3] mt-1"></i> <span>+91 900 1200 450</span></p>
              <p class="flex items-start gap-3"><i class="fas fa-location-dot text-[#007CC3] mt-1"></i> <span>Innovation Park, Udaipur, RJ 313001</span></p>
              <p class="flex items-start gap-3"><i class="fas fa-clock text-[#007CC3] mt-1"></i> <span>Mon - Fri: 9:00 AM - 6:00 PM (IST)</span></p>
            </div>
          </div>

          <!-- LINKS GRID -->
          <div class="md:col-span-9 grid grid-cols-2 md:grid-cols-5 gap-8">
            
            <!-- Company -->
            <div>
              <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-[#007CC3] mb-6">Company</h4>
              <ul class="space-y-3">
                <li><a href="${rel}about.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">About Us</a></li>
                <li><a href="${rel}careers.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Careers</a></li>
                <li><a href="${rel}portfolio.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Case Studies</a></li>
                <li><a href="${rel}contact.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Contact Us</a></li>
              </ul>
            </div>

            <!-- Services -->
            <div>
              <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-[#007CC3] mb-6">Services</h4>
              <ul class="space-y-3">
                <li><a href="${rel}services/website-development.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Website Dev</a></li>
                <li><a href="${rel}services/ai-development.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">AI Development</a></li>
                <li><a href="${rel}services/app-development.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">App Development</a></li>
                <li><a href="${rel}services/software-development.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Software Dev</a></li>
                <li><a href="${rel}services/ui-ux.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">UI/UX Design</a></li>
                <li><a href="${rel}services/branding.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Branding</a></li>
                <li><a href="${rel}services/digital-marketing.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Digital Marketing</a></li>
              </ul>
            </div>

            <!-- Products -->
            <div>
              <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-[#007CC3] mb-6">Products</h4>
              <ul class="space-y-3">
                <li><a href="${rel}products/erp.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">VybCore ERP</a></li>
                <li><a href="${rel}products/crm.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Enterprise CRM</a></li>
                <li><a href="${rel}products/ai-chatbot.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">AI Chatbots</a></li>
                <li><a href="${rel}products/ai-transcription.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">AI Transcription</a></li>
              </ul>
            </div>

            <!-- Industries -->
            <div>
              <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-[#007CC3] mb-6">Industries</h4>
              <ul class="space-y-3">
                <li><a href="${rel}industries.html#healthcare" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Healthcare</a></li>
                <li><a href="${rel}industries.html#education" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Education</a></li>
                <li><a href="${rel}industries.html#real-estate" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Real Estate</a></li>
                <li><a href="${rel}industries.html#ecommerce" class="text-white/50 hover:text-white transition-colors text-xs font-bold">E-Commerce</a></li>
              </ul>
            </div>

            <!-- Resources -->
            <div>
              <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-[#007CC3] mb-6">Resources</h4>
              <ul class="space-y-3">
                <li><a href="${rel}blog.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Blog</a></li>
                <li><a href="${rel}faq.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">FAQ</a></li>
                <li><a href="${rel}portfolio.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Case Studies</a></li>
                <li><a href="${rel}resources.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Guides & Resources</a></li>
                <li><a href="${rel}contact.html" class="text-white/50 hover:text-white transition-colors text-xs font-bold">Support</a></li>
              </ul>
            </div>

          </div>
        </div>

        <!-- 3. BOTTOM UTILITY BAR -->
        <div class="border-t border-white/5 py-10 bg-black/20">
          <div class="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
            
            <div class="flex flex-col md:flex-row items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
              <p>&copy; 2025 VYBTEK SOLUTIONS. ALL RIGHTS RESERVED.</p>
              
              <!-- Legal Links (Req #6) -->
              <div class="flex flex-wrap justify-center gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <a href="${rel}legal/privacy.html" class="hover:text-white transition-colors">Privacy</a>
                <a href="${rel}legal/terms.html" class="hover:text-white transition-colors">Terms</a>
                <a href="${rel}legal/refund.html" class="hover:text-white transition-colors">Refund Policy</a>
                <a href="${rel}legal/cookie.html" class="hover:text-white transition-colors">Cookie Policy</a>
                <a href="${rel}legal/disclaimer.html" class="hover:text-white transition-colors">Disclaimer</a>
              </div>
            </div>

            <!-- Social Links (Req #8) -->
            <div class="flex items-center gap-3">
               <a href="https://www.linkedin.com/company/vybtek" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#007CC3] hover:border-[#007CC3] transition-all text-white/50 hover:text-white"><i class="fab fa-linkedin-in text-[10px]"></i></a>
               <a href="https://www.instagram.com/vybtek_it/" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#007CC3] hover:border-[#007CC3] transition-all text-white/50 hover:text-white"><i class="fab fa-instagram text-[10px]"></i></a>
               <a href="https://www.facebook.com/p/VybTek-It-Solutions-61572940687826/" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#007CC3] hover:border-[#007CC3] transition-all text-white/50 hover:text-white"><i class="fab fa-facebook-f text-[10px]"></i></a>
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
    const rel = globalRel;

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
