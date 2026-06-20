let chart;

function initChart() {
    const ctx = document.getElementById("chart");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: "Пользователь 1",
                    data: [],
                    borderColor: "blue"
                },
                {
                    label: "Пользователь 2",
                    data: [],
                    borderColor: "red"
                }
            ]
        }
    });
}

function updateChart() {
    if (!chart) return;

    chart.data.labels.push(chart.data.labels.length);

    chart.data.datasets[0].data.push(userBias);
    chart.data.datasets[1].data.push(userBias2);

    chart.update();
}