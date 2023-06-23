import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, getDoc, updateDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

// Configuración de Firebase de tu aplicación web

const firebaseConfig = {
  apiKey: "AIzaSyD_RuYqfhjoAYo0g0YEwL1ijBrZna9Sfio",
  authDomain: "chartjsproyect.firebaseapp.com",
  databaseURL: "https://chartjsproyect-default-rtdb.firebaseio.com",
  projectId: "chartjsproyect",
  storageBucket: "chartjsproyect.appspot.com",
  messagingSenderId: "527937462929",
  appId: "1:527937462929:web:d2234b4bf294436fb85530"
};

// INICIAR FIREBASE
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// GUARDAR 1 TAREA
export const guardarTarea = (tareas) => addDoc(collection(db, 'tasks'), tareas);

// ELIMINAR 1 TAREA
export const eliminarTarea = (id) => deleteDoc(doc(db, 'tasks', id));

// TRAER 1 TAREA
export const traerTarea = (id) => getDoc(doc(db, 'tasks', id));

// ACTUALIZAR 1 TAREA
export const actualizarTarea = (id, tareas) => updateDoc(doc(db, 'tasks', id), tareas);

// CUANDO SE TRAEN TAREAS
export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

export const getTotalGanancias = async () => {
  const querySnapshot = await getDocs(collection(db, 'tasks'));
  let totalGanancias = 0;

  querySnapshot.forEach((doc) => {
    const tarea = doc.data();
    totalGanancias += parseFloat(tarea.ganancias);
  });

  return totalGanancias;
};

document.addEventListener('DOMContentLoaded', async () => {
  const divTotalGanancias = document.getElementById('total-ganancias');

  const total = await getTotalGanancias();
  divTotalGanancias.innerText = `$${total}`;
});


