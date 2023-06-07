import { onGetTasks, guardarTarea, eliminarTarea, traerTarea, actualizarTarea } from './firebase.js'
import { abrirModal, cerrarModal } from './modal/modal.js'
const taskForm = document.getElementById('task-form')
const tasksContainer = document.getElementById('tasks-container')

let editStatus = false
let id = ''

window.addEventListener('DOMContentLoaded', async () => {
  // CUANDO SE TRAEN LAS TAREAS
  
  onGetTasks((querySnapshot) => { // querySnapshot contiene todas las tareasguardadas
    tasksContainer.innerHTML = ''

    let total = 0

    querySnapshot.forEach((doc) => {
      const tarea = doc.data()
      

      tasksContainer.innerHTML += `
        <tr>
          <td>${tarea.nombre}</td>
          <td>${tarea.apellidop}</td>
          <td>${tarea.apellidom}</td>
          <td>${tarea.telefono}</td>
          <td>${tarea.email}</td>
          <td>${tarea.run}</td>
          <td>${tarea.salario}</td>
          <td>
            <button class=' btn btn-warning btn-edit' data-id="${doc.id}"><i class="fa-solid fa-paintbrush"></i></button>
            <button class=' btn btn-danger btn-delete' data-id="${doc.id}"><i class="fa-solid fa-trash"></i></button>
            


    
          </td>
        </tr>`

        total++;
        
        
        
    })

    document.getElementById('totalTasks').innerText = total.toString()
    

    // CLICK EN ELIMINAR TAREA
    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete');

    btnsDelete.forEach((btn) =>
      btn.addEventListener('click', async ({ target }) => {
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar estos datos?');
        if (confirmDelete) {
          try {
            const dataset = target.dataset;
            if (dataset && dataset.id) {
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
              throw new Error('El objeto dataset o dataset.id es indefinido.');
            }
          } catch (error) {
            throw new Error(error);
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
                if (Object.hasOwnProperty.call(task, key)) {
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
  })
  })

  // LLENAR EL FORMULARIO ///////////////////////////////////////////
  let newData = {}

  taskForm.addEventListener('input', async (e) => {
    newData = { ...newData, [e.target.name]: e.target.value }
  })

  // ENVIAR EL FORMULARIO ///////////////////////////////////////////
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault()

  try {
    if (!editStatus) {
      Object.keys(newData).length > 0 && (await guardarTarea(newData))
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
      await actualizarTarea(id, newData)
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

      editStatus = false
      id = ''
      taskForm['btn-task-form'].innerText = 'Guardar'
      
    }

    newData = {}
    taskForm.reset()
    cerrarModal()
  } catch (error) {
    throw new Error(error)
  }
  })

  /* ///ESCUCHADORES DE EVENTOS/////////////////////////////// */
  const botonAgregarNuevo = document.getElementById('btn-agregar-nuevo')
  const botonSalirModal = document.getElementById('btn-task-exit')

  botonAgregarNuevo.addEventListener('click', abrirModal)
  botonSalirModal.addEventListener('click', cerrarModal)


  const searchInput = document.getElementById('search-input');


  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    
    const rows = tasksContainer.querySelectorAll('tr');

    rows.forEach(row => {
      const nombre = row.querySelector('td:nth-child(1)').innerText.toLowerCase();
      const apellidop = row.querySelector('td:nth-child(2)').innerText.toLowerCase();
      const apellidom = row.querySelector('td:nth-child(3)').innerText.toLowerCase();
      const telefono = row.querySelector('td:nth-child(4)').innerText.toLowerCase();
      const run = row.querySelector('td:nth-child(5)').innerText.toLowerCase();
      const email = row.querySelector('td:nth-child(6)').innerText.toLowerCase();

      const matches = [nombre, apellidop, apellidom, telefono, run, email].filter(column => column.includes(query));

      if (matches.length > 0) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });







