// js/script.js (JS GLOBAL COM TUDO - DEFINITIVO)

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

        // Após carregar o menu, ajusta o padding-top do body
        if (containerId === 'menu-container') {
            adjustBodyPadding();
            window.addEventListener('resize', adjustBodyPadding);
        }

        // Se a sessão de treinamentos foi carregada, inicializa o acordeão (agora a lógica está aqui).
        if (containerId === 'treinamentos-container') {
            initializeAccordion();
        }

        // Após cada componente ser carregado e injetado, re-processa os links de âncora
        // para garantir que eles estão funcionando com o novo conteúdo.
        processAnchorLinks();

    } catch (error) {
        console.error(`Falha crítica ao carregar componente ${componentPath}:`, error);
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<p style="color: red; text-align: center; padding: 20px;">
                Erro ao carregar o conteúdo da seção ${containerId}. Verifique os caminhos e arquivos.
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

// --- FUNÇÃO PARA INICIALIZAR O ACORDEÃO (AGORA RESIDE NO JS GLOBAL) ---
function initializeAccordion() {
    const treinamentosContainer = document.getElementById('treinamentos-container');
    if (!treinamentosContainer || treinamentosContainer.dataset.accordionInitializedOnce) {
        // Já inicializado ou container não presente
        return;
    }

    const accordionHeaders = treinamentosContainer.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length === 0) { 
        console.warn("Acordeão: Nenhum '.accordion-header' encontrado dentro de #treinamentos-container.");
        return; 
    }

    accordionHeaders.forEach(header => {
        if (!header.dataset.accordionListenerAttached) {
            header.addEventListener('click', function() {
                const accordionContent = this.nextElementSibling;
                this.classList.toggle('active');
                accordionContent.classList.toggle('open');
                
                if (accordionContent.classList.contains('open')) {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
                } else {
                    accordionContent.style.maxHeight = null;
                }
            });
            header.dataset.accordionListenerAttached = 'true';
        }
    });
    console.log("Acordeão da Sessão de Treinamentos: Inicializado com sucesso pelo script.js!");
    treinamentosContainer.dataset.accordionInitializedOnce = 'true';
}


// --- FUNÇÃO DE ROLAGEM SUAVE (UNIFICADA AQUI) ---
function smoothScrollToAnchor(anchorId) {
    const targetElement = document.getElementById(anchorId);
    if (targetElement) {
        setTimeout(() => { // Pequeno delay para garantir que a rolagem aconteça
            targetElement.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, null, `#${anchorId}`);
            console.log(`Rolando suavemente para ID: #${anchorId}`);
        }, 100);
    } else {
        console.warn(`Elemento com ID '${anchorId}' não encontrado para rolagem. (Link falhou!)`);
    }
}

// --- FUNÇÃO PARA GERENCIAR CLIQUES EM LINKS DE ÂNCORA (GLOBAL) ---
function processAnchorLinks() {
    // Adiciona listener globalmente e gerencia cliques em links internos #
    document.body.removeEventListener('click', handleAnchorClick); // Remove listener anterior para evitar duplicação
    document.body.addEventListener('click', handleAnchorClick);
}

function handleAnchorClick(e) {
    const anchor = e.target.closest('a'); // Busca o 'a' mais próximo, se clicou dentro de um
    if (anchor && anchor.getAttribute('href') && anchor.getAttribute('href').startsWith('#') && anchor.getAttribute('href').length > 1) {
        const href = anchor.getAttribute('href');
        const anchorId = href.substring(1);
        e.preventDefault(); // Impede a ação padrão do navegador (rolagem instantânea)
        smoothScrollToAnchor(anchorId);
    }
}


// --- INJEÇÃO PRINCIPAL DOS COMPONENTES NA PÁGINA ---
document.addEventListener('DOMContentLoaded', async () => {
    // Carrega todos os HTMLs das sessões na ordem
    await loadComponent('menu-container', 'components/menu.html');
    await loadComponent('protecao-container', 'sections/protecao.html');
    await loadComponent('portfolio-container', 'sections/portfolio.html');
    await loadComponent('treinamentos-container', 'sections/treinamentos.html');
    await loadComponent('footer-container', 'components/footer.html');

    // Inicializa processamento de links de âncora globalmente,
    // garantindo que ele capture qualquer clique que possa ocorrer após todos os loads.
    processAnchorLinks(); 

    // Se a URL já possui uma âncora (ex: page.com/#chamada-final), role para ela após tudo carregar.
    if (window.location.hash) {
        const initialAnchorId = window.location.hash.substring(1);
        // Pequeno atraso para dar tempo de todos os componentes renderizarem completamente
        setTimeout(() => smoothScrollToAnchor(initialAnchorId), 300); 
    }
});
