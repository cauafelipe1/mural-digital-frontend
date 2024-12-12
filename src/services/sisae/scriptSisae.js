document.getElementById("uploadForm").addEventListener("submit", async function(event) { 
  event.preventDefault(); // Previne o envio padrão do formulário

  const titulo = document.getElementById("titulo").value;
  const mensagem = document.getElementById("mensagem").value;
  const imagemInput = document.getElementById("imagem");
  const imagemFile = imagemInput.files[0];
  const data = document.getElementById("data").value; // Coleta o valor da data

  if (!imagemFile) {
    alert("Por favor, selecione uma imagem.");
    return;
  }

  // Usando FileReader para ler a imagem como base64
  const reader = new FileReader();
  reader.onloadend = async function () {
    // Remove o prefixo 'data:image/png;base64,' ou 'data:image/jpeg;base64,' para pegar apenas a parte base64
    const imagemBase64 = reader.result.split(',')[1]; 

    const requestData = {
      titulo: titulo,
      mensagem: mensagem,
      imagem: imagemBase64,
      data: data // Incluindo a data no corpo do pedido
    };

    try {
      // Enviando os dados para a API
      const response = await fetch("http://127.0.0.1:8080/api/sisae/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      const responseData = await response.json();
      document.getElementById("response").textContent = JSON.stringify(responseData, null, 2);

      // Verificando se a resposta foi bem-sucedida
      if (response.ok) {
        alert("Imagem enviada com sucesso!");
      } else {
        alert("Erro ao enviar a imagem.");
      }
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
      alert("Erro ao enviar a imagem.");
    }
  };

  // Lê a imagem como base64
  reader.readAsDataURL(imagemFile); 
});
