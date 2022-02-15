import react from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    let host = "http://localhost:3005";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  // get all notes
  const getNotes = async () => {
      const responce = await fetch(`${host}/api/notes/fetchallnotes`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      const json = await responce.json();
    //   console.log(json)
    setNotes(json);

  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // to
    const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      const note = await response.json();

    
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    // console.log("deleting a node of id" + id);
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const json = await response.json(); 
    //   console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    // Default options are marked with *
    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json(); 
    // console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      let element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
