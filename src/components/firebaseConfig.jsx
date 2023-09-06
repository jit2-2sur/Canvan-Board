import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/*
const firebaseConfig = {
  apiKey: "AIzaSyCQZhWR0jr12-YzThwO1k-Z469nV8LHl5k",
  authDomain: "canban-board-d2afe.firebaseapp.com",
  databaseURL: "https://canban-board-d2afe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "canban-board-d2afe",
  storageBucket: "canban-board-d2afe.appspot.com",
  messagingSenderId: "130821568473",
  appId: "1:130821568473:web:7dd26e4af2c62f53874bc8",
  measurementId: "G-PNGTL6HH88"
};*/
const firebaseConfig = {
  apiKey: "AIzaSyCnOcwOqI-LjSZddtPpSC23Tifhqs-KiJE",
  authDomain: "canban-project-final.firebaseapp.com",
  projectId: "canban-project-final",
  storageBucket: "canban-project-final.appspot.com",
  messagingSenderId: "688105607058",
  appId: "1:688105607058:web:4e409a02371d1e65d9fb4b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);