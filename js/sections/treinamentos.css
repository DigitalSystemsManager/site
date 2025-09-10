// js/sections/treinamentos.js

// --- FUNÇÃO PARA INICIALIZAR O ACORDEÃO (ESPECÍFICA PARA A SESSÃO DE TREINAMENTOS) ---
function initializeAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Verificamos se há acordeões na página para evitar erros se a sessão ainda não carregou.
    if (accordionHeaders.length === 0) { 
        console.log("Acordeão da Sessão de Treinamentos: Headers não encontrados. Talvez a sessão ainda não esteja no DOM ou o HTML foi alterado.");
        return; // Sai da função se não houver elementos
    }

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionContent = header.nextElementSibling; // Pega o div de conteúdo que segue o cabeçalho
            header.classList.toggle('active');
            accordionContent.classList.toggle('open');
            
            // Ajusta o max-height para a altura real do conteúdo quando abre, para a transição suave
            if (accordionContent.classList.contains('open')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            } else {
                accordionContent.style.maxHeight = null; // Remove para a transição fechar
            }
        });
    });
    console.log("Acordeão da Sessão de Treinamentos inicializado.");
}

// O MutationObserver garantirá que o acordeão seja inicializado apenas quando a seção de treinamentos
// estiver presente no DOM, independente da ordem de carregamento ou injeção.
const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            const treinamentosContainer = document.getElementById('treinamentos-container');
            if (treinamentosContainer && treinamentosContainer.querySelector('.sessao-treinamentos')) {
                // A seção foi injetada! Inicialize o acordeão.
                initializeAccordion();
                observer.disconnect(); // Pare de observar após a inicialização para evitar múltiplas execuções
                return;
            }
        }
    }
});

// Começa a observar mudanças no <body> para detectar a adição da sessão de treinamentos
observer.observe(document.body, { childList: true, subtree: true });

// Fallback: se o JS carregar tarde demais ou por outro motivo, tente inicializar no DOMContentLoaded
// Isso é uma segurança extra para ensure o script rode, especialmente com defer.
document.addEventListener('DOMContentLoaded', () => {
    const treinamentosContainer = document.getElementById('treinamentos-container');
    if (treinamentosContainer && treinamentosContainer.querySelector('.sessao-treinamentos') && !treinamentosContainer.querySelector('.accordion-header.active')) {
        initializeAccordion(); // Só inicializa se não foi feito pelo observer ainda.
    }
});

```---

**Suas Ações Resumidas FINAL:**

1.  **Crie ou atualize o HTML:** Certifique-se de que `sections/treinamentos.html` está com o HTML que te passei para a sessão 3. **Lembre-se das imagens** `linux_server.png`, `aws_s3.png`, `firewall.png` na pasta `img/`.
2.  **Crie ou atualize o CSS:** Certifique-se de que `css/sections/treinamentos.css` está com o CSS que te passei para a sessão 3.
3.  **SUBSTITUA `index.html`** com o conteúdo completo do **Ponto 1** acima.
4.  **SUBSTITUA `js/script.js`** com o conteúdo completo do **Ponto 2** acima.
5.  **CRIE `js/sections/treinamentos.js`** (se não existir) na pasta `js/sections/` e cole o conteúdo completo do **Ponto 3** acima.
6.  Faça o `git push` para o GitHub Pages.
7.  Limpe o cache do seu navegador (`Ctrl/Cmd + Shift + R`).

Com essas mudanças, a Sessão de Treinamentos deverá funcionar perfeitamente, com o acordeão operando, e sua estrutura JS agora é totalmente modular!
