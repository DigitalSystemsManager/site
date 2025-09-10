/* ===================================
   MENU.JS - DIGITAL SYSTEMS MANAGING
   ================================== */

class MenuManager {
    constructor() {
        // ← ÁREA DE CUSTOMIZAÇÃO MANUAL
        this.mobileBreakpoint = 768;        // ← ALTERE AQUI O BREAKPOINT
        this.scrollThreshold = 100;         // ← ALTERE AQUI O SCROLL PARA EFEITO
        this.animationDuration = 300;       // ← ALTERE AQUI A VELOCIDADE
        
        this.init();
    }
    
    init() {
        this.setupElements();
        this.bindEvents();
        this.handleResize();
    }
    
    setupElements() {
        this.menuContainer = document.querySelector('.menu-container');
        this.mobileToggle = document.querySelector('.mobile-toggle');
        this.navMobile = document.querySelector('.nav-mobile');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.body = document.body;
    }
    
    bindEvents() {
        // Toggle Mobile Menu
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Scroll Effect
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Resize Handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Close mobile menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Close mobile menu on outside click
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }
    
    toggleMobileMenu() {
        const isActive = this.mobileToggle.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.mobileToggle.classList.add('active');
        this.navMobile.classList.add('active');
        this.body.style.overflow = 'hidden'; // ← ALTERE PARA 'auto' SE NÃO QUISER BLOQUEAR SCROLL
    }
    
    closeMobileMenu() {
        this.mobileToggle.classList.remove('active');
        this.navMobile.classList.remove('active');
        this.body.style.overflow = 'auto';
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        // ← ÁREA DE CUSTOMIZAÇÃO - EFEITO SCROLL
        if (scrollY > this.scrollThreshold) {
            this.menuContainer.style.background = 'rgba(255, 255, 255, 0.95)'; // ← ALTERE AQUI
            this.menuContainer.style.backdropFilter = 'blur(10px)';             // ← ALTERE AQUI
        } else {
            this.menuContainer.style.background = 'var(--menu-bg)';
            this.menuContainer.style.backdropFilter = 'none';
        }
    }
    
    handleResize() {
        const width = window.innerWidth;
        
        if (width > this.mobileBreakpoint) {
            this.closeMobileMenu();
        }
    }
    
    handleOutsideClick(e) {
        if (!this.menuContainer.contains(e.target)) {
            this.closeMobileMenu();
        }
    }
    
    // ← MÉTODO PARA SMOOTH SCROLL (OPCIONAL)
    smoothScrollTo(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// ← INICIALIZAÇÃO AUTOMÁTICA
document.addEventListener('DOMContentLoaded', () => {
    new MenuManager();
});

// ← EXPORTAR PARA USO EM OUTROS MÓDULOS (OPCIONAL)
window.MenuManager = MenuManager;
