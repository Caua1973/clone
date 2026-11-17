//Manipulação - DOM
const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-series");
const modelo = document.querySelector("#modelo-serie");

const apiKey="cv_UE5LcSG_652Wg0S9gNOa68hsl9r3ERBd7CA76bMf25yunEoSPABwH332hn98sY0j";
const apiUrl="https://api-ds.codeverse.dev.br/api/series";

//Funcao que busca todos os herois da API

async function buscarSeries() {
  resposta.textContent = "Carregando séries..."

  try {
    //Fazer uma requisicao GET para buscar as séries
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key": apiKey}
    });

    if(!retorno.ok){
      throw new Error("Nao foi possivel buscar as séries")
    }

    //converter para JSON
    const resultado = await retorno.json();

    //Percorrer todos os herois e montar as series.

    for (const serie of resultado.data) {
      const card = modelo.content.cloneNode(true);

      card.querySelector(".menu").textContent = serie.menu;
      card.querySelector(".title").textContent = serie.title;
      card.querySelector(".genero").textContent = serie.genero;
      card.querySelector(".numero_temporadas").textContent = serie.numero_temporadas;
      card.querySelector(".ano_lancamento").textContent = serie.ano_lancamento;
      card.querySelector(".plataforma").textContent = serie.plataforma;

      const imagem = card.querySelector("img");

      if(serie.imageUrl){
        imagem.src = serie.imageUrl;
        imagem.alt =  serie.title;
        imagem.alt =  serie.numero_temporadas;
        imagem.alt =  serie.ano_lancamento;
        imagem.alt =  serie.plataforma;
      } else {
        imagem.remove();
      }

      lista.appendChild(card); 
      
    }

    resposta.textContent="";


  } catch (error) {
    resposta.textContent = "Não foi possivel carregar as séries. Tente novamente!"
    console.error(error);
  }

}

//executo a funcao
buscarSeries();