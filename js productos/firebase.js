import {initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import {getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, getDoc, updateDoc, getDocs, } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'

// Configuración de Firebase de tu aplicación web

const firebaseConfig2 = {
  apiKey: "AIzaSyDy0hm-IkvTjjmq6SfCsmEaiwTxSp6x8WE",
  authDomain: "fir-crud-ed9bc.firebaseapp.com",
  databaseURL: "https://fir-crud-ed9bc-default-rtdb.firebaseio.com",
  projectId: "fir-crud-ed9bc",
  storageBucket: "fir-crud-ed9bc.appspot.com",
  messagingSenderId: "96247123134",
  appId: "1:96247123134:web:7748ebb335cc45b12c22ef"
};

// INICIAR FIREBASE
export const app2 = initializeApp(firebaseConfig2, "App2");
export const db = getFirestore(app2);
// GUARDAR 1 TAREA
export const guardarTarea = (tareas) => addDoc(collection(db, 'tasks'), tareas)

// ELIMINAR 1 TAREA
export const eliminarTarea = (id) => deleteDoc(doc(db, 'tasks', id))

// TRAER 1 TAREA
export const traerTarea = (id) => getDoc(doc(db, 'tasks', id))

// ACTUALIZAR 1 TAREA
export const actualizarTarea = (id, tareas) => updateDoc(doc(db, 'tasks', id), tareas)

// CUANDO SE TRAEN TAREAS ?????
export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback)

/// ////////////////////////////////////////////////
/// ///////////////////////////////////////////////

export const getTotalTasksmaterial = async () => {
  const querySnapshot = await getDocs(collection(db, 'tasks'));
  const totalTasksmaterial = querySnapshot.size;
  return totalTasksmaterial;
};

document.addEventListener('DOMContentLoaded', () => {
  const divTotalTasksmaterial = document.getElementById('totalTasksmaterial');

  getTotalTasksmaterial().then((total) => {
    divTotalTasksmaterial.innerHTML = `${total}`;
  });
});

