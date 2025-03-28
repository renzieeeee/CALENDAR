document.addEventListener('DOMContentLoaded', function () {
    const monthYear = document.getElementById('month-year');
    const dayContainer = document.getElementById('days');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    let currentDate = new Date();
    let today = new Date();

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        const prevMonthLastDay = new Date(year, month, 0).getDate(); // Last day of previous month

        monthYear.textContent = `${months[month]} ${year}`;
        dayContainer.innerHTML = '';

        let totalCells = 0;

        // ✅ Add previous month's days
        for (let i = firstDay; i > 0; i--) {
            const prevDayDiv = document.createElement('div');
            prevDayDiv.textContent = prevMonthLastDay - i + 1;
            prevDayDiv.classList.add('prev-month');
            dayContainer.appendChild(prevDayDiv);
            totalCells++;
        }

        // ✅ Add current month's days
        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.classList.add('current-month');
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }
            dayContainer.appendChild(dayDiv);
            totalCells++;
        }

        // ✅ Fill next month's days to ensure 6 rows
        let nextDay = 1;
        while (totalCells < 42) {
            const nextDayDiv = document.createElement('div');
            nextDayDiv.textContent = nextDay;
            nextDayDiv.classList.add('next-month');
            dayContainer.appendChild(nextDayDiv);
            nextDay++;
            totalCells++;
        }
    }

    // ✅ Add navigation for previous & next month
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});
