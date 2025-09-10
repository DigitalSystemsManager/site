// CARREGAMENTO AUTOMÁTICO DE COMPONENTES
document.addEventListener('DOMContentLoaded', function() {
    
    // Função para carregar componentes
    function loadComponent(containerId, filePath) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar ${filePath}: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = html;
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }
    
    // Carregar Menu
    loadComponent('menu-container', 'components/menu.html');
    
    // Carregar Footer
    loadComponent('footer-container', 'components/footer.html');
    
    // Carregar Seções (quando criadas)
    loadComponent('hero-container', 'sections/hero.html');
    loadComponent('protecao-container', 'sections/protecao.html');
    loadComponent('servicos-container', 'sections/servicos.html');
    loadComponent('treinamentos-container', 'sections/treinamentos.html');
    loadComponent('consultoria-container', 'sections/consultoria.html');
    
    // Menu Hambúrguer - Funcionalidade
    setTimeout(() => {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        
        if (mobileMenu && navMenu) {
            mobileMenu.addEventListener('click', function() {
                mobileMenu.classList.toggle('is-active');
                navMenu.classList.toggle('active');
            });
        }
    }, 100);
    
});
