document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('simulation-form');
    const simulateButton = document.getElementById('simulate-button');
    const resultsContainer = document.getElementById('results');
    const chartContainer = document.getElementById('chart-container');

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

        for (let i = 0; i < numDias; i++) {
            const gananciaDia = simulateDay(horasTrabajo, probabilidadesAcumuladas);
            gananciasPorDia.push(gananciaDia);

            // Crear un elemento de resultados para este día
            const resultElement = document.createElement('p');
            resultElement.textContent = `Dia ${i + 1}: Ganancia: Bs. ${gananciaDia.toFixed(2)}`;
            resultsContainer.appendChild(resultElement);
        }

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
