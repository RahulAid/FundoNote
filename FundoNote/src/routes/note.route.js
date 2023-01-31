import express from 'express'
import * as NoteController from '../controllers/note.controller'
import { newNoteValidator } from '../validators/note.validator'
import { userAuth } from '../middlewares/auth.middleware'

const router = express.Router()

//Create a Note
router.post('/', newNoteValidator,userAuth, NoteController.createNote)

//Read All Notes
router.get('/',userAuth,NoteController.getAllNotes)

//Read Note using ID
router.get('/:id',userAuth,NoteController.findNote)

//Update Note using ID
router.put('/:id',userAuth, NoteController.updateNote)

//Delete Node using ID
router.delete('/:id',userAuth,NoteController.deleteNote)

export default router