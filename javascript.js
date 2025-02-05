import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "DOMÍNIO.firebaseapp.com",
  databaseURL: "https://maxsystem-9fc4e-default-rtdb.firebaseio.com",
  projectId: "PROJETO_ID",
  storageBucket: "BUCKET.appspot.com",
  messagingSenderId: "MENSAGEIRO_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider)
  .then((result) => {
    alert("Logado com sucesso, " + result.user.displayName);
  })
  .catch((error) => {
    console.error("Erro ao logar:", error);
  });

const escalaRef = ref(database, "escala");
let escala = {};

onValue(escalaRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    escala = data;
    atualizarCalendario();
  }
});

function salvarEscala() {
  console.log("Salvando escala no Firebase:", escala);
  set(escalaRef, escala)
    .then(() => {
      console.log("Escala salva com sucesso.");
    })
    .catch((error) => {
      console.error("Erro ao salvar a escala:", error);
    });
  atualizarCalendario();
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
    select.addEventListener("change", () => {
      escala[`${dia}-${mes}`] = select.value;
      salvarEscala();
    });

    tdEditor.appendChild(select);
    tr.appendChild(tdData);
    tr.appendChild(tdEditor);
    tbody.appendChild(tr);
  }
}

set(ref(database, "test"), { message: "Hello, Firebase!" })
  .then(() => console.log("Teste bem-sucedido: Dados escritos no Firebase."))
  .catch((error) => console.error("Erro no teste de conexão:", error));
