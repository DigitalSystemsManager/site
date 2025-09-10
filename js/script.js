// js/script.js

// Função para carregar componentes HTML dinamicamente em um container específico
async function loadComponent(containerId, componentPath) {
    try {
        const response = await fetch(componentPath);
        // Verifica se a resposta HTTP foi bem-sucedida (status 200-299)
        if (!response.ok) {
            // Lança um erro se o componente não puder ser carregado (ex: arquivo não encontrado 404)
            throw new Error(`Erro ao carregar o componente ${componentPath}: ${response.status} ${response.statusText}`);
        }
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        console.log(`Componente ${componentPath} carregado com sucesso em #${containerId}.`);

        // Após carregar o menu, ajusta o padding-top do body.
        // Isso garante que o conteúdo não fique escondido sob o menu fixo.
        if (containerId === 'menu-container') {
            adjustBodyPadding();
            // Adiciona listener para reajustar o padding se o usuário redimensionar a janela,
            // caso a altura do menu mude (ex: responsividade).
            window.addEventListener('resize', adjustBodyPadding);
        }
        // NOTA: O JS de cada sessão agora é carregado via tag <script defer> no index.html
        // e será executado automaticamente pelo navegador APÓS o HTML do componente estar pronto.
        // NENHUMA inicialização de script de sessão deve ser feita AQUI.

    } catch (error) {
        console.error(`Falha crítica: ${error}`);
        // Exibe uma mensagem de erro na interface para o usuário
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<p style="color: red; text-align: center; padding: 20px;">
                Erro ao carregar o conteúdo da seção ${containerId}. Tente novamente mais tarde.
            </p>`;
        }
    }
}

// Função para ajustar o padding-top do body, dinamicamente baseando-se na altura do cabeçalho
function adjustBodyPadding() {
    const menuContainer = document.getElementById('menu-container');
    // Assegura que o menu foi carregado e tem um primeiro elemento (o <header>)
    if (menuContainer && menuContainer.firstElementChild) {
        const headerHeight = menuContainer.firstElementChild.offsetHeight;
        document.body.style.paddingTop = `${headerHeight}px`;
        // console.log(`Padding top do body ajustado para: ${headerHeight}px`); // Para debug
    }
}


// --- INJEÇÃO PRINCIPAL DOS COMPONENTES NA PÁGINA ---
// Este evento garante que o DOM esteja completamente carregado antes de tentarmos injetar HTML.
document.addEventListener('DOMContentLoaded', async () => {
    // A ordem aqui define a ordem das seções na página.
    
    await loadComponent('menu-container', 'components/menu.html');
    await loadComponent('protecao-container', 'sections/protecao.html');
    await loadComponent('portfolio-container', 'sections/portfolio.html');
    
    // --- CARREGAMENTO DE FUTURAS SESSÕES (DESCOMENTE CADA LINHA QUANDO O ARQUIVO HTML ESTIVER CRIADO) ---
    await loadComponent('treinamentos-container', 'sections/treinamentos.html');

    // await loadComponent('consultoria-container', 'sections/consultoria.html');
    // await loadComponent('contatos-container', 'sections/contato.html');
    // --- FIM DOS CARREGAMENTOS FUTUROS ---
    
    await loadComponent('footer-container', 'components/footer.html');
});
