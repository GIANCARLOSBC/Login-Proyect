import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'

// Configuración de Firebase de tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyBOdPEILlM3Fr7ReGbgipEN1paPq2-xgyQ",
  authDomain: "inventario-23870.firebaseapp.com",
  projectId: "inventario-23870",
  storageBucket: "inventario-23870.appspot.com",
  messagingSenderId: "916194529330",
  appId: "1:916194529330:web:e46c2d1721e286fc4eac2b"
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

