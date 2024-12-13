document.getElementById("projectForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const dataInicio = document.getElementById("dataInicio").value;
    const dataFinal = document.getElementById("dataFinal").value;
    const titulo = document.getElementById("titulo").value;
    const mensagem = document.getElementById("mensagem").value;
    const turmaDocenteId = document.getElementById("turmaDocente").value;

  
    const userData = JSON.parse(localStorage.getItem("userData"));


    if (!userData || !userData.idServidor) {
        alert("ID do servidor não encontrado. Faça login novamente.");
        return;
    }

    const idServidor = userData.idServidor;
    
    console.log(idServidor)
    if (!idServidor) {
        alert("ID do servidor não encontrado. Faça login novamente.");
        return;
    }

   
    const payload = {
        dataInicio,
        dataFinal,
        titulo,
        mensagem,
        turmaDocente: {
            id: turmaDocenteId  
        },
        loginServidor: {
            idServidor: idServidor  
        }
    };
  
    console.log(payload);  

    try {
        const response = await fetch("http://127.0.0.1:8080/api/NoticiaDocente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)  
        });

        if (response.ok) {
            alert("Projeto cadastrado com sucesso!");
            window.location.href = "/src/pages/docente/telaDocente.html";
        } else {
            const responseBody = await response.json();
            console.log("Erro da API:", responseBody);
            alert("Erro ao cadastrar o projeto. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao enviar o projeto:", error);
        alert("Erro de conexão com a API.");
    }
});
