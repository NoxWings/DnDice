export const chartOptions = {
    responsive: true,
    scales: {
        yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: "Probability"
            },
            ticks: {
                beginAtZero: true,
                min: 0
            }
        }],
        xAxes: [{
            display: true,
            type: "linear",
            scaleLabel: {
                display: true,
                labelString: "Roll Outcome"
            },
            ticks: {
                suggestedMax: 4,
                stepSize: 1
            }
        }]
    }
};
