import express from 'express';
import { getNotes, getNoteById, createNote, updateNote, deleteNote, searchNotes } from '../controllers/note-controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getNotes);

router.get('/search', verifyToken, searchNotes);

router.post('/', verifyToken, createNote);
router.post('/search', verifyToken, searchNotes);
router.get('/:id', verifyToken, getNoteById);
router.put('/:id', verifyToken, updateNote);

router.delete('/:id', verifyToken, deleteNote);

export default router;