self.addEventListener("notificationclick", (event) => {
  if (event.action === "confirmar") {
    // Chame a função correspondente à ação "Confirmar"
    funcaoConfirmar();
  } else if (event.action === "cancelar") {
    // Chame a função correspondente à ação "Cancelar"
    funcaoCancelar();
  } else {
    // Ação padrão ou nenhuma ação
    funcaoPadrao();
  }

  event.notification.close();
});

function funcaoConfirmar() {
  // Lógica para a ação "Confirmar"
  console.log("Ação Confirmar acionada");
}

function funcaoCancelar() {
  // Lógica para a ação "Cancelar"
  console.log("Ação Cancelar acionada");
}

function funcaoPadrao() {
  // Lógica para a ação padrão ou nenhuma ação
  console.log("Nenhuma ação ou ação padrão");
}
