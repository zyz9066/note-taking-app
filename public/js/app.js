// Helper to create a note card
function createNoteCard(note) {
  return `
    <div class="col-md-6 col-lg-4" id="note-${note._id}">
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${note.title}</h5>
          <p class="card-text">${note.content}</p>
          <button class="btn btn-primary btn-sm edit-btn" data-id="${note._id}">Edit</button>
          <button class="btn btn-danger btn-sm delete-btn" data-id="${note._id}">Delete</button>
        </div>
      </div>
    </div>
  `;
}

// Load notes via AJAX
async function loadNotes() {
  const res = await fetch('/api/notes');
  const notes = await res.json();
  const notesDiv = document.querySelector('.row.g-3');
  notesDiv.innerHTML = '';
  notes.forEach((note) => {
    notesDiv.innerHTML += createNoteCard(note);
  });
}

// Add note AJAX
document
  .getElementById('note-form')
  .addEventListener('submit', async function (e) {
    e.preventDefault();
    const title = this.title.value;
    const content = this.content.value;
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      this.reset();
      loadNotes();
    }
  });

// Event delegation for edit/delete buttons
document.querySelector('.row.g-3').addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    // Delete note
    const noteId = e.target.dataset.id;
    await fetch(`/api/notes/${noteId}`, { method: 'DELETE' });
    document.getElementById(`note-${noteId}`).remove();
  }
  if (e.target.classList.contains('edit-btn')) {
    // Edit note (fetch and fill form)
    const noteId = e.target.dataset.id;
    const res = await fetch(`/api/notes/${noteId}`);
    if (res.ok) {
      const note = await res.json();
      document.querySelector('input[name="title"]').value = note.title;
      document.querySelector('textarea[name="content"]').value = note.content;
      document.getElementById('note-form').setAttribute('data-editing', noteId);
      document
        .getElementById('note-form')
        .scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// Enhanced submit to handle edit/update
document
  .getElementById('note-form')
  .addEventListener('submit', async function (e) {
    e.preventDefault();
    const title = this.title.value;
    const content = this.content.value;
    const noteId = this.getAttribute('data-editing');
    if (noteId) {
      // Update note
      const res = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        loadNotes();
        this.reset();
        this.removeAttribute('data-editing');
      }
    } else {
      // Add new note
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        loadNotes();
        this.reset();
      }
    }
  });

// Fetch notes on load
document.addEventListener('DOMContentLoaded', loadNotes);
