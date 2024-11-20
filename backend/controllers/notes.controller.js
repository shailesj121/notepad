import { NoteMondle } from "../models/notes.model.js";
import { apiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js"


const deleteNoteController = asyncHandler(
   //getting the id of the note
   //find that note on database and delete it 
   //after the send the response

   async (req, res) => {
      try {
         const { noteNumber } = req.body
         const delNote = await NoteMondle.findOneAndDelete({ noteNumber: noteNumber })
         if (!delNote) throw "not deleted"
         res.status(200).json({
            "messange": "success"
         })
      } catch (error) {
         throw (error)
      }
   }
);


const updateNoteController = asyncHandler(

   async (req, res) => {
      try {
         const reqUpdateNotes = req.body
         const updateNote = await NoteMondle.findOne({
            noteNumber: reqUpdateNotes.id,
            noteTitle: reqUpdateNotes.title
         })
         updateNote.overwrite({
            noteTitle: reqUpdateNotes.title,
            noteContent: reqUpdateNotes.content
         })
         await updateNote.save()
         res.status(200).json({
            message: "success Update",
         })
      } catch (error) {
         console.log(error)
      }
   }
)


const notecontroller = asyncHandler(
   // get detail from frontend like id, noteTitle, noteContent.
   // validation - note empty
   // check if detail already exist
   // create note object- create entery in DB
   // check for note creation
   // return rsponse

   async (req, res) => {
      const { noteTitle, noteContent, User } = req.body

      if (noteTitle === "" || noteContent === "") {
         throw new apiError(400, "Note field required both noteTitle and noteContent")
      }
      const existedNote = await NoteMondle.findOne({ noteTitle })

      if (existedNote) {
         throw new apiError(401, "note Already exist")
      }

      // creating noteid by finding the length of total notes and adding 1 to the total notes
      let noteId = await NoteMondle.find()
      noteId = new Number(noteId.length)
      if (!noteId) noteId = 0;
      ++noteId

      const insertNote = await NoteMondle.create(
         {
            noteNumber: noteId,
            noteTitle: noteTitle,
            noteContent: noteContent,
            user: User,
         }
      )

      if (!insertNote) {
         throw new apiError(402, "somthing went wrong while saming data on database")
      }

      res.status(200).json({
         "message": "level sabke niklenge"
      })
   }
);

const noteGetController = asyncHandler(async (req, res) => {
   const userId = req?.headers?.authorization?.split(" ")[1]
   const getNotes = await NoteMondle.find({
      user: Object(userId)
   })
   res.json(getNotes.map((apiData) => (
      {
         noteId: apiData.noteNumber,
         title: apiData.noteTitle,
         content: apiData.noteContent,
      }
   )));
})

const pinNoteController = asyncHandler(async (req, res) => {
    console.log(req.headers)
})


export { notecontroller, noteGetController, updateNoteController, deleteNoteController, pinNoteController };
