document.addEventListener('DOMContentLoaded', function () {

    const simulateButton = document.getElementById('simulate-button');
    const resultsContainer = document.getElementById('results');
    const chartContainer = document.getElementById('chart-container');
    const resfin = document.getElementById('resfin');
    const precioRevista = parseInt(document.getElementById('precioRevista').value);

    /** ####################### **/

    simulateButton.addEventListener('click', function () {
        resfin.classList.remove('invisible');
        const numDias = parseInt(document.getElementById('numDias').value);
        const horasTrabajo = parseInt(document.getElementById('horasTrabajo').value);
        const probabilidadesInput = document.getElementById('probabilidades').value;

        // Convertir el input de probabilidades a un array de números
        const probabilidadesAcumuladas = probabilidadesInput.split(',').map(Number);

        // Limpiar resultados anteriores
        resultsContainer.innerHTML = '';
        chartContainer.innerHTML = '<canvas id="myChart" width="400" height="100"></canvas>';

        const gananciasPorDia = [];

        // Crear la tabla y sus elementos
        const tableElement = document.createElement('table');
        tableElement.classList.add('table', 'table-striped');
        const theadElement = document.createElement('thead');
        const tbodyElement = document.createElement('tbody');

        // Crear la fila de encabezado (thead) con títulos de columna
        const headerRow = document.createElement('tr');
        const thDia = document.createElement('th');
        thDia.textContent = 'Día';
        const thGanancia = document.createElement('th');
        thGanancia.textContent = 'Ganancia';
        const moneda = document.createElement('th');
        moneda.textContent = 'Moneda';
        headerRow.appendChild(thDia);
        headerRow.appendChild(thGanancia);
        headerRow.appendChild(moneda);
        theadElement.appendChild(headerRow);

        tableElement.appendChild(theadElement);

        tableElement.appendChild(tbodyElement);

        resultsContainer.appendChild(tableElement);
        let sumaGanancias = 0;

        for (let i = 0; i < numDias; i++) {
            const gananciaDia = simulateDay(horasTrabajo, probabilidadesAcumuladas);
            gananciasPorDia.push(gananciaDia);

            const rowElement = document.createElement('tr');

            const cellDia = document.createElement('td');
            cellDia.textContent = i + 1;

            const cellGanancia = document.createElement('td');
            cellGanancia.textContent = `${gananciaDia.toFixed(2)}`;

            const cellMoneda = document.createElement('td');
            cellMoneda.textContent = 'Bs.';

            rowElement.appendChild(cellDia);
            rowElement.appendChild(cellGanancia);
            rowElement.appendChild(cellMoneda);

            tbodyElement.appendChild(rowElement);
            sumaGanancias += gananciaDia;
        }
        const hr = document.createElement('hr');
        resultsContainer.appendChild(hr);
        const totalElement = document.createElement('p');
        totalElement.classList.add('text-right', 'font-weight-bold');
        totalElement.textContent = `Suma de ganancias: Bs. ${sumaGanancias.toFixed(2)}`;
        resultsContainer.appendChild(totalElement);

        // Crear y mostrar el gráfico de barras
        createBarChart(gananciasPorDia);
    });

    function simulateDay(hours, probabilidades) {
        let gananciaDia = 0;

        for (let j = 0; j < hours; j++) {
            // Simulación del vendedor de revistas utilizando las probabilidades acumuladas
            const ventaHora = Math.random(); // Número aleatorio entre 0 y 1

            let ventasPorHora = 0;

            for (let k = 0; k < probabilidades.length; k++) {
                if (ventaHora <= probabilidades[k]) {
                    ventasPorHora = k; // El índice representa la cantidad de revistas vendidas
                    break;
                }
            }

            const gananciaHora = ventasPorHora * precioRevista; // Suponiendo que cada revista se vende a bs. 2.5
            gananciaDia += gananciaHora;
        }

        return gananciaDia;
    }

    function createBarChart(data) {
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Array.from({ length: data.length }, (_, i) => `Dia ${i + 1}`),
                datasets: [{
                    label: 'Ganancia por Dia',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
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
    }
});
