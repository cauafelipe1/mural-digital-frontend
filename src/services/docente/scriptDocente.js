
document.addEventListener("DOMContentLoaded", () => {
	const idServidor = localStorage.getItem("idServidor");
	if (idServidor) {
		document.getElementById("idServidor").value = idServidor;
	} else {
		alert("ID do Servidor não encontrado no Local Storage.");
	}
});

document.getElementById("projectForm").addEventListener("submit", async (event) => {
	event.preventDefault();

	const dataInicio = document.getElementById("dataInicio").value;
	const dataFinal = document.getElementById("dataFinal").value;
	const titulo = document.getElementById("titulo").value;
	const mensagem = document.getElementById("mensagem").value;
	const turmaDocente = document.getElementById("turmaDocente").value;
	const idServidor = document.getElementById("idServidor").value;

	const payload = {
		dataInicio,
		dataFinal,
		titulo,
		mensagem,
		turmaDocente: { id: turmaDocente },
		loginServidor: { idServidor: idServidor }
	};

	try {
		const response = await fetch("http://127.0.0.1:8080/api/NoticiaDocente", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload)
		});

		if (response.ok) {
			alert("Dados enviados com sucesso!");
		} else {
			alert("Erro ao enviar os dados. Tente novamente.");
		}
	} catch (error) {
		console.error("Erro ao enviar os dados:", error);
		alert("Erro de conexão com a API.");
	}
});



//*** fazer uma funcao get e tratar com os dados do navegar dos dias com o retorno do get e fazer um get  */
/**
 * http://127.0.0.1:8080/api/NoticiaDocente/listAlls
 * 
 * retorno
 * 
 * 
 * {
	"id": 2,
	"dataInicio": "2024-12-01T10:00:00.000+00:00",
	"dataFinal": "2024-12-01T12:00:00.000+00:00",
	"titulo": "Reunião de Projeto",
	"mensagem": "Discussão sobre o andamento do projeto",
	"turmaDocente": {
		"id": 1,
		"turma": "INFO301",
		"disciplina": "Introdução à Programação",
		"loginServidor": {
			"idServidor": 1,
			"email": "joao.silva@example.com",
			"name": "João Silva",
			"tipoServidor": "DOCENTE"
		}
	},
	"loginServidor": {
		"idServidor": 1,
		"email": "joao.silva@example.com",
		"name": "João Silva",
		"tipoServidor": "DOCENTE"
	}
}
 * 
 * 
 */
