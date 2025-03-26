import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBw4J5yRfyJcmIHibuDvgDPxTHbeFG2vi8",
    authDomain: "banco-de-dados-c1bf1.firebaseapp.com",
    databaseURL: "https://banco-de-dados-c1bf1-default-rtdb.firebaseio.com",
    projectId: "banco-de-dados-c1bf1",
    storageBucket: "banco-de-dados-c1bf1.firebasestorage.app",
    messagingSenderId: "140489049491",
    appId: "1:140489049491:web:7402193a3c779942731466",
    measurementId: "G-86G2ZJXEJV"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app); 

export { db };
