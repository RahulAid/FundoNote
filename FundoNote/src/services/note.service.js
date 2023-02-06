//import id from '@hapi/joi/lib/base';
import Note from '../models/note.model';


export const createNote = async (note) => {
  try {
    const data = await Note.create(note)
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const deleteNote = async (id) => {
  try {
    const data = await Note.findOneAndDelete({ "_id": id })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const findNote = async (id) => {
  try {
    const data = await Note.findOne({ "_id": id })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const getAllNotes = async () => {
  try {
    const data = await Note.find()
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const updateNote = async (id, description) => {
  try {
    const idtoUpdate = { "_id": id }
    const UpdatedDesc = { "description": description }
    const data = await Note.findOneAndUpdate(idtoUpdate, UpdatedDesc)
    return data
  } catch (err) {
    throw new Error(err)
  }
}



//Send to Archieve
export const archiveNote = async (_id, userId) => {
  try {
    const data = await Note.findByIdAndUpdate(
      {
        _id, userId: userId
      },
      {
        archive: true
      },
      {
        new: true
      });
    return data;
  } catch (err) {
    throw new Error(err)
  }
};


//Send to Trash
export const trashNote = async (_id, userId) => {
  try {
    const data = await Note.findByIdAndUpdate(
      {
        _id, userId: userId
      },
      {
        trash: true
      },
      {
        new: true
      });
    return data;
  } catch (err) {
    throw new Error(err)
  }
};


