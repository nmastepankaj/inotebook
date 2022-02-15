import React,{useContext,useState} from 'react'
import noteContext from "../context/notes/NoteContext"

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"",tag:""})

    const handleClick = (e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("Added successfully","success")
    }

    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    return (
        <form className="my-3" action="">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            name="description"
            value={note.description}
            onChange={onChange}
            minLength={5} required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button disabled={note.title.length<5 && note.title.description<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    )
}

export default AddNote
