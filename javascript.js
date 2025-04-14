import { ref, set, push, get } from "firebase/database";
import { db } from "./firebaseConfig.js";

let escala = {};
let carregando = true;

const editores = [
  " ",
  "Bruno",
  "Ronei",
  "Flávia",
  "Chico",
  "Folga",
  "Domingo",
  "Feriado",
  "Recesso",
];
const tbody = document.getElementById("calendario");
const hoje = new Date();
const ano = hoje.getFullYear();
const mesSelect = document.getElementById("mesSelect");
const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

let mes = hoje.getMonth();
let diasNoMes = new Date(ano, mes + 1, 0).getDate();

meses.forEach((nome, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = nome;
  mesSelect.appendChild(option);
});

mesSelect.value = mes;

mesSelect.addEventListener("change", () => {
  mes = parseInt(mesSelect.value);
  diasNoMes = new Date(ano, mes + 1, 0).getDate();
  carregandoInfo();
});

const carregandoInfo = async () => {
  carregando = true;

  const escalaRef = ref(db, `Escala/${ano}/${mes + 1}`);
  const resultado = await get(escalaRef);
  if (resultado.exists()) {
    console.log("resultado é", resultado.val());
    const dados = resultado.val();

    Object.entries(dados).forEach(([index, registro]) => {
      const dia = registro.dia;
      escala[`${dia}-${mes}`] = registro.editor;
      console.log("Escala agora é", escala);
    });

    carregando = false;

    if (!carregando) {
      const tabela = document.querySelector(".escala");
      tabela.style.display = "block";

      const loading = document.querySelector(".loading");
      loading.style.display = "none";
    }
  }

  atualizarCalendario();
};

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
      option.textContent = editor || "Nenhum";
      select.appendChild(option);
    });

    select.value = escala[`${dia}-${mes}`] || "";
    tdEditor.style.color = select.value ? "#50C878" : "red";

    select.addEventListener("change", async () => {
      const editorSelecionado = select.value;
      escala[`${dia}-${mes}`] = editorSelecionado;

      const rota = `${ano}/${mes + 1}/${dia}`;

      const escalaRef = ref(db, `Escala/${rota}`);
      await set(escalaRef, {
        dia: dia,
        mes: meses[mes],
        ano: ano,
        editor: editorSelecionado,
      });

      tdEditor.style.color = select.value ? "#50C878" : "red";

      const gif = document.getElementById("gif");
      gif.style.display = "block";
      setTimeout(() => {
        gif.style.display = "none";
      }, 2000);
    });

    tdEditor.appendChild(select);
    tr.appendChild(tdData);
    tr.appendChild(tdEditor);
    tbody.appendChild(tr);
  }
}

mesSelect.addEventListener("change", () => {
  mes = parseInt(mesSelect.value);
  atualizarCalendario();
});

carregandoInfo();
