import axios from "axios" 
import React, { useEffect, useState } from "react";
import './App.css';






function App() {


  const [showDiv, setShowDiv] = useState(true);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [notes, setNotes] = useState([
    // all the notes will be here 
  ])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")


  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  const fatchnotes = async () => {
    await axios.get("http://localhost:4000/api/getNotes").then((response) => {
      setNotes(response.data)
    }).catch((err) => console.log("server error"))
  }

  useEffect(() => { fatchnotes() }, [])


  const addnotes = async (event) => {
    event.preventDefault();

    await axios.post("http://localhost:4000/api/notes", {
      "noteTitle": title,
      "noteContent": content
    }).then().catch((err) => {
      console.log(`error on send notes: ${err}`)
    })
    fatchnotes()
    setTitle("")
    setContent("")

  }

  const [selectedNote, setSelectedNote] = useState(null)

  const handelClickNote = (note) => {
    setSelectedNote(note)
    setTitle(note.title)
    setContent(note.content)
    // console.log( setTitle(note.title))

  }

  const handelUpdateNote = (event) => {
    event.preventDefault();

    if (!selectedNote) { return };

    const updateNote = {
      id: selectedNote.noteId,
      title: title,
      content: content
    }


    const updateNoteList = notes.map((note) => (
      note.noteId === updateNote.noteIid
        ? updateNote
        : note
    ));


    setNotes(updateNoteList)
    setTitle("")
    setContent("")
    setSelectedNote(null)

  }

  const deletenote = async (event, noteId, notetitle) => {
    event.stopPropagation();              //using stopPropagation is usefull if you have click event of the parent element example <div "onclick-event"><div "onclick-event"></div></div>

    alert(`you want to remove ${notetitle} Note`)

    // console.log(noteId)

    const newnoteId = noteId

    setLoading(true)
    fatchnotes()
    
    await axios.delete("http://localhost:4000/api/notes", {
      data: {
        "noteNumber": newnoteId
      }
    }).then(setLoading(false),fatchnotes())
      .catch((err) => {
        console.log(`error on deleting note: ${err}`)
      });
      
  }

  return (

    <div className="notes flex bg-gray-800 justify-start h-screen bg-gray-100 relative" >
      <div className=" h-6 w-6 cursor-pointer block relative top-0">
        <svg xmlns="<http://www.w3.org/2000/svg>" id="notetoggle" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={toggleDiv}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </div>

      {showDiv ? <div className="w-1/7 bg-gray-400 shadow-lg rounded-lg p-8 mr-2 relative">

        <form onSubmit={(event) => (selectedNote ? handelUpdateNote(event) : addnotes(event))}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-600 text-sm font-medium mb-2">
              Title
            </label>

            <input type="text" id="title" name="title" value={title} onChange={(event) => {setTitle(event.target.value)}} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Your Title" required />
            
          </div>

          <div className="mb-4 relative">
            <label htmlFor="message" className="block text-gray-600 text-sm font-medium mb-2">
              Your Content
            </label>
            

            <textarea id="content" name="content" value={content} onChange={(event) => {setContent(event.target.value)
            console.log(content)}
            } className="pickerTextarea w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter your Content" rows="4" required />
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
      <div className="w-full bg-gray-800 shadow-lg rounded-lg  conent-note">
        <div className="bg-gray-700	 p-2">
          <input name= "search" value = {search} onChange={(event) => {setSearch(event.target.value)}} type="text" placeholder="Search.."/>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start relative overflow-hidden">
        {loading? <div>please wait data is deleating... </div> : notes.map((note) => (
            <div key={note.noteId} className="flex-initial hover:scale-105 ease-in-out duration-300 w-64 sm:w-1/2 md:w-1/3 lg:w-1/4 relative ">
              <div onClick={() => handelClickNote(note)}>
                <button onClick={(event) => deletenote(event, note.noteId, note.title)} className="absolute top-3 right-5 font-bold">X</button>
                <div className=" bg-gray-600  border-solid rounded-md m-3">
                  <h2 className="font-bold text-slate-50 pl-5 pt-2 pb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">{note.title}</h2>
                  <p className = "text-slate-50  p-5 pt-2">{note.content}</p>
                </div>
              </div>
            </div>
          ))
        }

        </div>

      </div>

    </div>
  );

}

export default App;