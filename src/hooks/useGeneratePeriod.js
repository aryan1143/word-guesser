import { useEffect, useState } from "react";

function useGeneratePeriodLabel(p = 'week') {
    const [periodLabel, setPeriodLabel] = useState([]);
    const [period, setPeriod] = useState([]);

    const today = new Date().toISOString().split('T')[0];;
    useEffect(() => {

        const datesLabel = [];
        const dates = [];
        if (p === 'week') {
            for (let i = 6; i > 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const dateLable = d.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short'
                });
                const dateParts = dateLable.split(' ');
                const formattedDate = `${dateParts[0]}-${dateParts[1]}`
                const date = d.toISOString().split('T')[0];
                dates.push(date);
                datesLabel.push(formattedDate);
            }
            datesLabel.push("Today");
            dates.push(today);
            setPeriodLabel(datesLabel);
            setPeriod(dates);

        } else if (p === 'month') {
            const d = new Date();
            for (let i = 1; i <= 4; i++) {
                if (i === 4) {
                    datesLabel.push('This Week')
                } else {
                    datesLabel.push(`Week ${i}`);
                }
                const week = [];
                for (let j = 0; j < 7; j++) {
                    d.setDate(d.getDate() - 1);
                    const date = d.toISOString().split('T')[0];
                    week.push(date);
                }
                dates.push(week);
            }
            setPeriodLabel(datesLabel);
            setPeriod(dates.reverse());

        } else if (p === 'year') {
            const td = new Date();
            for (let i = 11; i >= 0; i--) {
                const d = new Date(td.getFullYear(), td.getMonth() - i, 1);
                if (i === 0) {
                    datesLabel.push('This Month')
                } else {
                    datesLabel.push(
                        d.toLocaleDateString('default', { month: 'short' })
                    );
                }
                const month = [];
                const cD = new Date(td.getFullYear(), td.getMonth() - i, 1);
                while (d.getMonth() === cD.getMonth()) {
                    const date = d.toISOString().split('T')[0];
                    month.push(date);
                    d.setDate(d.getDate() + 1);
                }
                dates.push(month);
            }
            setPeriodLabel(datesLabel);
            setPeriod(dates);
        }
    }, [p])
    return ({ period, periodLabel });
}


export default useGeneratePeriodLabel;
