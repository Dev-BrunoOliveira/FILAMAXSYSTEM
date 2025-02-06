import { database, ref, set, onValue } from "./firebase.js";

const escalaRef = ref(database, "Escala");
let escala = {};

onValue(escalaRef, (snapshot) => {
  const data = snapshot.val();
  console.log("Dados recebidos do Firebase:", data); // Debug
  if (data) {
    escala = data;
    atualizarCalendario();
  }
});

function salvarEscala(dia, editores) {
  const diaRef = ref(database, `Escala/${ano}-${mes}/${dia}`);
  set(diaRef, { editores })
    .then(() => {
      console.log(`Escala do dia ${dia} salva com sucesso.`);
    })
    .catch((error) => {
      console.error("Erro ao salvar a escala:", error);
    });
}

function atualizarCalendario() {
  tbody.innerHTML = "";
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const tr = document.createElement("tr");
    const tdData = document.createElement("td");
    const tdEditor = document.createElement("td");
    const select = document.createElement("select");

    tdData.textContent = `${dia} de ${meses[mes]} de ${ano}`;

    editores.forEach((editor) => {
      const option = document.createElement("option");
      option.value = editor;
      option.textContent = editor;
      select.appendChild(option);
    });

    const editoresDia = escala[`${ano}-${mes}`]
      ? escala[`${ano}-${mes}`][String(dia)] || []
      : [];
    select.value = editoresDia[0] || "";

    select.addEventListener("change", () => {
      const novoEditor = select.value;
      const novosEditores = [novoEditor];
      salvarEscala(dia, novosEditores);
    });

    tdEditor.appendChild(select);
    tr.appendChild(tdData);
    tr.appendChild(tdEditor);
    tbody.appendChild(tr);
  }
}
