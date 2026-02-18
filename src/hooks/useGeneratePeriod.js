import { useEffect, useState } from "react";

function useGeneratePeriod(p = 'week') {
    const [period, setPeriod] = useState([]);

    const today = new Date().toLocaleDateString('en-CA');
    useEffect(() => {

        const dates = [];
        if (p === 'week') {
            for (let i = 6; i > 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const date = d.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short'
                });
                const dateParts = date.split(' ');
                const formattedDate = `${dateParts[0]}-${dateParts[1]}`
                dates.push(formattedDate);
            }
            dates.push("Today");
            setPeriod(dates);
        } else if (p === 'month') {
            for (let i = 1; i < 4; i++) {
                dates.push(`Week ${i}`)
            }
            dates.push('This Week')
            setPeriod(dates);
        } else if (p === 'year') {
            const today = new Date();

            for (let i = 12; i > 0; i--) {
                const d = new Date(today.getFullYear(), today.getMonth() - i, 1);

                dates.push(
                    d.toLocaleDateString('default', { month: 'short' })
                );
            }
            dates.push('This Month')
            setPeriod(dates);
        }
    }, [p])
    return period;
}

export default useGeneratePeriod;