function pesquisar() {
    // Obtém a seção HTML onde os resultados da pesquisa serão exibidos
    let section = document.getElementById("resultados-pesquisa");
  
    let campoPesquisa = document.getElementById("campo-pesquisa").value;

    // se campo pesquisa for vazio
    if(campoPesquisa ==""){
        section.innerHTML = "Sem resultado para a pesquisa. campo de pesuisa vazio."
        return
    };

    campoPesquisa = campoPesquisa.toLowerCase()

    // Inicializa uma string vazia para armazenar os resultados formatados em HTML
    let resultados = "";
    let titulo = "";
    let ingredientes = "";
    let preparo = "";
    let dica = "";
    
  
    // Itera sobre cada dado na lista de resultados da pesquisa
    for (let dado of dados) {
        titulo = dado.titulo.toLocaleLowerCase();
        ingredientes = dado.ingredientes.toLocaleLowerCase();
        preparo = dado.preparo.toLocaleLowerCase();
        dica = dado.dica.toLocaleLowerCase();
        //se no includes campoPesquisa
        if(titulo.includes(campoPesquisa) || ingredientes.includes(campoPesquisa) || preparo.includes(campoPesquisa) || dica.includes(campoPesquisa)) {

            console.log(dado.titulo.includes(campoPesquisa));
            // Constrói o HTML para cada item do resultado da pesquisa, formatando o título, descrição e link
            //cria um novo elemento
            resultados += `
              <div class="item-resultado">
                <h2>
                  <a href="#" target="_blank">${dado.titulo}</a> 
                </h2>
                <h2>
                <p class="descricao-meta">${"Ingredientes:"}</p>
                </h2>
                <p class="descricao-meta">${dado.ingredientes}.</p>
                <\p>
                <h2>
                <p class="descricao-meta">${"Modo de Preparo:"}</p>
                </h2>
                <p class="descricao-meta">${dado.preparo}</p>
                <p class="subtitulo">${"Dica:"}</p>
                <p class="descricao-meta">${dado.dica}</p>
                </div>
            `;
        };
        if(!resultados){
            resultados = "Sem resultado para a pesquisa";
        }
    
    }; 
    // Atribui o HTML gerado para a seção de resultados, substituindo o conteúdo anterior
    section.innerHTML = resultados;
  }
