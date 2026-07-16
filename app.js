function pesquisar() {
    const section = document.getElementById("resultados-pesquisa");
    const campoPesquisaInput = document.getElementById("campo-pesquisa");
    const campoPesquisaValue = campoPesquisaInput.value.toLowerCase().trim();
    const searchButton = document.querySelector(".search-btn");
    const soccerLoader = document.getElementById("soccer-loader");

    // Se o campo estiver vazio, mostra o estado vazio imediatamente
    if (!campoPesquisaValue) {
        section.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🤔</div>
                <h3 class="empty-title">Qual receita vamos fazer?</h3>
                <p class="empty-subtitle">Digite algo no campo de busca para encontrar delícias!</p>
            </div>
        `;
        return;
    }

    // Oculta os resultados anteriores e exibe a animação do gol
    section.style.display = "none";
    soccerLoader.style.display = "flex";

    // Reinicia a animação do gol recriando os elementos internos para reiniciar as animações CSS
    soccerLoader.innerHTML = `
        <div class="field-line"></div>
        <div class="goalpost">
            <div class="net-pattern"></div>
        </div>
        <div class="soccer-ball">⚽</div>
        <div class="goooal-text">GOOOOL! 🇧🇷</div>
    `;

    // Desabilita o botão de busca durante a animação
    searchButton.disabled = true;

    // Aguarda o término da animação do gol (aproximadamente 2 segundos) antes de mostrar os resultados
    setTimeout(() => {
        // Oculta a animação e reexibe a seção de resultados
        soccerLoader.style.display = "none";
        section.style.display = "grid";
        searchButton.disabled = false;

        let resultadosHTML = "";
        let encontrados = 0;

        // Function to highlight search terms
        function highlightText(text, term) {
            if (!text || typeof text !== 'string' || !term) return text;
            const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            try {
                const regex = new RegExp(`(${escapedTerm})`, 'gi');
                 // Avoid highlighting within HTML tags themselves
                let newText = '';
                let lastIndex = 0;
                text.replace(/<[^>]*>|[^<]+/g, (match) => {
                    if (match.startsWith('<')) {
                        newText += match; // Keep tags as is
                    } else {
                        newText += match.replace(regex, `<mark class="highlight">$1</mark>`);
                    }
                });
                return newText;

            } catch (e) {
                console.warn("Highlighting error:", e);
                return text;
            }
        }


        for (let dado of dados) {
            const tituloOriginal = dado.titulo; // Keep original for display
            const ingredientesOriginal = dado.ingredientes;
            const preparoOriginal = dado.preparo;
            const dicaOriginal = dado.dica;

            const tituloLower = tituloOriginal.toLowerCase();
            const ingredientesLower = ingredientesOriginal.toLowerCase();
            const preparoLower = preparoOriginal.toLowerCase();
            const dicaLower = (dicaOriginal && typeof dicaOriginal === 'string') ? dicaOriginal.toLowerCase() : "";


            if (tituloLower.includes(campoPesquisaValue) ||
                ingredientesLower.includes(campoPesquisaValue) ||
                preparoLower.includes(campoPesquisaValue) ||
                (dicaLower && dicaLower.includes(campoPesquisaValue))) {

                encontrados++;

                // Apply highlighting to copies of the data for display
                const displayTitulo = highlightText(tituloOriginal, campoPesquisaValue);
                const displayIngredientes = highlightText(ingredientesOriginal, campoPesquisaValue);
                const displayPreparo = highlightText(preparoOriginal, campoPesquisaValue);
                const displayDica = (dicaOriginal && dicaOriginal !== "N/A") ? highlightText(dicaOriginal, campoPesquisaValue) : "";

                resultadosHTML += `
                    <article class="recipe-card">
                        <div class="card-header">
                            <h2 class="recipe-title">${displayTitulo}</h2>
                        </div>
                        <div class="card-content">
                            <h3 class="section-title">🥄 Ingredientes</h3>
                            <div class="content-text">${displayIngredientes}</div>

                            <h3 class="section-title">👩‍🍳 Modo de Preparo</h3>
                            <div class="content-text">${displayPreparo}</div>

                            ${(dicaOriginal && dicaOriginal !== "N/A") ? `
                                <div class="tip-section">
                                    <div class="tip-title">💡 Dica Especial</div>
                                    <div class="tip-text">${displayDica}</div>
                                </div>
                            ` : ''}
                        </div>
                    </article>
                `;
            }
        }

        if (encontrados === 0) {
            section.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">😔</div>
                    <h3 class="empty-title">Ops! Nenhuma receita encontrada.</h3>
                    <p class="empty-subtitle">Tente palavras-chave diferentes ou verifique a ortografia.</p>
                </div>
            `;
        } else {
            section.innerHTML = resultadosHTML;
        }

    }, 2000); // Tempo da animação do gol (2 segundos)
}

// Allow search on Enter key in the input field
document.getElementById("campo-pesquisa").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Good practice if the input was part of a form
        pesquisar();
    }
});

// Dynamically set the current year in the footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('footer-year');
    if (yearElement) {
        yearElement.textContent = `© ${new Date().getFullYear()} - Julie's Kitchen. Todos os direitos reservados.`;
    }
});
