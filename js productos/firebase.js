import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'

// Configuración de Firebase de tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyDy0hm-IkvTjjmq6SfCsmEaiwTxSp6x8WE",
  authDomain: "fir-crud-ed9bc.firebaseapp.com",
  databaseURL: "https://fir-crud-ed9bc-default-rtdb.firebaseio.com",
  projectId: "fir-crud-ed9bc",
  storageBucket: "fir-crud-ed9bc.appspot.com",
  messagingSenderId: "96247123134",
  appId: "1:96247123134:web:7748ebb335cc45b12c22ef"
};

// INICIAR FIREBASE
export const app = initializeApp(firebaseConfig)
export const db = getFirestore()

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

