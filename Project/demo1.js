// Function to update the status without saving
function updateStatus(selectElement) {
    const cell = selectElement.parentElement;
    const subject = cell.querySelector('.subject');
    const value = selectElement.value;

    // Remove existing status classes
    subject.classList.remove('absent', 'delayed', 'present');

    // Add new status class
    subject.classList.add(value);

    // Add default green color for "present" status
    if (value === 'present') {
        subject.classList.add('present');
    }
}

// Function to save all statuses to localStorage
function saveAllStatuses() {
    const cells = document.querySelectorAll('td[data-day][data-time]');
    const timetableStatus = {};

    cells.forEach(cell => {
        const day = cell.dataset.day;
        const time = cell.dataset.time;
        const select = cell.querySelector('select');
        const value = select.value;

        if (!timetableStatus[day]) {
            timetableStatus[day] = {};
        }

        timetableStatus[day][time] = value;
    });

    localStorage.setItem('timetableStatus', JSON.stringify(timetableStatus));
}

// Function to load the status from localStorage
function loadStatus() {
    const timetableStatus = JSON.parse(localStorage.getItem('timetableStatus')) || {};
    for (const day in timetableStatus) {
        for (const time in timetableStatus[day]) {
            const status = timetableStatus[day][time];
            const cell = document.querySelector(`td[data-day="${day}"][data-time="${time}"]`);
            const select = cell.querySelector('select');
            const subject = cell.querySelector('.subject');

            // Set the select value and apply the class
            select.value = status;
            subject.classList.add(status);

            // Add default green color for "present" status
            if (status === 'present') {
                subject.classList.add('present');
            }
        }
    }
}

// Function to reset all select elements to their default state
function resetAllStatuses() {
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.value = select.firstElementChild.value;
        updateStatus(select); // Update the status after resetting
    });
}

// Call loadStatus when the page loads
window.onload = loadStatus;
