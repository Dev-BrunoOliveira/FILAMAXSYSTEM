import {ref, set, push, get} from "firebase/database";
import { db } from "./firebaseConfig.js";


let escala = {};

async function setScala() {
  alert('Salvar')
  return
  const escalaRef = push(ref(db, `Escala`));
  await set(escalaRef, {
    mes: "Fevereiro",
    editor: "Bruno",
  });
}

const editores = [
  " ",
  "Bruno",
  "Ronei",
  "Flávia",
  "Chico",
  "João",
  "Maria",
  "Pedro",
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
const diasNoMes = 31;



escala = JSON.parse(localStorage.getItem("escalaEditores")) || {};

meses.forEach((nome, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = nome;
  mesSelect.appendChild(option);
});

mesSelect.value = mes;

function salvarEscala() {
  let escalaArray = [];

  for (let dia = 1; dia <= diasNoMes; dia++) {
    if (escala[`${dia}-${mes}`]) {
      escalaArray.push({
        dia: dia,
        mes: meses[mes],
        editor: escala[`${dia}-${mes}`],
      });
    }
  }

  console.log("Escala formatada:", escalaArray);

  setScala()

  localStorage.setItem("escalaEditores", JSON.stringify(escala));
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
      option.textContent = editor || "Nenhum";
      select.appendChild(option);
    });

    select.value = escala[`${dia}-${mes}`] || "";
    tdEditor.style.color = select.value ? "#50C878" : "red";

    select.addEventListener("change", () => {
      escala[`${dia}-${mes}`] = select.value;
      salvarEscala();
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

atualizarCalendario();
