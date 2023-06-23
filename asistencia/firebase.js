import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, getDoc, updateDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

// Configuración de Firebase de tu aplicación web
const firebaseConfig1 = {
  apiKey: "AIzaSyADSY3NjfujHqJu9FghRE1nS1jMLK1JqjI",
  authDomain: "eng-electron-369621.firebaseapp.com",
  databaseURL: "https://eng-electron-369621-default-rtdb.firebaseio.com",
  projectId: "eng-electron-369621",
  storageBucket: "eng-electron-369621.appspot.com",
  messagingSenderId: "489368159497",
  appId: "1:489368159497:web:332d1c1fce61604bc53fd8",
  measurementId: "G-4DYPNDGD4E"
};


// INICIAR FIREBASE 1
export const app1 = initializeApp(firebaseConfig1, "App2");
export const db1 = getFirestore(app2);



// GUARDAR 1 ASISTENCIA
export const guardarAsistencia = (asistencia) => addDoc(collection(db1, 'asistencia'), asistencia);

// ELIMINAR 1 ASISTENCIA
export const eliminarAsistencia = (id) => deleteDoc(doc(db1, 'asistencia', id));

// TRAER 1 ASISTENCIA
export const traerAsistencia = (id) => getDoc(doc(db1, 'asistencia', id));

// ACTUALIZAR 1 ASISTENCIA
export const actualizarAsistencia = (id, asistencia) => updateDoc(doc(db1, 'asistencia', id), asistencia);

// CUANDO SE TRAEN ASISTENCIAS ?????
export const onGetAsistencias = (callback) => onSnapshot(collection(db1, 'asistencia'), callback);

