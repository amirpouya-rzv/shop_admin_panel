import Chart from 'chart.js/auto';

export const setDashboardChart = (labels, datapoints) => {
    const ctx = document.getElementById('myChart').getContext('2d');

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'فروش ماه',
                data: datapoints,
                borderColor: '#0062ff',
                fill: true,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
            },
        ],
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'نمودار فروش یک سال گذشته',
                },
            },
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'میلیون تومان',
                    },
                },
            },
        },
    };

    new Chart(ctx, config);
};
