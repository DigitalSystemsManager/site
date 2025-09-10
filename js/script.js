// js/script.js

// Função para carregar componentes HTML dinamicamente em um container específico
async function loadComponent(containerId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Erro ao carregar o componente ${componentPath}: ${response.status} ${response.statusText}`);
        }
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        console.log(`Componente ${componentPath} carregado com sucesso em #${containerId}.`);

        // Após carregar o menu, ajusta o padding-top do body.
        if (containerId === 'menu-container') {
            adjustBodyPadding();
            window.addEventListener('resize', adjustBodyPadding);
        }
    } catch (error) {
        console.error(`Falha crítica ao carregar componente ${componentPath}:`, error); // Log mais detalhado
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<p style="color: red; text-align: center; padding: 20px;">
                Erro ao carregar o conteúdo da seção ${containerId}. (Arquivo: ${componentPath}). Verifique os caminhos e arquivos.
            </p>`;
        }
    }
}

// Função para ajustar o padding-top do body, dinamicamente baseando-se na altura do cabeçalho
function adjustBodyPadding() {
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer && menuContainer.firstElementChild) {
        const headerHeight = menuContainer.firstElementChild.offsetHeight;
        document.body.style.paddingTop = `${headerHeight}px`;
    }
}


// --- INJEÇÃO PRINCIPAL DOS COMPONENTES NA PÁGINA ---
document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('menu-container', 'components/menu.html');
    await loadComponent('protecao-container', 'sections/protecao.html');
    await loadComponent('portfolio-container', 'sections/portfolio.html');
    await loadComponent('treinamentos-container', 'sections/treinamentos.html');

    await loadComponent('footer-container', 'components/footer.html');
});
