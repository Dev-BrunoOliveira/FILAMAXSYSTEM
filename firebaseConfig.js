import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCj-VOBFaUClFF35MTUTkvPu-Nd6Bdww9Y",
  authDomain: "maxsystem-9fc4e.firebaseapp.com",
  databaseURL: "https://maxsystem-9fc4e-default-rtdb.firebaseio.com",
  projectId: "maxsystem-9fc4e",
  storageBucket: "maxsystem-9fc4e.firebasestorage.app",
  messagingSenderId: "164548609844",
  appId: "1:164548609844:web:2a346e48bcf320b3488761",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
