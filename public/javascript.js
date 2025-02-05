const editores = ["Bruno", "Rhenan", "Flávia", "Andressa"];
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

let escala = JSON.parse(localStorage.getItem("escalaEditores")) || {};

meses.forEach((nome, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = nome;
  mesSelect.appendChild(option);
});

mesSelect.value = mes;

function salvarEscala() {
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
      option.textContent = editor;
      select.appendChild(option);
    });

    select.value = escala[`${dia}-${mes}`] || "";

    if (!escala[`${dia}-${mes}`]) {
      tdEditor.style.color = "red";
    } else {
      tdEditor.style.color = "#50C878";
    }

    select.addEventListener("change", () => {
      escala[`${dia}-${mes}`] = select.value;
      salvarEscala();
      tdEditor.style.color = "#50C878";
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

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAwd8QvJP7phuPR14Sbgap4rbHC79ln6ms",
  authDomain: "fila-de-editores-d7b95.firebaseapp.com",
  projectId: "fila-de-editores-d7b95",
  storageBucket: "fila-de-editores-d7b95.firebasestorage.app",
  messagingSenderId: "508929563154",
  appId: "1:508929563154:web:bcf2a2bfc3e5b5d82416cb",
  measurementId: "G-1E7V6PPZYX",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

setTimeout(function () {
  auth.signWithPopup(provider);
}, 3000);

auth.onAuthStateChanged((val) => {
  if (val) {
    alert("Logado com sucesso" + val.displayName);
    console.log(val);
  }
});

<form>
    <imput type="text" name="tarefa"/>
    <imput type="submit" />
</form>

const form = document.querySelector('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    alert('cadastrado com sucesso');
})