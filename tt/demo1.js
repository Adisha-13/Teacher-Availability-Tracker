document.addEventListener('DOMContentLoaded', function() {
    loadStatuses();
});

function updateStatus(selectElement) {
    const cell = selectElement.parentElement;
    const row = cell.parentElement.rowIndex;
    const col = cell.cellIndex;
    const table = cell.closest('table');
    const tableId = table.getAttribute('data-table-id');

    // Remove existing status classes
    cell.className = 'default-status';

    // Add the new status class based on the selected value
    const status = selectElement.value;
    if (status === 'present') {
        cell.classList.add('present');
    } else if (status === 'busy') {
        cell.classList.add('busy');
    } else if (status === 'not available') {
        cell.classList.add('not-available');
    }

    // Save the status in localStorage
    localStorage.setItem(`table-${tableId}-cell-${row}-${col}`, status);
}

function loadStatuses() {
    const tables = document.querySelectorAll('table[data-table-id]');
    tables.forEach(function(table) {
        const tableId = table.getAttribute('data-table-id');
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(function(row, rowIndex) {
            const cells = row.children;
            Array.from(cells).forEach(function(cell, colIndex) {
                if (colIndex !== 0) { // Skip the first cell containing day names
                    const status = localStorage.getItem(`table-${tableId}-cell-${rowIndex}-${colIndex}`);
                    if (status) {
                        const selectElement = cell.querySelector('select');
                        selectElement.value = status;
                        updateStatus(selectElement);
                    }
                }
            });
        });
    });
}

function saveTimetable() {
    const tables = document.querySelectorAll('table[data-table-id]');
    tables.forEach(function(table) {
        const tableId = table.getAttribute('data-table-id');
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(function(row, rowIndex) {
            const cells = row.children;
            Array.from(cells).forEach(function(cell, colIndex) {
                if (colIndex !== 0) { // Skip the first cell containing day names
                    const selectElement = cell.querySelector('select');
                    const status = selectElement.value;
                    localStorage.setItem(`table-${tableId}-cell-${rowIndex}-${colIndex}`, status);
                }
            });
        });
    });
    alert('Timetable saved successfully!');
}

function resetTimetable() {
    localStorage.clear(); // Clear all saved statuses from localStorage
    location.reload(); // Refresh the page to reset the timetable
}
