import { onGetTasks, guardarTarea, eliminarTarea, traerTarea, actualizarTarea } from './firebase.js'
import { abrirModal, cerrarModal } from './modal/modal.js'
const taskForm = document.getElementById('task-form1')
const tasksContainer = document.getElementById('tasks-container1')




let editStatus = false
let id = ''

window.addEventListener('DOMContentLoaded', async () => {
  // CUANDO SE TRAEN LAS TAREAS
  
  onGetTasks((querySnapshot) => { // querySnapshot contiene todas las tareasguardadas
    tasksContainer.innerHTML = ''

   

    querySnapshot.forEach((doc) => {
      const tarea = doc.data()
      

      tasksContainer.innerHTML += `
        <tr>
          <td>${tarea.plato}</td>
          <td>${tarea.bebidas}</td>
          <td>${tarea.mesa}</td>
          <td>${tarea.ganancias}</td>
          <td>${tarea.fecha}</td>
          <td>
            <button class=' btn btn-warning btn-edit' data-id="${doc.id}"><i class="fa-solid fa-paintbrush"></i></button>
            <button class=' btn btn-danger btn-delete' data-id="${doc.id}"><i class="fa-solid fa-trash"></i></button>
            


    
          </td>
        </tr>`

   
        
        
    })


    

    // CLICK EN ELIMINAR TAREA
    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')

    btnsDelete.forEach((btn) =>
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar estos datos?')
        if (confirmDelete) {
        try {
          await eliminarTarea(dataset.id)
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
          
        } catch (error) {
          throw new Error(error)
      } }
      })
    )

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
      const platos = row.querySelector('td:nth-child(1)').innerText.toLowerCase();
      const bebidas = row.querySelector('td:nth-child(2)').innerText.toLowerCase();
      const mesa = row.querySelector('td:nth-child(3)').innerText.toLowerCase();
      const ganancias = row.querySelector('td:nth-child(4)').innerText.toLowerCase();
      const fecha = row.querySelector('td:nth-child(5)').innerText.toLowerCase();

      const matches = [platos, bebidas, mesa, ganancias, fecha].filter(column => column.includes(query));

      if (matches.length > 0) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });


  const query = searchInput.value.toLowerCase();

  const rows = tasksContainer.querySelectorAll('tr');

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    const shouldHide = !text.includes(query);
    row.style.display = shouldHide ? 'none' : 'table-row';
  });









