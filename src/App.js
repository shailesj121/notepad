import React, { useState } from "react";
import './App.css';


function App() {
  const [showDiv, setShowDiv] = useState(true);

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  const [notes, setNotes] = useState([
    // all the notes will be here 
  ])

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const addnotes = (event) => {
    event.preventDefault();

    const newNote = {
      id: notes.length + 1,
      title: title,
      content: content,
    }

    setNotes([newNote, ...notes])
    setTitle("")
    setContent("")
  }

  const [selectedNote, setSelectedNote] = useState(null)

  const handelClickNote = (note) => {
    setSelectedNote(note)
    setTitle(note.title)
    setContent(note.content)
    // console.log(note)
    // console.log(selectedNote.id)
  }

  const handelUpdateNote = (event) => {
    event.preventDefault();   

    if (!selectedNote) { return };

    const updateNote = {
      id: selectedNote.id,
      title: title,
      content: content
    }


    const updateNoteList = notes.map((note) => (
      note.id === updateNote.id
        ? updateNote
        : note
    ));


    setNotes(updateNoteList)
    setTitle("")
    setContent("")
    setSelectedNote(null)

  }


 const deletenote = (event, noteId, notetitle) => {
  event.stopPropagation();              //using stopPropagation is usefull if you have click event of the parent elenent example <div "onclick-event"><div "onclick-event"></div></div>
  
  alert(`you want to remove ${notetitle} Note`)

  const updateNotes = notes.filter((note) => note.id !== noteId);
  setNotes(updateNotes);
 }

  return (

    <div className="notes flex justify-start h-screen bg-gray-100 relative" >
      <div className=" h-6 w-6 cursor-pointer block relative top-0">
        <svg xmlns="<http://www.w3.org/2000/svg>" id="notetoggle" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={toggleDiv}><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </div>

      {showDiv ? <div className="w-1/7 bg-white shadow-lg rounded-lg p-8 relative">

        <form onSubmit={(event) => (selectedNote ? handelUpdateNote(event) : addnotes(event))}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-600 text-sm font-medium mb-2">
              Title
            </label>

            <input type="text" id="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Your Title" required />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-600 text-sm font-medium mb-2">
              Your Content
            </label>

            <textarea id="content" name="content" value={content} onChange={(event) => setContent(event.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter your Content" rows="4" required />
          </div>

          <div className="mb-4">
            {selectedNote ? (<div className="flex">
              <button type="submit" className="w-1/2 px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50">Update</button>
              <button type="submit" className="w-1/2 px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50">Cancel</button>
            </div>)
              : <button type="submit" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50">Publish</button>}

          </div>
        </form>
      </div> : null}
      <div className="w-full bg-white shadow-lg rounded-lg  conent-note">
        <div className="flex flex-wrap justify-center sm:justify-start relative">

          {notes.map((note) => (
            <div key={note.id} className="flex-initial w-64 sm:w-1/2 md:w-1/3 lg:w-1/4 relative ">
              <div onClick={() => handelClickNote(note)}>
              <button onClick={(event) => deletenote(event, note.id, note.title) } className="absolute top-3 right-5 font-bold">X</button>
                <div className=" border-solid border-2 rounded-md border-sky-500 p-5 m-3">
                  <h2 className="font-bold pb-2">{note.title}</h2>
                  <p>{note.content}</p>
                </div>
              </div>
            </div>
          )
          )}

        </div>

      </div>

    </div>
  );

}

export default App;
