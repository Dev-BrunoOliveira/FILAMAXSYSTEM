import { ref, set, onValue, get, push } from "firebase/database";
import { db } from "./firebaseConfig.js";

let escala = {};

async function salvarEscala1() {
  const escalaRef = push(ref(db, `Escala`));
  await set(escalaRef, {
    mes: "Fevereiro",
    editor: "Bruno",
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
