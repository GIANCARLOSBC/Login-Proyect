import { onGetTasks, guardarTarea, eliminarTarea, traerTarea, actualizarTarea, getTotalGanancias } from './firebase.js';
import { abrirModal, cerrarModal } from './modal/modal.js';

const taskForm = document.getElementById('task-form2');
const tasksContainer = document.getElementById('tasks-container2');
const chartCanvas = document.getElementById('chartCanvas');

let editStatus = false;
let id = '';
let chart = null;

function actualizarGrafico(data, labels) {
  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.update();
}

document.addEventListener('DOMContentLoaded', async () => {
  // CUANDO SE TRAEN LAS TAREAS
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = '';
    const data = [];
    const labels = [];

    // Definir el objeto de orden del abecedario
    const alphabetOrder = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
      j: 10,
      k: 11,
      l: 12,
      m: 13,
      n: 14,
      o: 15,
      p: 16,
      q: 17,
      r: 18,
      s: 19,
      t: 20,
      u: 21,
      v: 22,
      w: 23,
      x: 24,
      y: 25,
      z: 26,
    };

    querySnapshot.forEach((doc) => {
      const tarea = doc.data();

      tasksContainer.innerHTML += `
        <tr>
          <td>${tarea.mes}</td>
          <td>$${tarea.ganancias}</td>
          <td>${tarea.hora}</td>
          <td>
            <button class='btn btn-warning btn-edit' data-id="${doc.id}"><i class="fa-solid fa-paintbrush"></i></button>
            <button class='btn btn-danger btn-delete' data-id="${doc.id}"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>`;

      // Agregar la letra y la ganancia a los datos y las etiquetas del gráfico
      data.push(parseFloat(tarea.ganancias));
      labels.push(tarea.mes.toLowerCase());
    });

    // Ordenar las letras por su posición en el abecedario
    labels.sort((a, b) => alphabetOrder[a] - alphabetOrder[b]);

    // Destruir el gráfico existente
    if (chart) {
      chart.destroy();
    }

    // Crear el gráfico utilizando Chart.js
    const colors = [
      'rgba(255, 206, 86, 0.2)', // Amarillo
      'rgba(255, 99, 132, 0.2)', // Rojo
      'rgba(75, 192, 192, 0.2)', // Verde
      // Agrega más colores aquí
    ];

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Ganancias',
          data: data,
          backgroundColor: labels.map((letter, index) => colors[index % colors.length]),
          borderColor: labels.map((letter, index) => colors[index % colors.length]),
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const chartContext = chartCanvas.getContext('2d');
    chart = new Chart(chartContext, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });

    // Llamar a la función para actualizar el gráfico
    actualizarGrafico(data, labels);

    // CLICK EN ELIMINAR TAREA
    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete');

    btnsDelete.forEach((btn) =>
      btn.addEventListener('click', async (e) => {
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar estos datos?');
        if (confirmDelete) {
          try {
            const taskId = e.target.getAttribute('data-id');
            if (taskId) {
              await eliminarTarea(taskId);
              setTimeout(() => {
                Toastify({
                  text: 'Borrado exitosamente',
                  duration: 3000,
                  close: true,
                  gravity: 'bottom',
                  position: 'right',
                  style: {
                    background: 'rgb(102, 23, 29)',
                  },
                  stopOnFocus: true,
                  className: 'toastify-success',
                }).showToast();
              }, 2000);
            } else {
              throw new Error('El atributo data-id no está definido o está vacío.');
            }
          } catch (error) {
            console.error(error);
          }
        }
      })
    );


    // CLICK EN EDITAR TAREA
    const btnsEdit = tasksContainer.querySelectorAll('.btn-edit');

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

    // Calcular el total de ganancias
    let totalGanancias = data.reduce((total, ganancia) => total + ganancia, 0);

    // Reiniciar el gráfico y el total de ganancias a 0 si se agregan todas las letras del abecedario
    if (labels.length === 26) {
      data.length = 0;
      labels.length = 0;
      totalGanancias = 0;
    }

    // Mostrar el total en el div
    const totalGananciasDiv = document.getElementById('total-ganancias');
    totalGananciasDiv.innerText = `Total de ganancias: $${totalGanancias}`;
  });

  // CUANDO SE ENVÍA EL FORMULARIO DE TAREA
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const mes = taskForm['mes'].value;
    const ganancias = taskForm['ganancias'].value;

    if (!editStatus) {
      // Guardar una nueva tarea
      await guardarTarea({ mes: mes, ganancias: ganancias, hora: new Date().toLocaleTimeString() });
      Toastify({
        text: 'Datos Guardados',
        duration: 3000,
        close: true,
        gravity: 'bottom',
        position: 'right',
        style: {
          background: 'green',
        },
        stopOnFocus: true,
        className: 'toastify-success',
      }).showToast();
    } else {
      // Actualizar la tarea existente
      await actualizarTarea(id, { mes: mes, ganancias: ganancias });

      Toastify({
        text: 'Tarea actualizada correctamente',
        duration: 3000,
        close: true,
        gravity: 'bottom',
        position: 'right',
        style: {
          background: 'blue',
        },
        stopOnFocus: true,
        className: 'toastify-success',
      }).showToast();

      editStatus = false;
      id = '';
      taskForm['btn-task-form'].innerText = 'Guardar';
    }

    taskForm.reset();
    cerrarModal();
  });
});


// Otras funciones, importaciones, etc.


/* ///ESCUCHADORES DE EVENTOS/////////////////////////////// */
const botonAgregarNuevo = document.getElementById('btn-agregar-nuevo');
const botonSalirModal = document.getElementById('btn-task-exit');

botonAgregarNuevo.addEventListener('click', abrirModal);
botonSalirModal.addEventListener('click', cerrarModal);

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();

  const rows = tasksContainer.querySelectorAll('tr');

  rows.forEach((row) => {
    const mes = row.querySelector('td:nth-child(1)').innerText.toLowerCase();
    const ganancias = row.querySelector('td:nth-child(2)').innerText.toLowerCase();
    const hora = row.querySelector('td:nth-child(3)').innerText.toLowerCase();

    const matches = [mes, ganancias, hora].filter((column) => column.includes(query));

    if (matches.length > 0) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});
