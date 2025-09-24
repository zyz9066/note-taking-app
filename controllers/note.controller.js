const Note = require('../models/Note.model');

// EJS page: List all notes
exports.getNotes = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const notes = await Note.find({ user: userId });
    res.render('index', { notes });
  } catch {
    res.status(500).send('Error loading notes');
  }
};

// EJS page: Edit single note
exports.getNoteById = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const note = await Note.findOne({ _id: req.params.id, user: userId });
    if (!note) return res.status(404).send('Note not found');
    res.render('edit', { note });
  } catch {
    res.status(500).send('Error loading note');
  }
};

// EJS page: Add note
exports.addNote = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).send('Title and content are required');
    }
    await new Note({ user: userId, title, content }).save();
    res.redirect('/');
  } catch {
    res.status(500).send('Error creating note');
  }
};

// EJS page: Update note
exports.updateNote = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { title, content },
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).send('Note not found');
    res.redirect('/');
  } catch {
    res.status(500).send('Error updating note');
  }
};

// EJS page: Delete note
exports.deleteNote = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    await Note.deleteOne({ _id: req.params.id, user: userId });
    res.redirect('/');
  } catch {
    res.status(500).send('Error deleting note');
  }
};

// List all notes for logged-in user
exports.getNotesAPI = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const notes = await Note.find({ user: userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes.' });
  }
};

// Get a single note by ID
exports.getNoteByIdAPI = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const note = await Note.findOne({ _id: req.params.id, user: userId });
    if (!note) return res.status(404).json({ error: 'Note not found.' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch note.' });
  }
};

// Create a new note linked to the Auth0 user
exports.addNoteAPI = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }
    const note = new Note({ user: userId, title, content });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create note.' });
  }
};

// Update a note by ID
exports.updateNoteAPI = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { title, content },
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ error: 'Note not found.' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update note.' });
  }
};

// Delete a note by ID, only if it belongs to the logged-in user
exports.deleteNoteAPI = async (req, res) => {
  try {
    const userId = req.oidc.user.sub;
    const result = await Note.deleteOne({ _id: req.params.id, user: userId });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Note not found.' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note.' });
  }
};
