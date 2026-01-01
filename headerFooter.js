class SpecialHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header class="sticky top-0 z-50 backdrop-blur-md shadow-lg">
      <div class="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
        <!-- Logo -->
        <a href="/" class="flex items-center">
          <img src="./images/Vybtek Logo  SVG.svg" alt="Logo" class="w-12 h-12 object-contain" />
          <span class="text-2xl font-extrabold text-gray-700">VybTek</span>
        </a>

        <!-- Mobile Menu Toggle -->
        <button id="menu-toggle" class="md:hidden text-blue-700 text-2xl focus:outline-none">
          <i class="fas fa-bars"></i>
        </button>

        <!-- Contact + Navigation -->
        <div class="hidden md:flex items-center gap-8">

          <!-- Nav Menu -->
          <ul class="flex gap-6 items-center text-sm font-medium text-blue-900">
            <li><a href="about" class="nav-link inactive-link">About</a></li>

            <!-- Services Dropdown -->
            <li class="relative group">
              <button class="transition">Services ▾</button>
              <div class="absolute left-0 top-full w-44 bg-white border shadow-lg rounded-lg p-4 hidden group-hover:block z-50">
                <ul class="space-y-2 text-gray-800">
                  <li><a href="software" class="nav-link block hover:text-blue-600">Software Development</a></li>
                  <li><a href="design" class="nav-link block hover:text-blue-600">Web Design</a></li>
                  <li><a href="marketing" class="nav-link block hover:text-blue-600">Digital Marketing</a></li>
                  <li><a href="techsupport" class="nav-link block hover:text-blue-600">IT Tech Support</a></li>
                  <li><a href="outsourcing" class="nav-link block hover:text-blue-600">Tech Outsourcing</a></li>
                  <li><a href="consultation" class="nav-link block hover:text-blue-600">Tech Consultation</a></li>
                </ul>
              </div>
            </li>

            <li><a href="projects" class="nav-link inactive-link">Projects</a></li>
            <li><a href="contact" class="nav-link inactive-link">Contact</a></li>

          </ul>

        </div>
      </div>

      <!-- Drawer Mobile Menu -->
      <div id="mobile-menu" class="hidden fixed top-0 left-0 w-full bg-white z-40 overflow-y-auto transition-all px-6 pt-20 pb-10">
        <button id="menu-close" class="absolute top-4 right-4 text-3xl text-gray-800"><i class="fas fa-times"></i></button>
        <nav class="space-y-4 text-blue-900 text-base font-medium">
          <a href="about" class="nav-link block py-2 hover:text-blue-700">About</a>
          <details>
            <summary class="py-2 cursor-pointer">Services</summary>
            <div class="ml-4 space-y-2">
              <a href="software" class="nav-link block hover:text-blue-700">Software Development</a>
              <a href="design" class="nav-link block hover:text-blue-700">Web Design</a>
              <a href="marketing" class="nav-link block hover:text-blue-700">Digital Marketing</a>
              <a href="techsupport" class="nav-link block hover:text-blue-700">IT Tech Support</a>
              <a href="outsourcing" class="nav-link block hover:text-blue-700">Tech Outsourcing</a>
              <a href="consultation" class="nav-link block hover:text-blue-700">Tech Consultation</a>
            </div>
          </details>
          <a href="projects" class="nav-link block py-2 hover:text-blue-700">Projects</a>
          <a href="blog" class="nav-link block py-2 hover:text-blue-700">Blog</a>
          <a href="contact" class="nav-link block py-2 hover:text-blue-700">Contact</a>
        </nav>
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

    toggleBtn?.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden");
    });

    closeBtn?.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  }
}

class SpecialFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` 
      <footer class="bg-gradient-to-b from-blue-100 to-white py-10 px-6 md:px-16">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Branding Section -->
          <div>
            <h2 class="text-xl font-bold flex items-center gap-2">
              <img src="./images/logo-removebg.png" alt="vybtek Logo" class="w-12 h-8" /> 
              VybTek
            </h2>
            <p class="text-gray-600 mt-2">
              From Software Design to Digital Branding – Your Trusted Tech Partner.
            </p>
           <div class="flex space-x-3 mt-4">
  <a href="https://www.facebook.com/profile.php?id=61572940687826" target="_blank" class="p-2 bg-white rounded-full shadow-md hover:text-gray-400 text-xl flex items-center justify-center w-10 h-10">
    <i class="fab fa-facebook-f"></i>
  </a>
  <a href="https://x.com/vybtekIT" target="_blank" class="p-2 bg-white rounded-full shadow-md hover:text-gray-400 text-xl flex items-center justify-center w-10 h-10">
    <i class="fa-brands fa-x-twitter"></i>
  </a>
  <a href="https://www.linkedin.com/company/vybtek/" target="_blank" class="p-2 bg-white rounded-full shadow-md hover:text-gray-400 text-xl flex items-center justify-center w-10 h-10">
    <i class="fab fa-linkedin"></i>
  </a>
  <a href="https://www.instagram.com/vybtek_it/" target="_blank" class="p-2 bg-white rounded-full shadow-md hover:text-gray-400 text-xl flex items-center justify-center w-10 h-10">
    <i class="fab fa-instagram"></i>
  </a>
</div>

          </div>

          <!-- IT Services Section -->
          <div>
            <h3 class="text-lg font-semibold">IT Services</h3>
            <ul class="mt-2 space-y-2 text-gray-600">
              <li><a href="software" class="footer-link">Software Development</a></li>
              <li><a href="design" class="footer-link">Web Design</a></li>
              <li><a href="marketing" class="footer-link">Digital Marketing</a></li>
              <li><a href="techsupport" class="footer-link">IT Tech Support</a></li>
              <li><a href="outsourcing" class="footer-link">Tech Outsourcing</a></li>
              <li><a href="consultation" class="footer-link">Tech Consultation</a></li>
            </ul>
          </div>

          <!-- Contact Info Section -->
          <div>
    <h3 class="text-lg font-semibold">Contact Info</h3>
    <ul class="mt-2 space-y-2 text-gray-600">
       <li>
  <a href="https://maps.app.goo.gl/bhadKHqrtPvyghnb7" target="_blank" class="flex items-start space-x-2">
    <i class="fas fa-map-marker-alt text-blue-500 text-lg"></i>
    <span>Amrit shree, 319, Ashok Nagar, Udaipur, Rajasthan 313001</span>
  </a>
     </li>
        <li>
            <a href="mailto:info@vybtek.com" class="flex items-center space-x-2">
                <i class="fas fa-envelope text-blue-500"></i>
                <span>info@vybtek.com</span>
            </a>
        </li>
         <li><i class="fas fa-clock text-blue-500"></i> Opening Hours: 10:00 - 18:00</li>
       </ul>
       </div>
         </div>

        <!-- Footer Bottom -->
        <div class="mt-10 text-center text-gray-600 border-t pt-4">
          <p>&copy; 2025 All Rights Reserved.</p>
          <div class="mt-2 space-x-4">
            <a href="index" class="footer-link">Home</a>
            <a href="about" class="footer-link">About</a>
            <a href="services" class="footer-link">Services</a>
            <a href="projects" class="footer-link">Projects</a>
            <a href="careers" class="footer-link">Career</a>
            <a href="faq" class="footer-link">FAQs</a>
            <a href="contact" class="footer-link">Contact Us</a>
            <a href="sitemap" class="footer-link">Sitemap</a>
             <!--  <a href="ourteam" class="footer-link">Our Team</a> -->         
          </div>
        </div>
      </footer>`;

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
