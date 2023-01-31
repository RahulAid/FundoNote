import HttpStatus from 'http-status-codes'
import * as NoteService from '../services/note.service'


//Controller to Create Note
export const createNote = async (req, res, next) => {
  try {
    const data = await NoteService.createNote(req.body)
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note Added Successfully'
    });
  } catch (error) {
    next(error);
  }
}


//Controller to Update Note Using ID
export const updateNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateNote(req.params.id, req.body.description);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK, 
      data: data,
      message: 'Note Updated Successfully'
    });
  } catch (error) {
    next(error);
  }
}


//Controller to Delete Note Using ID
export const deleteNote = async (req, res, next) => {
  try {
    const data = await NoteService.deleteNote(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note Deleted Successfully'
    });
  } catch (error) {
    next(error)
  }
}


//Controller to Read Note Using ID
export const findNote = async (req, res, next) => {
  try {
    const data = await NoteService.findNote(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
    });
  } catch (error) {
    next(error)
  }
}


//Controller to Read All Notes
export const getAllNotes = async (req, res, next) => {
  try {
    const data = await NoteService.getAllNotes();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
    });
  } catch (error) {
    next(error)
  }
}