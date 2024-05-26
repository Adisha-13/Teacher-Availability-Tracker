function updateStatus(selectElement) {
    const cell = selectElement.parentElement;
    const subject = cell.querySelector('.subject');
    const value = selectElement.value;

    
    subject.classList.remove('absent', 'delayed', 'present');

    
    subject.classList.add(value);
}