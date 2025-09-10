// js/sections/treinamentos.js

// --- FUNÇÃO PARA INICIALIZAR O ACORDEÃO (ESPECÍFICA PARA A SESSÃO DE TREINAMENTOS) ---
function initializeAccordion() {
    // Busca os headers do acordeão SOMENTE dentro do container da sessão de treinamentos
    const treinamentosSection = document.getElementById('treinamentos-container');
    if (!treinamentosSection) {
        console.warn("Sessão de Treinamentos (Container) não encontrada. Acordeão não pode ser inicializado.");
        return;
    }

    const accordionHeaders = treinamentosSection.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length === 0) { 
        console.log("Acordeão da Sessão de Treinamentos: Headers não encontrados DENTRO do container #treinamentos-container.");
        return; 
    }

    accordionHeaders.forEach(header => {
        // Para evitar múltiplas inicializações, checa se o evento já foi anexado
        if (!header.dataset.listenerAttached) {
            header.addEventListener('click', () => {
                const accordionContent = header.nextElementSibling;
                header.classList.toggle('active');
                accordionContent.classList.toggle('open');
                
                // Ajusta o max-height para a altura real do conteúdo para transição suave
                if (accordionContent.classList.contains('open')) {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
                } else {
                    accordionContent.style.maxHeight = null;
                }
            });
            header.dataset.listenerAttached = 'true'; // Marca que o listener foi anexado
        }
    });
    console.log("Acordeão da Sessão de Treinamentos inicializado.");
}


// --- LÓGICA DE DETECÇÃO PARA INICIALIZAR O ACORDEÃO APÓS A INJEÇÃO DO HTML ---
// Criamos um MutationObserver que irá monitorar o DOM para quando o #treinamentos-container
// for adicionado ou tiver seu conteúdo alterado.
const observeForTreinamentosContainer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        // Verifica se nós adicionamos novos nós ao DOM
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            const treinamentosContainer = document.getElementById('treinamentos-container');
            // Uma vez que o container principal da sessão está presente E não foi inicializado,
            // chamamos a função para inicializar os acordeões dentro dele.
            if (treinamentosContainer && !treinamentosContainer.dataset.accordionInitialized) {
                initializeAccordion();
                treinamentosContainer.dataset.accordionInitialized = 'true'; // Marca como inicializado
                observer.disconnect(); // Desconecta o observador após a primeira inicialização bem-sucedida
                return; 
            }
        }
    }
});

// Começa a observar o corpo do documento para detectar quando #treinamentos-container é adicionado.
// Observa `childList` (adição/remoção de elementos diretos) e `subtree` (adição/remoção em elementos filhos).
observeForTreinamentosContainer.observe(document.body, { childList: true, subtree: true });

// Fallback adicional (se o MutationObserver não pegar, tenta uma vez após o DOM completo carregar).
// A lógica do MutationObserver deve ser a primária.
document.addEventListener('DOMContentLoaded', () => {
    const treinamentosContainer = document.getElementById('treinamentos-container');
    if (treinamentosContainer && !treinamentosContainer.dataset.accordionInitialized) {
        initializeAccordion();
        treinamentosContainer.dataset.accordionInitialized = 'true';
    }
});
