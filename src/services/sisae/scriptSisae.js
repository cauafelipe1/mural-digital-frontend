/***
 * fazer uma funcao get nesse caminho http://127.0.0.1:8080/api/sisae/listAll
 * 
 * e pegar a data do navegador e tratar com o que vem 
 * 
 * 
 * 
 */


/***
 * 
 * fazer a funcao post http://127.0.0.1:8080/api/sisae/cadastrar 
 * 
 */
document.getElementById("uploadForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const titulo = document.getElementById("titulo").value;
    const mensagem = document.getElementById("mensagem").value;
    const imagemInput = document.getElementById("imagem");
    const imagemFile = imagemInput.files[0];

    if (!imagemFile) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    
    const reader = new FileReader();
    reader.onloadend = async function () {
      const imagemBase64 = reader.result.split(',')[1]; 
      
      const data = {
        titulo: titulo,
        mensagem: mensagem,
        imagem: imagemBase64
      };

      try {
        const response = await fetch("http://localhost:8080/media/cadastrar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        console.log(response);
        console.log(data);
        const responseData = await response.json();
        document.getElementById("response").textContent = JSON.stringify(responseData, null, 2);

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

    reader.readAsDataURL(imagemFile); 
  });