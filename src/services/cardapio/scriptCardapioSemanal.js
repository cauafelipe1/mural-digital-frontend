/*
npm install axios
npm init
*/

//const axios = require('axios')

//insert API url here
const url = "http://127.0.0.1:8080/api/cardapio/week/2024-10-20";

async function getMenu() {
  let response = await axios.get(url);
  const menus = response.data; // Supondo que a resposta é uma lista de menus

  // Função para preencher as células da tabela
  function fillCell(rowSelector, items) {
    const cell = document.querySelector(rowSelector);
    if (cell && items) {
      cell.textContent = items.join(", ");
    }
  }
 // Preencher a tabela para os dias da semana (1 a 5)
 for (let i = 0; i < 5; i++) {
  const menu = menus[i]; // Acessar o menu do dia atual

  // Usar `nth-child` para preencher as células corretas de acordo com a estrutura da tabela
  //Alterei a posicao dos tr
  fillCell(`tbody tr:nth-child(1) td:nth-child(${i + 2})`, menu.carnes);
  fillCell(`tbody tr:nth-child(2) td:nth-child(${i + 2})`, menu.opcoes_vegana);
  fillCell(`tbody tr:nth-child(3) td:nth-child(${i + 2})`, menu.carboidratos);
  fillCell(`tbody tr:nth-child(4) td:nth-child(${i + 2})`, menu.sucos);
  fillCell(`tbody tr:nth-child(5) td:nth-child(${i + 2})`, menu.saladas);
  fillCell(`tbody tr:nth-child(6) td:nth-child(${i + 2})`, menu.sobremesa);
}
}

getMenu();

//highly recomended changing json file from daily to full week, will make things easier to work with
