import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    noteNumber: Number,
    noteTitle: {
        type: String,
    },
    noteContent: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    } 

},{timestamps: true})

export const NoteMondle = mongoose.model("NoteMondle", noteSchema)