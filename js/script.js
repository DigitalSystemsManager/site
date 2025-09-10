// js/script.js

// Função para carregar componentes HTML dinamicamente
async function loadComponent(containerId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Erro ao carregar o componente ${componentPath}: ${response.statusText}`);
        }
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        console.log(`Componente ${componentPath} carregado com sucesso em #${containerId}.`);

        // Após carregar o menu, ajusta o padding-top do body
        if (containerId === 'menu-container') {
            adjustBodyPadding();
            // Adiciona listener para ajustar padding em resize da janela
            window.addEventListener('resize', adjustBodyPadding);
        }
    } catch (error) {
        console.error(error);
        document.getElementById(containerId).innerHTML = `<p style="color: red;">Erro ao carregar o conteúdo.</p>`;
    }
}

// Função para ajustar o padding-top do body dinamicamente (para o header fixo)
function adjustBodyPadding() {
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer && menuContainer.firstElementChild) {
        const headerHeight = menuContainer.firstElementChild.offsetHeight;
        document.body.style.paddingTop = `${headerHeight}px`;
    }
}


// --- INJEÇÃO DOS COMPONENTES NA PÁGINA ---
// A ordem é importante para a visualização e para o ajuste do padding-top do body

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Carrega o Menu
    await loadComponent('menu-container', 'components/menu.html');
    
    // 2. Carrega a Sessão 1: Proteção de Dados
    // Certifique-se que o ID no index.html e o caminho do arquivo HTML estão corretos
    await loadComponent('protecao-container', 'sections/protecao.html');

    // 3. Carrega o Footer
    await loadComponent('footer-container', 'components/footer.html');

    // Você pode carregar outras seções aqui, mas vamos esperar a sua confirmação.
    // await loadComponent('hero-container', 'sections/hero.html'); 
    // await loadComponent('servicos-container', 'sections/servicos.html');
    // ... etc ...
});
