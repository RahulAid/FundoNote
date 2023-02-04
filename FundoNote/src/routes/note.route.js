import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//create a new note
router.post('', newNoteValidator, userAuth, noteController.createNote);

// update a note by its id
router.put('/:_id', userAuth, noteController.updateNote);

// get all notes
router.get('', userAuth, noteController.getAllNotes);

// get a note by id
router.get('/:_id', userAuth, noteController.findNote);

// delete note by id
router.delete('/:_id', userAuth, noteController.deleteNote);

//route to archieve a note
router.put('/:_id/archive', userAuth, noteController.archiveNote);

export default router;




