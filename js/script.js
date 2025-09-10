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
        // *** AQUI NÃO HAVERÁ MAIS CHAMADA DIRETA PARA JS DE SESSÃO ***
        // O JS de cada sessão será carregado via tag <script defer> no index.html
        // e será executado automaticamente pelo navegador após o HTML estar pronto.

    } catch (error) {
        console.error(`Falha crítica: ${error}`);
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<p style="color: red; text-align: center; padding: 20px;">
                Erro ao carregar o conteúdo da seção ${containerId}. Tente novamente mais tarde.
            </p>`;
        }
    }
}

// Função para ajustar o padding-top do body dinamicamente
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
    
    // --- LUGAR PARA CARREGAR FUTURAS SESSÕES ---
    await loadComponent('treinamentos-container', 'sections/treinamentos.html');

    // await loadComponent('consultoria-container', 'sections/consultoria.html');
    // await loadComponent('contatos-container', 'sections/contato.html');
    // --- FIM DOS CARREGAMENTOS FUTUROS ---
    
    await loadComponent('footer-container', 'components/footer.html');
});
