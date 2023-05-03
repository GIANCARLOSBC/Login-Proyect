const lunesInput = document.getElementById('lunes');
    const martesInput = document.getElementById('martes');
    const miercolesInput = document.getElementById('miercoles');
    const juevesInput = document.getElementById('jueves');
    const viernesInput = document.getElementById('viernes');
    const calcularTotalBtn = document.getElementById('calcular-total');
    const chartCanvas = document.getElementById('chart');
  
    const chart = new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        datasets: [{
          label: 'Ganancias Totales',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
          }]
          },
          options: {
          scales: {
          y: {
          beginAtZero: true
          }
          }
          }
          });
  
          function updateChart() {
          chart.data.datasets[0].data = [lunesInput.value, martesInput.value, miercolesInput.value, juevesInput.value, viernesInput.value];
          chart.update();
          }
  
          function calcularTotal() {
            const total = parseInt(lunesInput.value) + parseInt(martesInput.value) + parseInt(miercolesInput.value) + parseInt(juevesInput.value) + parseInt(viernesInput.value);
            chart.data.datasets[0].label = `Ganancias Totales: ${total}`;
            chart.update();
          }
  
          lunesInput.addEventListener('input', updateChart);
          martesInput.addEventListener('input', updateChart);
          miercolesInput.addEventListener('input', updateChart);
          juevesInput.addEventListener('input', updateChart);
          viernesInput.addEventListener('input', updateChart);
  
          calcularTotalBtn.addEventListener('click', calcularTotal);

          function calcularGanancias() {
            // Obtener los valores de los inputs y convertirlos a números enteros
            const lunes = parseInt(lunesInput.value);
            const martes = parseInt(martesInput.value);
            const miercoles = parseInt(miercolesInput.value);
            const jueves = parseInt(juevesInput.value);
            const viernes = parseInt(viernesInput.value);
          
            // Calcular las ganancias diarias y totales
            const gananciasDiarias = [lunes, martes, miercoles, jueves, viernes];
            const gananciasTotales = gananciasDiarias.reduce((total, ganancias) => total + ganancias);
          
            // Actualizar los datos del gráfico
            chart.data.datasets[0].data = gananciasDiarias;
            chart.data.datasets[0].label = `Ganancias Totales: $${gananciasTotales}`;
          
            // Actualizar el gráfico
            chart.update();
          }