import { useEffect, useState } from "react";
import "../App.css";
import { deleteNote, postNote } from "../services/notesFatch.js";
import { getNotes } from "../services/notesFatch.js";
import { UpdateNote } from "../services/notesFatch.js";
import { Button } from "antd";
import gsap from "gsap";
import { isUserLoggedIn, logout } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";
import { CloseCircleTwoTone } from "@ant-design/icons";
import addNotification from "react-push-notification";
import pin from "../utils/pin.js";
import NoteType from "../components/noteType.jsx";

function Home() {
  const [showDiv, setShowDiv] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  pin();

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  const fatchnotes = async () => {
    const { userid } = isUserLoggedIn();
    const result = await getNotes(`/getnotes`, userid);
    if (result) {
      setNotes(result?.data);
      return;
    }
    console.log("notfatched");
  };

  const addnotes = async (event) => {
    event.preventDefault();
    const { userid } = isUserLoggedIn();
    await postNote("/notes", {
      User: userid,
      noteTitle: title,
      noteContent: content,
    });
    fatchnotes();
    setTitle("");
    setContent("");
  };

  const handelClickNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handelUpdateNote = async (event) => {
    event.preventDefault();
    if (!selectedNote) {
      return;
    }

    const updateNotereq = {
      id: selectedNote.noteId,
      title: title,
      content: content,
    };

    const result = await UpdateNote("/update", updateNotereq);
    if (result) {
      fatchnotes();
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } else console.log("Somthing Went Wrong");
  };

  const deletenote = async (event, noteId, notetitle) => {
    event.stopPropagation(); //using stopPropagation is usefull if you have click event of the parent element example <div "onclick-event"><div "onclick-event"></div></div>
    alert(`you want to remove ${notetitle} Note`);
    const newnoteId = noteId;
    setLoading(true);
    const result = await deleteNote("/notes", {
      data: {
        noteNumber: newnoteId,
      },
    });
    if (result) {
      setLoading(false);
      fatchnotes();
    }
  };

  function logoutUser() {
    const isLogout = logout();
    if (isLogout) {
      navigate("/login");
      return;
    }
  }

  function UpdateCancel() {
    setSelectedNote(null);
    setTitle("");
    setContent("");
  }

  useEffect(() => {
    fatchnotes();
  }, []);

  useEffect(() => {
    addNotification({
      title: "Now Get all the new feature Notification",
      duration: 100000,
      native: true,
    });
  }, []);

  return (
    <div className="notes flex justify-start h-screen  relative">
      {/* <div className="lightbox"></div> */}
      <div className=" h-6 w-6 cursor-pointer block absolute z-10 top-0">
        <svg
          xmlns="<http://www.w3.org/2000/svg>"
          id="notetoggle"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={toggleDiv}
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>

      {showDiv ? (
        <div className="w-1/7 sidebar shadow-lg p-8 relative">
          <form
            onSubmit={(event) =>
              selectedNote ? handelUpdateNote(event) : addnotes(event)
            }
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Title
              </label>

              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Your Title"
                required
              />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="message"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Your Content
              </label>

              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(event) => {
                  setContent(event.target.value);
                }}
                className="pickerTextarea w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter your Content"
                rows="4"
                required
              />
            </div>

            <div className="mb-4">
              {selectedNote ? (
                <div className="flex">
                  <Button type="primary">
                    <input type="submit" />
                  </Button>
                  <Button onClick={UpdateCancel} type="default">
                    <input type="submit" value="cancel" />
                  </Button>
                </div>
              ) : (
                <Button type="primary">
                  <input type="submit" value="Publish" />
                </Button>
              )}
            </div>
          </form>
        </div>
      ) : null}

      <div className="w-full lightbox shadow-lg relative conent-note">
        <div className="flex justify-between p-2">
          <input
            className="input_search"
            name="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            type="text"
            placeholder="Search.."
          />{" "}
          <Button className="logout_button" onClick={() => logoutUser()}>
            LogOut
          </Button>
        </div>
        <div className="flex note_cards flex-wrap justify-center sm:justify-start relative overflow-hidden">
          {loading ? (
            <div>please wait data is deleating... </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.noteId}
                className="flex-initial hover:scale-105 ease-in-out duration-300 w-64 sm:w-1/2 md:w-1/3 lg:w-1/4 relative coustom-hover"
              >
                {/* <img
                  className="pin"
                  onClick={(event) => {
                    pin(note.noteId);
                  }}
                  width="32"
                  height="32"
                  src="https://img.icons8.com/windows/32/pin3.png"
                  alt="pin3"
                /> */}
                <div>
                  <span className="absolute w-4 top-4 right-11 show " tool-tip="Edit"><img
                    className="cursor-pointer "
                    data-tooltip-text="asdfsd"
                    onClick={() => handelClickNote(note)}
                    src="https://raw.githubusercontent.com/shailesj121/notepad/199e9777c91832d18f840396fed82a15b9f738b1/noteUi/public/assets/img/edit.svg"
                  ></img>
                  </span>
                  <button
                    tool-tip="Delete"
                    className="absolute top-3 right-5 font-bold show"
                    onClick={(event) =>
                      deletenote(event, note.noteId, note.title)
                    }
                  >
                    <CloseCircleTwoTone />
                  </button>

                  <div className="bg-white p-5 pt-2 border-solid rounded-md m-3">
                    <NoteType />
                    <h2 className="font-bold mb-1">{note.title}</h2>
                    <p className="">{note.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
