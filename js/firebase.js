import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, getDoc, updateDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'


// Configuración de Firebase de tu aplicación web
const firebaseConfig1 = {
  apiKey: 'AIzaSyAWMP63y4Pn2zVXswRsgp02Q5XuUJVWy6M',
  authDomain: 'crud-408cb.firebaseapp.com',
  projectId: 'crud-408cb',
  storageBucket: 'crud-408cb.appspot.com',
  messagingSenderId: '801041061477',
  appId: '1:801041061477:web:40cfb0da01aa0f1447188c'
}

// INICIAR FIREBASE
export const app1 = initializeApp(firebaseConfig1, "App1");
export const db = getFirestore(app1);

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

export const getTotalTasks = async () => {
  const querySnapshot = await getDocs(collection(db, 'tasks'))
  const totalTasks = querySnapshot.size
  return totalTasks
}

document.addEventListener('DOMContentLoaded', () => {
  const divTotalTasks = document.getElementById('totalTasks')

  getTotalTasks().then((total) => {
    divTotalTasks.innerHTML = ` ${total}`
  })
})
