import express from 'express';
import { getNotes, getNoteById, createNote, updateNote, deleteNote, searchNotes } from '../controllers/note-controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getNotes);
router.get('/:id', verifyToken, getNoteById);

router.post('/', verifyToken, createNote);
router.post('/search', verifyToken, searchNotes);

router.put('/:id', verifyToken, updateNote);

router.delete('/:id', verifyToken, deleteNote);

export default router;