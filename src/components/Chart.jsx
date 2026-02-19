import { useMemo } from 'react';
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
import useHandleStatsHistory from '../hooks/useHandleStatsHistory';
import Loader from '../components/Loader'

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
            }
        },
        y: {
            beginAtZero: true,
            ticks: {
                color: '#234120',
                font: {
                    size: 14
                }
            }
        },
    },
};


export function BarChart({ periodType }) {
    const { period, periodLabel } = useGeneratePeriodLabel(periodType);
    const { data, loading } = useHandleStatsHistory();
    const labels = periodLabel;
    const getValueForPeriod = (e) => {
        if (periodType === 'week') {
            return data?.[e] ?? 0;
        }

        if (periodType === 'month' || periodType === 'year') {
            if (!Array.isArray(e)) return 0;

            return e.reduce((total, s) => {
                return total + (data?.[s] ?? 0);
            }, 0);

        }
        return 0;
    };
    const periodData = useMemo(() => {
        if (loading) return [];
        return period.map(getValueForPeriod);
    }, [period, data, loading, periodType]);

    const barData = useMemo(() => ({
        labels,
        datasets: [
            {
                label: 'Words Guessed',
                data: periodData,
                backgroundColor: '#234120',
            },
        ],
    }), [labels, periodData]);


    return (
        <div className='relative h-98/100 w-full'>
            {loading ?
                <Loader isBg={false} /> : <Bar options={options} data={barData} />}
        </div>
    )
}

export default BarChart;
