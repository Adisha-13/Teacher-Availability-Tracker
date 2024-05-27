document.addEventListener('DOMContentLoaded', (event) => {
    loadStatuses();
});

function updateStatus(selectElement) {
    const cell = selectElement.parentElement;
    const row = cell.parentElement.rowIndex;
    const col = cell.cellIndex;
    const table = cell.closest('table');
    const tableId = table.getAttribute('data-table-id');

    // Remove existing status classes
    cell.classList.remove('present', 'busy', 'not-available', 'default-status');

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
    tables.forEach(table => {
        const tableId = table.getAttribute('data-table-id');
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, rowIndex) => {
            const cells = row.children;
            for (let colIndex = 1; colIndex < cells.length; colIndex++) { // start from 1 to skip the time column
                const cell = cells[colIndex];
                const status = localStorage.getItem(`table-${tableId}-cell-${rowIndex}-${colIndex}`);
                if (status) {
                    const selectElement = cell.querySelector('select');
                    selectElement.value = status;
                    updateStatus(selectElement);
                }
            }
        });
    });
}

function resetTable(tableId) {
    localStorage.removeItem(`table-${tableId}`);
    location.reload(); // Refresh the page to reset the table
}
