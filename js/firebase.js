import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, getDoc, updateDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

// Configuración de Firebase de tu aplicación web
const firebaseConfig1 = {
  apiKey: 'AIzaSyAWMP63y4Pn2zVXswRsgp02Q5XuUJVWy6M',
  authDomain: 'crud-408cb.firebaseapp.com',
  projectId: 'crud-408cb',
  storageBucket: 'crud-408cb.appspot.com',
  messagingSenderId: '801041061477',
  appId: '1:801041061477:web:40cfb0da01aa0f1447188c'
};


// Configuración de Firebase de tu aplicación web
const firebaseConfig3 = {
  apiKey: "AIzaSyADSY3NjfujHqJu9FghRE1nS1jMLK1JqjI",
  authDomain: "eng-electron-369621.firebaseapp.com",
  databaseURL: "https://eng-electron-369621-default-rtdb.firebaseio.com",
  projectId: "eng-electron-369621",
  storageBucket: "eng-electron-369621.appspot.com",
  messagingSenderId: "489368159497",
  appId: "1:489368159497:web:332d1c1fce61604bc53fd8",
  measurementId: "G-4DYPNDGD4E"
};


// INICIAR FIREBASE 2
export const app3 = initializeApp(firebaseConfig3, "App3");
export const db1 = getFirestore(app3);


// INICIAR FIREBASE1
export const app1 = initializeApp(firebaseConfig1, "App1");
export const db = getFirestore(app1);

// GUARDAR 1 TAREA
export const guardarTarea = (tareas) => addDoc(collection(db, 'tasks'), tareas);


// ELIMINAR 1 TAREA
export const eliminarTarea = (id) => deleteDoc(doc(db, 'tasks', id));

// TRAER 1 TAREA
export const traerTarea = (id) => getDoc(doc(db, 'tasks', id));

// ACTUALIZAR 1 TAREA
export const actualizarTarea = (id, tareas) => updateDoc(doc(db, 'tasks', id), tareas);

// CUANDO SE TRAEN TAREAS ?????
export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

/// ////////////////////////////////////////////////
/// ///////////////////////////////////////////////
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


export const getTotalTasks = async () => {
  const querySnapshot = await getDocs(collection(db, 'tasks'));
  const totalTasks = querySnapshot.size;
  return totalTasks;
};

document.addEventListener('DOMContentLoaded', () => {
  const divTotalTasks = document.getElementById('totalTasks');

  getTotalTasks().then((total) => {
    divTotalTasks.innerHTML = ` ${total}`;
  });
});



const selectTareasField = document.getElementById('selectTareas');

// Obtener las tareas desde Firebase
onGetTasks((querySnapshot) => {
  selectTareasField.innerHTML = ''; // Limpiar el select antes de agregar opciones

  querySnapshot.forEach((doc) => {
    const tarea = doc.data();
    const option = document.createElement('option');
    option.text = `${tarea.nombre} ${tarea.apellidop}`;
    selectTareasField.add(option);
  });
});
