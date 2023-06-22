import { onGetTasks, guardarTarea, eliminarTarea, traerTarea, actualizarTarea } from './firebase.js'
import { abrirModal, cerrarModal } from './modal/modal.js'

const taskForm = document.getElementById('task-form1')
const tasksContainer = document.getElementById('tasks-container1')

let editStatus = false
let id = ''

window.addEventListener('DOMContentLoaded', async () => {
  // CUANDO SE TRAEN LAS TAREAS
  
  onGetTasks((querySnapshot) => { // querySnapshot contiene todas las tareas guardadas
    const fragment = document.createDocumentFragment(); // Crea un fragmento en memoria

    let total = 0

    querySnapshot.forEach((doc) => {
      const tarea = doc.data()

      let stockClass = '';

      if (tarea.stock <= 25) {
        stockClass = 'btn-danger';
      } else if (tarea.stock < 50) {
        stockClass = 'btn-warning';
      } else {
        stockClass = 'btn-success';
      }

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${tarea.material}</td>
        <td>${tarea.codigo}</td>
        <td>${tarea.descripcion}</td>
        <td><button class='btn ${stockClass}' id="boton1">${tarea.stock}</button></td>
        <td>${tarea.preciocompra}</td>
        <td>${tarea.precioventa}</td>
        <td>${tarea.fecha}</td>
        <td>
          <button class='btn btn-warning btn-edit' data-id="${doc.id}"><i class="fa-solid fa-paintbrush"></i></button>
          <button class='btn btn-danger btn-delete' data-id="${doc.id}"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      
      fragment.appendChild(row); // Agrega la fila al fragmento en memoria
      total++;
    });

    tasksContainer.innerHTML = ''; // Limpia el contenedor antes de agregar elementos
    tasksContainer.appendChild(fragment); // Agrega todos los elementos del fragmento al DOM de una sola vez

    document.getElementById('totalTasksmaterial').innerText = total.toString()
    
    // CLICK EN ELIMINAR TAREA
    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete');

    btnsDelete.forEach((btn) =>
    btn.addEventListener('click', async function() {
      const confirmDelete = confirm('¿Estás seguro de que deseas eliminar estos datos?');
      if (confirmDelete) {
        try {
          const dataset = this.dataset;
          if (dataset && dataset.hasOwnProperty('id') && dataset.id !== "") {
            await eliminarTarea(dataset.id);
            setTimeout(() => {
              Toastify({
                text: 'Borrado exitosamente',
                duration: 3000,
                close: true,
                gravity: 'bottom',
                position: 'right',
                style: {
                  background: "rgb(102, 23, 29)",
                },
                stopOnFocus: true,
                className: 'toastify-success'
              }).showToast();
            }, 2000); // delay of 2 seconds
          } else {
            throw new Error('El objeto dataset o dataset.id es indefinido o está vacío.');
          }
        } catch (error) {
          console.error(error);
        }
      }
    })
  );


    // CLICK EN EDITAR TAREA
    const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')

    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const taskId = e.target.dataset.id;
        if (taskId) {
          traerTarea(taskId)
            .then((doc) => {
              const task = doc.data();
              for (const key in task) {
                if (taskForm[`task-${key}`] && taskForm[`task-${key}`].type !== 'file') {
                  taskForm[`task-${key}`].value = task[key];
                }
              }
              editStatus = true;
              id = doc.id;
              taskForm['btn-task-form'].innerText = 'Actualizar';
              abrirModal();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    });
    
  });
});

// LLENAR EL FORMULARIO ///////////////////////////////////////////
let newData = {}

taskForm.addEventListener('input', async (e) => {
  newData = { ...newData, [e.target.name]: e.target.value }
});

// ENVIAR EL FORMULARIO ///////////////////////////////////////////
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    if (!editStatus) {
      Object.keys(newData).length > 0 && (await guardarTarea(newData));
      Toastify({
        text: 'Datos Guardados',
        duration: 3000,
        close: true,
        gravity: 'bottom',
        position: 'right',
        style: {
          background: "green",
        },
        stopOnFocus: true,
        className: 'toastify-success'
      }).showToast();
    } else {
      await actualizarTarea(id, newData);
      Toastify({
        text: 'Tarea actualizada correctamente',
        duration: 3000,
        close: true,
        gravity: 'bottom',
        position: 'right',
        style: {
          background: "green",
        },
        stopOnFocus: true,
        className: 'toastify-success'
      }).showToast();

      editStatus = false;
      id = '';
      taskForm['btn-task-form'].innerText = 'Guardar';
    }

    newData = {};
    taskForm.reset();
    cerrarModal();
  } catch (error) {
    throw new Error(error);
  }
});


/* ///ESCUCHADORES DE EVENTOS/////////////////////////////// */
const botonAgregarNuevo = document.getElementById('btn-agregar-nuevo');
const botonSalirModal = document.getElementById('btn-task-exit');

botonAgregarNuevo.addEventListener('click', abrirModal);
botonSalirModal.addEventListener('click', cerrarModal);

const searchInput = document.getElementById('search-input');

let searchTimeoutId = null;

searchInput.addEventListener('input', () => {
  clearTimeout(searchTimeoutId);

  searchTimeoutId = setTimeout(() => {
    const query = searchInput.value.toLowerCase();
    const rows = tasksContainer.querySelectorAll('tr');

    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      const shouldHide = !text.includes(query);
      row.classList.toggle('hidden', shouldHide);
    });
  }, 300); // Espera 300 milisegundos después de la última entrada del usuario antes de realizar la búsqueda
});

// Inicialmente oculta las filas que no coinciden con la búsqueda
const query = searchInput.value.toLowerCase();
const rows = tasksContainer.querySelectorAll('tr');

rows.forEach(row => {
  const text = row.innerText.toLowerCase();
  const shouldHide = !text.includes(query);
  row.classList.toggle('hidden', shouldHide);
});
