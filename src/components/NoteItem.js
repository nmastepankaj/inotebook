import React,{useContext} from "react";
import noteContext from "../context/notes/NoteContext"

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note,updateNote} = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <div className="d-flex justify-content-between">
        <i className="far fa-edit" onClick={()=>{updateNote(note);props.showAlert("Deleted successfully","success")}}></i>
        <i className="far fa-trash-alt" onClick={()=>{deleteNote(note._id)}}></i>
    </div>
{/*     
    <a href="/" className="btn btn-primary">{note.tag}</a> */}
  </div>
</div>
            
            
            
        </div>
    )
}

export default NoteItem
