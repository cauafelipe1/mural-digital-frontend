function enviarDados() {
  const cardapio = {
      carnes: document.getElementById('carnes').value,
      opcoes_vegana: document.getElementById('opcoesVeganas').value,
      sucos: document.getElementById('sucos').value,
      saladas: document.getElementById('saladas').value,
      carboidratos: document.getElementById('carboidratos').value,
      sobremesa: document.getElementById('sobremesa').value,
      data: document.getElementById('data').value
  };

  fetch('http://127.0.0.1:8080/api/cardapio/cadastrar', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardapio)
  })
  .then(response => {
      if (response.ok) {
          alert('Cardápio enviado com sucesso!');
          
      } else {
        console.log(response.ok)
          alert('Erro ao enviar o cardápio.');
      }
  })
  .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao enviar o cardápio.');
  });
}