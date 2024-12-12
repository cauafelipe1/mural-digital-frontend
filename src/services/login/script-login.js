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

function handleCredentialResponse(response) {
  console.log("Resposta do Google:", response);
  const data = decodeJwtResponse(response.credential);
  console.log("Dados decodificados:", data);

  fetch(`http://127.0.0.1:8080/api/login/consultar?email=${data.email}`)
      .then((res) => res.json())
      .then((userData) => {
          console.log("Dados do usuário:", userData);
          localStorage.setItem("userData", JSON.stringify(userData));

          if (userData === "DOCENTE") {
              window.location.href = "/src/pages/docente/telaDocente.html";
          } else if (userData === "RESTAURANTE") {
              window.location.href = "menu-restaurante.html";
          } else if (userData === "SISAE") {
              window.location.href = "menu-sisae.html";
          } else {
              alert("Perfil não reconhecido.");
          }
      })
      .catch((error) => {
          console.error("Erro ao consultar usuário:", error);
      });
}


window.onload = function () {
  google.accounts.id.initialize({
      client_id: "770728337848-i13i12nf739f7jigavg1i9t8oonriblu.apps.googleusercontent.com",
      callback: handleCredentialResponse,
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
};