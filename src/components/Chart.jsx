import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.defaults.font.family = '"Jersey 25"'

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: '#234120',
                font: {
                    size: 24
                }
            },
            position: 'top',
        },
        title: {
            display: true,
            text: 'Stats of Guessed Words',
            font: {
                size: 16
            }
        },
    },
    scales: {
        x: {
            ticks: {
                color: '#234120',
                labelOffset: 20
            }
        },
        y: {
            beginAtZero: true, // Start the y-axis at zero
            ticks: {
                color: '#234120',
                font: {
                    size: 14
                }
            }
        },
    },
};

// Define your data
const labels = ['3-Feb', '4-Feb', '5-Feb', '6-Feb', '7-Feb', 'Yesterday', 'Today'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Words Guessed',
            data: [12, 19, 3, 5, 2, 3, 15], // Your data points
            backgroundColor: '#234120', // Color for the bars
        },
    ],
};

// The main component
export function BarChart() {
    return (
        <div className='h-98/100 w-9/10'>
            <Bar options={options} data={data} />;
        </div>
    )
}

export default BarChart;
