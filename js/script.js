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

        // Caso deseje carregar JavaScript específico para cada componente/sessão.
        // Verifica se o componente carregado é um .html de sessão ou componente principal.
        // A lógica de carregamento do JS deve ser implementada com cautela para evitar duplicações.
        // Exemplo: if (componentPath.endsWith('.html')) loadJSForComponent(componentPath);
        
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
    
    // 1. Carrega o Menu de Navegação (componente principal)
    await loadComponent('menu-container', 'components/menu.html');
    
    // 2. Carrega a Sessão 1: Proteção de Dados
    await loadComponent('protecao-container', 'sections/protecao.html');

    // 3. Carrega a Sessão 2: Portfólio de Serviços
    await loadComponent('portfolio-container', 'sections/portfolio.html');
    
    // --- LUGAR PARA CARREGAR FUTURAS SESSÕES (DESCOMENTE QUANDO O ARQUIVO ESTIVER CRIADO) ---
    // 4. Carrega a Sessão 3: Treinamentos e Aulas
    // await loadComponent('treinamentos-container', 'sections/treinamentos.html');

    // 5. Carrega a Sessão 4: Consultoria para Empresas
    // await loadComponent('consultoria-container', 'sections/consultoria.html');

    // 6. Carrega a Sessão 5: Contatos
    // await loadComponent('contatos-container', 'sections/contato.html');
    // --- FIM DOS CARREGAMENTOS FUTUROS ---
    
    // 7. Carrega o Footer (componente principal)
    await loadComponent('footer-container', 'components/footer.html');
});
