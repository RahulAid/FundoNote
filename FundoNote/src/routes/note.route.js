import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { redisCheck } from '../middlewares/redis.middleware';

const router = express.Router();

//create a new note
router.post('', newNoteValidator, userAuth, noteController.createNote);

//route to get all notes using redis
router.get('', userAuth,redisCheck, noteController.getAllNotes);

// update a note by its id
router.put('/:_id', userAuth, noteController.updateNote);

// get a note by id
router.get('/:_id', userAuth, noteController.findNote);

// delete note by id
router.delete('/:_id', userAuth, noteController.deleteNote);

//route to archieve a note
router.put('/:_id/archive', userAuth, noteController.archiveNote);

//route to trash a note
router.put('/:_id/trash', userAuth, noteController.trashNote);


export default router;




