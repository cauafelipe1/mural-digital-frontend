/** 
 * 
 * Fazer aqui uma funcao post que http://127.0.0.1:8080/api/NoticiaDocente
 * e passe no corpo isso 
 * {
  "dataInicio": "2024-12-01T10:00:00",
  "dataFinal": "2024-12-01T12:00:00",
  "titulo": "Reunião de Projeto",
  "mensagem": "Discussão sobre o andamento do projeto",
  "turmaDocente": {
		"id":1 
	},
    "loginServidor": {
    "idServidor": 1}
}

*/


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