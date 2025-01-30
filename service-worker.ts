self.addEventListener("notificationclick", (event: any) => {
  if (event.action === "confirmar") {
    funcaoConfirmar();
  } else if (event.action === "cancelar") {
    funcaoCancelar();
  } else {
    funcaoPadrao();
  }

  event.notification.close();
});

export function funcaoConfirmar() {
  console.log("Ação Confirmar acionada");
}

function funcaoCancelar() {
  console.log("Ação Cancelar acionada");
}

function funcaoPadrao() {
  console.log("Nenhuma ação ou ação padrão");
}
