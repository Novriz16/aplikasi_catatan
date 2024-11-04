document.getElementById('add-note-btn').addEventListener('click', addNote);
document.getElementById('search-bar').addEventListener('input', searchNotes);

function addNote() {
    const noteContent = document.getElementById('note-content').value;
    if (noteContent.trim()) {
        const note = {
            id: Date.now(),
            content: noteContent,
            timestamp: new Date().toLocaleString(),
        };
        saveNoteToLocalStorage(note);
        displayNotes();
        document.getElementById('note-content').value = ''; // Clear text area
    }
}

function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function displayNotes() {
    const notesContainer = document.getElementById('notes-container');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesContainer.innerHTML = '';
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <p>${note.content}</p>
            <small>${note.timestamp}</small>
            <button onclick="deleteNote(${note.id})">Hapus</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== id); // Hapus catatan berdasarkan ID
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes(); // Refresh tampilan
}

function searchNotes() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const filteredNotes = notes.filter(note => note.content.toLowerCase().includes(query));
    displayFilteredNotes(filteredNotes);
}

function displayFilteredNotes(notes) {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `<p>${note.content}</p><small>${note.timestamp}</small>`;
        notesContainer.appendChild(noteElement);
    });
}

// Fungsi Mode Gelap/Terang
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Set mode gelap/terang saat halaman dimuat
window.onload = () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
};

// Tampilkan catatan saat halaman dimuat
displayNotes();
