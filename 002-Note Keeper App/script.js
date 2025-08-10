document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const noteInput = document.querySelector('input');
    const noteText = noteInput.value.trim();
    
    if(noteText) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
        
        addNoteToUI(noteText);
        noteInput.value = '';
    }
});

function addNoteToUI(noteText) {
    const li = document.createElement('li');
    li.textContent = noteText;
    
    const btn = document.createElement('button');
    btn.textContent = "X";
    btn.classList.add('cancel');
    btn.addEventListener('click', function() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        
        const updatedNotes = notes.filter(item => item !== noteText);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        
        li.remove();
    });
    
    li.appendChild(btn);
    document.querySelector('ul').prepend(li);
}

window.addEventListener('load', function() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(note => addNoteToUI(note));
});