import Chart from "chart.js/auto";

const chartContainer = document.getElementById("acquisitions");
let chart = null;

export const createChart = (datasets) => {
    chart = new Chart(chartContainer, {
        type: "bar",
        options: {
            animation: false,
            plugins: {
                tooltip: {
                    enabled: false
                }
            }
        },
        data: {
            labels: Object.keys(datasets[0].values),
            datasets: datasets.map(dataset => ({
                label: dataset.label,
                data: dataset.values,
                color: dataset.color,
                borderColor: dataset.color,
                backgroundColor: dataset.color,
            }))
        }
    });
}
