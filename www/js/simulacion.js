document.addEventListener('DOMContentLoaded', function () {
    const acumuladaButton = document.getElementById('simulate-acumulada');
    const reiniciar = document.getElementById('reiniciar');
    const resultsAcumulada1 = document.getElementById('acumulada-1');
    const resultsAcumulada2 = document.getElementById('acumulada-2');
    const tablaSimulacion = document.getElementById('simulacion');
    const barrasContainer = document.getElementById('barras-container');

    const simulateButton = document.getElementById('simulate-button');
    const resultsContainer = document.getElementById('results');
    const chartContainer = document.getElementById('chart-container');

    acumuladaButton.addEventListener('click', function () {
        acumuladaButton.classList.add('invisible');
        reiniciar.classList.remove('invisible');

        const gananciasPorDia = [];

        const tabla1 = document.getElementById('tabla1');
        const filas1 = tabla1.getElementsByTagName('tr');

        const tablaLimites1 = document.createElement('table');
        tablaLimites1.classList.add('table', 'table-striped');
        resultsAcumulada1.classList.add('results');
        const theadLimites1 = document.createElement('thead');
        const tbodyLimites1 = document.createElement('tbody');

        const encabezadoLimites1 = document.createElement('tr');
        encabezadoLimites1.innerHTML = '<th>Demanda</th><th>Limite inferior</th><th>Limite superior</th>';
        theadLimites1.appendChild(encabezadoLimites1);
        tablaLimites1.appendChild(theadLimites1);

        barrasContainer.classList.add('results');
        barrasContainer.innerHTML = '<canvas id="misBarras" width="400" height="100"></canvas>';

        let limiteInferiorAnterior1 = 0;
        const limitesInfoMap = [];
        for (let i = 1; i < filas1[0].cells.length; i++) {
            const demanda = filas1[0].cells[i].textContent;
            const probabilidad = parseFloat(filas1[1].cells[i].textContent);

            const nuevaFila = document.createElement('tr');
            const limiteInferior = (i === 0) ? 0 : limiteInferiorAnterior1;
            const limiteSuperior = limiteInferior + probabilidad;

            limitesInfoMap.push({ limiteInferior, limiteSuperior, demanda });

            nuevaFila.innerHTML = `<td>${demanda}</td><td>${limiteInferior.toFixed(2)}</td><td>${limiteSuperior.toFixed(2)}</td>`;
            tbodyLimites1.appendChild(nuevaFila);

            limiteInferiorAnterior1 = limiteSuperior;
        }
        tablaLimites1.appendChild(tbodyLimites1);
        resultsAcumulada1.appendChild(tablaLimites1);

        // Función para obtener la demanda asociada a un número aleatorio
        function obtenerDemanda1() {
            // Generar un número aleatorio entre 0 y 1
            const numeroAleatorio = Math.random();

            // Buscar en el mapa el rango al que pertenece el número aleatorio
            for (const { limiteInferior, limiteSuperior, demanda } of limitesInfoMap) {
                if (numeroAleatorio >= limiteInferior && numeroAleatorio < limiteSuperior) {
                    console.log("demanda: " + demanda);
                    return { demanda, numeroAleatorio };
                }
            }

            // En caso de no encontrar un rango (esto debería ser muy raro)
            return "No se encontró demanda para el número aleatorio";
        }

        const tablaSimulacion1 = document.createElement('table');
        tablaSimulacion1.classList.add('table', 'table-striped');
        tablaSimulacion.classList.add('results');

        const theadSimulacion1 = document.createElement('thead');
        const tbodyLSimulacion1 = document.createElement('tbody');

        const encabezadoSimulacion1 = document.createElement('tr');
        encabezadoSimulacion1.innerHTML = '<th>Dia</th><th>Aleatorio</th><th>Demanda (uds.)</th><th>Cantidad Compra (uds.)</th><th>Venta realizada (uds.)</th><th>Revistas no vendidas (uds.)</th><th>Utilidad (Bs.)</th>';

        theadSimulacion1.appendChild(encabezadoSimulacion1);
        tablaSimulacion1.appendChild(theadSimulacion1);

        // Realizar diez corridas y mostrar la demanda asociada a cada número aleatorio
        for (let i = 0; i < 10; i++) {
            const { demanda, numeroAleatorio } = obtenerDemanda1();
            const nuevaFila = document.createElement('tr');
            const minimo = Math.min(9, demanda);
            const noVendidos = 9 - minimo;
            const utilidad = (1.5 * 9) + (2 * minimo) - (noVendidos * 0.9);
            nuevaFila.innerHTML = `<td>${i + 1}</td><td>${numeroAleatorio}</td><td>${demanda}</td><td>9</td><td>${minimo}</td><td>${noVendidos}</td><td>${utilidad.toFixed(2)}</td>`;
            tbodyLSimulacion1.appendChild(nuevaFila);
            console.log(`Corrida ${i + 1}: Demanda ${demanda}`);
            gananciasPorDia.push(utilidad.toFixed(2));
        }
        tablaSimulacion1.appendChild(tbodyLSimulacion1);
        tablaSimulacion.appendChild(tablaSimulacion1);

        /* #################################### */

        const tabla2 = document.getElementById('tabla2');
        const filas2 = tabla2.getElementsByTagName('tr');

        const tablaLimites2 = document.createElement('table');
        tablaLimites2.classList.add('table', 'table-striped');
        resultsAcumulada2.classList.add('results');
        const theadLimites2 = document.createElement('thead');
        const tbodyLimites2 = document.createElement('tbody');

        const encabezadoLimites2 = document.createElement('tr');
        encabezadoLimites2.innerHTML = '<th>Demanda</th><th>Limite inferior</th><th>Limite superior</th>';
        theadLimites2.appendChild(encabezadoLimites2);
        tablaLimites2.appendChild(theadLimites2);

        let limiteInferiorAnterior2 = 0;
        for (let i = 1; i < filas2[0].cells.length; i++) {
            const demanda = filas2[0].cells[i].textContent;
            const probabilidad = parseFloat(filas2[1].cells[i].textContent);

            const nuevaFila = document.createElement('tr');
            const limiteInferior = (i === 0) ? 0 : limiteInferiorAnterior2;
            const limiteSuperior = limiteInferior + probabilidad;

            limitesInfoMap.push({ limiteInferior, limiteSuperior, demanda });

            nuevaFila.innerHTML = `<td>${demanda}</td><td>${limiteInferior.toFixed(2)}</td><td>${limiteSuperior.toFixed(2)}</td>`;
            tbodyLimites2.appendChild(nuevaFila);

            limiteInferiorAnterior2 = limiteSuperior;
        }

        tablaLimites2.appendChild(tbodyLimites2);
        resultsAcumulada2.appendChild(tablaLimites2);

        // Función para obtener la demanda asociada a un número aleatorio
        function obtenerDemanda2() {
            // Generar un número aleatorio entre 0 y 1
            const numeroAleatorio = Math.random();

            // Buscar en el mapa el rango al que pertenece el número aleatorio
            for (const { limiteInferior, limiteSuperior, demanda } of limitesInfoMap) {
                if (numeroAleatorio >= limiteInferior && numeroAleatorio < limiteSuperior) {
                    console.log("demanda: " + demanda);
                    return { demanda, numeroAleatorio };
                }
            }

            // En caso de no encontrar un rango (esto debería ser muy raro)
            return "No se encontró demanda para el número aleatorio";
        }

        // Realizar diez corridas y mostrar la demanda asociada a cada número aleatorio
        for (let i = 0; i < 20; i++) {
            const { demanda, numeroAleatorio } = obtenerDemanda2();
            const nuevaFila = document.createElement('tr');
            const minimo = Math.min(9, demanda);
            const noVendidos = 9 - minimo;
            const utilidad = (1.2 * 9) + (2 * minimo) - (noVendidos * 0.6);
            nuevaFila.innerHTML = `<td>${i + 11}</td><td>${numeroAleatorio}</td><td>${demanda}</td><td>9</td><td>${minimo}</td><td>${noVendidos}</td><td>${utilidad.toFixed(2)}</td>`;
            tbodyLSimulacion1.appendChild(nuevaFila);
            console.log(`Corrida ${i + 11}: Demanda ${demanda}`);
            gananciasPorDia.push(utilidad.toFixed(2));
        }

        tablaSimulacion1.appendChild(tbodyLSimulacion1);
        tablaSimulacion.appendChild(tablaSimulacion1);

        // Crear y mostrar el gráfico de barras
        createBarSimulacion(gananciasPorDia);
    });

    function createBarSimulacion(data) {
        const ctx = document.getElementById('misBarras').getContext('2d');
        const misBarras = new Chart(ctx, {
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




    /** ####################### **/

    simulateButton.addEventListener('click', function () {
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

            const gananciaHora = ventasPorHora * 2.5; // Suponiendo que cada revista se vende a $2.5
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
