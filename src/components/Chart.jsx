import React, { useEffect } from 'react';
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
import useGeneratePeriodLabel from '../hooks/useGeneratePeriod';

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
                // labelOffset: 20
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

const labels = [
    'Mar 2025',
    'Apr 2025',
    'May 2025',
    'Jun 2025',
    'Jul 2025',
    'Aug 2025',
    'Sep 2025',
    'Oct 2025',
    'Nov 2025',
    'Dec 2025',
    'Jan 2026',
    'Feb 2026'
];

const sampleData = [120, 95, 140, 110, 160, 130, 170, 150, 180, 200, 175, 190];


export const data = {
    labels,
    datasets: [
        {
            label: 'Words Guessed',
            data: sampleData,
            backgroundColor: '#234120',
        },
    ],
};

// The main component
export function BarChart() {
    const period = useGeneratePeriodLabel('year');
    console.log(period)

    return (
        <div className='h-98/100 w-full'>
            <Bar options={options} data={data} />;
        </div>
    )
}

export default BarChart;
