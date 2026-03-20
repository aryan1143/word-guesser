import { useEffect, useMemo } from 'react';
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

const getChartOptions = () => {
    const isDark = document.documentElement.classList.contains('dark');
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: isDark ? '#e0e8f0' : '#234120',
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
                    color: isDark ? '#e0e8f0' : '#234120',
                },
                grid: {
                    color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: isDark ? '#e0e8f0' : '#234120',
                    font: {
                        size: 14
                    }
                },
                grid: {
                    color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }
            },
        },
    };
};

export const options = getChartOptions();


export function BarChart({ periodType }) {
    const { period, periodLabel } = useGeneratePeriodLabel(periodType);
    const { data, loading, getHistory } = useHandleStatsHistory();

    useEffect(() => {
      getHistory();
    }, [])
    

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

    const isDark = document.documentElement.classList.contains('dark');
    const barData = useMemo(() => ({
        labels,
        datasets: [
            {
                label: 'Words Guessed',
                data: periodData,
                backgroundColor: isDark ? '#4a7c52' : '#234120',
            },
        ],
    }), [labels, periodData]);


    return (
        <div className='relative h-98/100 w-full'>
            {loading ?
                <Loader isBg={false} /> : <Bar options={getChartOptions()} data={barData} />}
        </div>
    )
}

export default BarChart;
