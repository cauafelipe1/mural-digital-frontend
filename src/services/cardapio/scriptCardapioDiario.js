document.getElementById('fetchMenuButton').addEventListener('click', getMenu);

async function getMenu() {
    const dateInput = document.getElementById('datePicker').value;
   

  // Verifique se a data foi escolhida
  if (!dateInput) {
    alert("Por favor, escolha uma data.");
    return;
  }
   
   const formattedDate = formatDate(dateInput);
   const { day, month } = extractDayAndMonth(dateInput); 
   document.getElementById('selectedDateDisplay').textContent = ` ${day} de ${month}`;
  const url = `http://127.0.0.1:8080/api/cardapio/date/${formattedDate}`;
    
    try {
      const response = await axios.get(url);
      
      // Verifique se response.data é um array e contém pelo menos um elemento
      if (Array.isArray(response.data) && response.data.length > 0) {
        const menu = response.data[0]; // Acessa o primeiro item
        
        // Função que preenche a célula com os itens fornecidos
        function fillCell(rowSelector, items) {
          const cell = document.querySelector(rowSelector);
          if (cell && items) {
            cell.textContent = items.join(", ");
          }
        }
        
        // Preencher a tabela com os dados do menu
        fillCell("tbody tr:nth-child(1) td:nth-child(2)", menu.carnes);
        fillCell("tbody tr:nth-child(2) td:nth-child(2)", menu.opcoes_vegana);
        fillCell("tbody tr:nth-child(3) td:nth-child(2)", menu.carboidratos);
        fillCell("tbody tr:nth-child(4) td:nth-child(2)", menu.sucos);
        fillCell("tbody tr:nth-child(5) td:nth-child(2)", menu.saladas);
        fillCell("tbody tr:nth-child(6) td:nth-child(2)", menu.sobremesa);
        
      } else {
        console.error("Dados inesperados recebidos:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar o cardápio:", error);
    }
  }
  
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate() + 1).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  
function extractDayAndMonth(inputDate) {
  const date = new Date(inputDate);
  const day = date.getDate()+1; 
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const month = monthNames[date.getMonth()]; 
  return { day, month };
}