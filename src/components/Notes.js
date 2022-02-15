import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes();
      }else{
        navigate("/login")
      }
    
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleClick = (e) => {
    console.log(note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    e.preventDefault();
    props.showAlert("Updated successfully","success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      <div className="row">
        <h1>Show your Notes</h1>
        <div className="container">
        {notes.length ===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
          );
        })}
      </div>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3" action="">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    rows="3"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5} required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
                <button disabled={note.etitle.length<5 && note.edescription.length<5} type="button" className="btn btn-primary me-5" onClick={handleClick}>
                Update Note
              </button>
                <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
