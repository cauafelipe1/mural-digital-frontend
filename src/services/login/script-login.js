function handleCredentialResponse(response) {
  console.log("Resposta do Google:", response);
  const data = decodeJwtResponse(response.credential);
  console.log("Dados decodificados:", data);
  $("img").attr("src", data.picture)
  $(".name").text(data.name);
  $(".email").text(data.email);
  $(".profile").show();
  $(".form_login").hide()

  fetch("http://localhost:3000/save-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      name: data.name,
      picture: data.picture,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Usuário salvo no banco:", result);
    })
    .catch((error) => {
      console.error("Erro ao salvar usuário:", error);
    });
}

window.onload = function () {
  $(".profile").hide()
  google.accounts.id.initialize({
    client_id: "770728337848-i13i12nf739f7jigavg1i9t8oonriblu.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("btn_login"),
    {
      theme: "filled_blue",
      size: "medium",
      type: "standard",
      shape: "rectangular",
      locale: "pt-br",
      text: "signin_with",
      logo_alignment: "right",
      auto_prompt: "false",
    }
  );
  google.accounts.id.prompt();
}
function decodeJwtResponse(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
document.querySelector(".logout").addEventListener("click", function () {
  google.accounts.id.disableAutoSelect();
  $(".profile").hide();
  $(".form_login").show()
})


/** tem que fazer um funcao de tipo get nesse escopo http://127.0.0.1:8080/api/login/consultar?email=joao.silva@example.com ai vai ter um retorno DOCENTE, RESTAURANTE, SISAE 
 * Ai fazer que seja redirecionado para cada tela 
 * 
 * DOCENTE - menu-docente
 * RESTAURANTE - menu-restaurante
 * SISAE - menu-sisae
 * 
*/



/***
 * 
 * tem que salvar os dados dele no localstorage
 */