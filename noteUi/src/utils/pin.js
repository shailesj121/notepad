import { pinNote } from "../services/notesFatch";


/**
 * Pins a note by its ID.
 * @param {number} noteId - The ID of the note that needs to be pinned.
 * @returns {Promise} A promise that resolves when the note is pinned.
 */

async function pin(noteId){
    //get the id of the note
    //add the pin should be true
    //update the database
    console.log(noteId)
    // return await pinNote("/pin", noteId)
}

export default pin