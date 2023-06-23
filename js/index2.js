import { onGetAsistencias, guardarAsistencia, eliminarAsistencia, traerAsistencia, actualizarAsistencia } from './firebase.js';
import { abrirModal, cerrarModal } from './modal/modal.js';

const taskForm = document.getElementById('task-form3');
const tasksContainer = document.getElementById('tasks-container3');

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async () => {
  onGetAsistencias((querySnapshot) => {
    tasksContainer.innerHTML = '';

    querySnapshot.forEach(async (doc) => {
      const asistencia = doc.data();

      const taskRow = document.createElement('tr');
      taskRow.innerHTML = `
        <td>${asistencia.fecha}</td>
        <td>${asistencia.idempleado}</td>
        <td>${asistencia.selectTareas}</td>
        <td>${asistencia.entrada}</td>
        <td>${asistencia.salida}</td>
       
        <td>
          <button class='btn btn-warning btn-edit' data-id="${doc.id}"><i class="fa-solid fa-paintbrush"></i></button>
          <button class='btn btn-danger btn-delete' data-id="${doc.id}"><i class="fa-solid fa-trash"></i></button>
        </td>`;

      
      tasksContainer.appendChild(taskRow);
    });

    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete');
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', async ({ target }) => {
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar estos datos?');
        if (confirmDelete) {
          try {
            const dataset = target.dataset;
            if (dataset && dataset.hasOwnProperty('id') && dataset.id !== "") {
              await eliminarAsistencia(dataset.id);
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
              }, 2000);
            } else {
              throw new Error('El objeto dataset o dataset.id es indefinido o está vacío.');
            }
          } catch (error) {
            console.error(error);
            // Mostrar mensaje de error al usuario
          }
        }
      });
    });

    const btnsEdit = tasksContainer.querySelectorAll('.btn-edit');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const taskId = e.target.dataset.id;
        if (taskId) {
          try {
            const doc = await traerAsistencia(taskId);
            const asistencia = doc.data();
            for (const key in asistencia) {
              if (Object.hasOwnProperty.call(asistencia, key)) {
                if (taskForm[`task-${key}`]) { // Verificar si el campo existe en el formulario
                  taskForm[`task-${key}`].value = asistencia[key];
                }
              }
            }
            editStatus = true;
            id = doc.id;
            taskForm['btn-task-form'].innerText = 'Actualizar';
            abrirModal();
          } catch (error) {
            console.error(error);
          }
        }
      });
    });
  });
});

let newData = {};

taskForm.addEventListener('input', (e) => {
  newData = { ...newData, [e.target.name]: e.target.value };
});

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    if (!editStatus) {
      if (Object.keys(newData).length > 0) {
        // Generar un ID aleatorio
        const randomId = Math.random().toString(36).substr(2, 9);
        newData.idempleado = randomId;

        await guardarAsistencia(newData);
      }
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
      await actualizarAsistencia(id, newData);
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
    console.error(error);
    // Mostrar mensaje de error al usuario
  }
});

const botonAgregarNuevo = document.getElementById('btn-agregar-nuevo');
const botonSalirModal = document.getElementById('btn-task-exit');

botonAgregarNuevo.addEventListener('click', abrirModal);
botonSalirModal.addEventListener('click', cerrarModal);


const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const rows = tasksContainer.querySelectorAll('tr');

  rows.forEach(row => {
    const columnToSearch = row.querySelector('td:nth-child(3)').innerText.toLowerCase(); // Indica el número de columna que se quiere buscar (en este caso, la tercera columna).

    if (columnToSearch.includes(query)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});

