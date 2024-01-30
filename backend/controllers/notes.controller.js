import { NoteMondle } from "../models/notes.model.js";
import { apiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js"



const deleteNoteController = asyncHandler( 

async (req, res) => {
   const {noteNumber} = req.body
    console.log("noteNumber:", noteNumber);
      const delNote = await NoteMondle.findOneAndDelete({noteNumber: noteNumber})
      // console.log(delNote)
      if(!delNote) throw "not deleted"
 

}
);





const notecontroller = asyncHandler( 
    // get detail from frontend like id, noteTitle, noteContent.
    // validation - note empty
    // check if detail already exist
    // create note object- create entery in DB
    // check for note creation
    // return rsponse
async (req, res) => {
    const {noteNumber, noteTitle, noteContent} = req.body

     if (noteTitle === "" || noteContent === "") {
        throw new apiError(400, "Note field required both noteTitle and noteContent")
     }
     console.log ("noteNumber:", noteNumber);
     console.log ("noteTitle:", noteTitle);
     console.log ("noteContent:", noteContent )
     

     const existedNote = await NoteMondle.findOne({noteTitle})

     if (existedNote) {
        throw new apiError(401, "note Already exist")
     }
     console.log(existedNote)
     let noteId = await NoteMondle.find()
     noteId = new Number(noteId.length)
     if(!noteId) noteId = 0;
     ++noteId
   //   console.log(noteId)
   //   typeof(noteId)

     const insertNote = await NoteMondle.create(
        {
            noteNumber: noteId,
            noteTitle: noteTitle,
            noteContent: noteContent
        }
     )

     if(!insertNote) {
        throw new apiError(402, "somthing went wrong while saming data on database")
     }

     res.status(200).json({
        "message": "level sabke niklenge"
     }) 
}
);

const noteGetController = asyncHandler( async (req, res) => {
      const getNotes = await NoteMondle.find()

      res.json(getNotes.map((apiData) => (
               {  
                  noteId: apiData.noteNumber,
                  title: apiData.noteTitle,
               content: apiData.noteContent,
            }
      )));

      
})



export { notecontroller, noteGetController };
export { deleteNoteController }
