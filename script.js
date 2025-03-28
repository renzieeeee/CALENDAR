document.addEventListener('DOMContentLoaded', function () {
    const monthYear = document.getElementById('month-year');
    const calendarBody = document.getElementById('calendar-body');
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
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        monthYear.textContent = `${months[month]} ${year}`;
        calendarBody.innerHTML = '';

        let totalCells = 0;
        let row = document.createElement('tr');

        
        for (let i = firstDay; i > 0; i--) {
            const cell = document.createElement('td');
            cell.textContent = prevMonthLastDay - i + 1;
            cell.classList.add('prev-month');
            row.appendChild(cell);
            totalCells++;
        }

       
        for (let i = 1; i <= lastDay; i++) {
            if (totalCells % 7 === 0) {
                calendarBody.appendChild(row);
                row = document.createElement('tr');
            }
            const cell = document.createElement('td');
            cell.textContent = i;
            cell.classList.add('current-month');
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                cell.classList.add('today');
            }
            row.appendChild(cell);
            totalCells++;
        }

      
        let nextDay = 1;
        while (totalCells < 42) {
            if (totalCells % 7 === 0) {
                calendarBody.appendChild(row);
                row = document.createElement('tr');
            }
            const cell = document.createElement('td');
            cell.textContent = nextDay;
            cell.classList.add('next-month');
            row.appendChild(cell);
            nextDay++;
            totalCells++;
        }

       
        calendarBody.appendChild(row);
    }

    
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
