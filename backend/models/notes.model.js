import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    noteid: {
        type: Number, 
    },
    noteTitle: {
        type: String,
    },
    noteContent: {
        type: String,
    }

},{timestamps: true})

export const NoteMondle = mongoose.model(NoteMondle, noteSchema)