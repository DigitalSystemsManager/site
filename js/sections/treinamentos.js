// js/sections/treinamentos.js

// --- FUNÇÃO PARA INICIALIZAR O ACORDEÃO (ESPECÍFICA PARA A SESSÃO DE TREINAMENTOS) ---
function initializeAccordion() {
    // Busca os headers do acordeão SOMENTE dentro do container da sessão de treinamentos
    const treinamentosContainer = document.getElementById('treinamentos-container');
    if (!treinamentosContainer) {
        console.warn("Acordeão: #treinamentos-container não encontrado no DOM. Inicialização abortada.");
        return;
    }

    const accordionHeaders = treinamentosContainer.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length === 0) { 
        console.warn("Acordeão: Nenhuma classe '.accordion-header' encontrada dentro de #treinamentos-container. Verifique o HTML da sessão.");
        return; 
    }

    accordionHeaders.forEach(header => {
        // PREVENÇÃO: Evitar anexar o listener múltiplas vezes
        // Adiciona o listener apenas se ele ainda não foi anexado.
        if (!header.dataset.accordionListenerAttached) {
            header.addEventListener('click', function() { // Usa 'function' para ter seu próprio 'this'
                const accordionContent = this.nextElementSibling; // 'this' refere-se ao header clicado
                this.classList.toggle('active'); // Alterna a classe 'active' no header
                accordionContent.classList.toggle('open'); // Alterna a classe 'open' no conteúdo
                
                // Ajusta o max-height para a altura real do conteúdo para transição suave
                if (accordionContent.classList.contains('open')) {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
                } else {
                    accordionContent.style.maxHeight = null; // Reseta para fechar suavemente
                }
            });
            header.dataset.accordionListenerAttached = 'true'; // Marca o header como "inicializado"
        }
    });
    console.log("Acordeão da Sessão de Treinamentos: Inicializado com sucesso!");
    treinamentosContainer.dataset.accordionInitializedOnce = 'true'; // Marca que toda a seção foi inicializada
}


// --- LÓGICA DE DETECÇÃO ROBUSTA PARA INICIALIZAR O ACORDEÃO ---
// Usa MutationObserver para esperar que o #treinamentos-container tenha conteúdo (HTML injetado)
const observer = new MutationObserver((mutationsList, observer) => {
    // Filtra mutações que adicionaram ou removeram nós filhos, ou mudaram atributos
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            const treinamentosContainer = document.getElementById('treinamentos-container');
            // Só inicializa se o container existir, tiver conteúdo HTML E NÃO tiver sido inicializado ainda
            if (treinamentosContainer && treinamentosContainer.innerHTML.trim() !== '' && !treinamentosContainer.dataset.accordionInitializedOnce) {
                console.log("Acordeão: detectado #treinamentos-container com conteúdo. Tentando inicializar...");
                initializeAccordion();
                // Importante: desconectar para não rodar múltiplas vezes e economizar recursos
                observer.disconnect(); 
                return;
            }
        }
    }
});

// Começa a observar o corpo do documento.
// Queremos ser avisados quando o '#treinamentos-container' é adicionado ou quando seu 'innerHTML' muda.
// childList: Observa adições e remoções diretas de filhos do 'document.body'.
// subtree: Observa toda a árvore de descendentes.
// attributes: Poderíamos observar, por exemplo, 'data-status="loaded"' se tivéssemos essa lógica.
observer.observe(document.body, { childList: true, subtree: true, attributes: false });

// Fallback ou Execução direta caso o HTML já esteja presente na carga inicial
// O MutationObserver é mais robusto para conteúdos dinâmicos, mas uma tentativa em DOMContentLoaded não faz mal.
document.addEventListener('DOMContentLoaded', () => {
    const treinamentosContainer = document.getElementById('treinamentos-container');
    if (treinamentosContainer && treinamentosContainer.innerHTML.trim() !== '' && !treinamentosContainer.dataset.accordionInitializedOnce) {
        console.log("Acordeão: DOMContentLoaded detectou #treinamentos-container com conteúdo. Tentando inicializar...");
        initializeAccordion();
    }
});
