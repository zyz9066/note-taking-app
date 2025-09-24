const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// All note routes require authentication via Auth0 middleware in main app

// EJS pages
router.get('/', requiresAuth(), noteController.getNotes);
router.get('/notes/:id/edit', requiresAuth(),noteController.getNoteById);
router.post('/notes', requiresAuth(), noteController.addNote);
router.put('/notes/:id', requiresAuth(), noteController.updateNote);
router.delete('/notes/:id', requiresAuth(), noteController.deleteNote);

// AJAX/REST API routes for dynamic frontend
// Show all notes
router.get('/api/notes', requiresAuth(), noteController.getNotesAPI);
// Show edit form for a note
router.get('/api/notes/:id', requiresAuth(), noteController.getNoteByIdAPI);
// Create new note
router.post('/api/notes', requiresAuth(), noteController.addNoteAPI);
router.put('/api/notes/:id', requiresAuth(), noteController.updateNoteAPI);
// Delete a note
router.delete('/api/notes/:id', requiresAuth(), noteController.deleteNoteAPI);

module.exports = router;