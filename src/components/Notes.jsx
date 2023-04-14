import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import { NoteContext } from '../contexts/NoteState';
import AddNote from './AddNote';
import { AlertContext } from '../contexts/AlertState';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;

    const context2 = useContext(AlertContext);
    const {showAlert} = context2;

    let navigate = useNavigate();

    const [note, setNote] = useState({ eid: "", etitle: "", edescription: ""});

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.eid, note.etitle, note.edescription);
        refClose.current.click();
        showAlert("Updated Successfully", "success");
    }

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }


    useEffect(() => {
        if(localStorage.getItem("token")){
            getNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [notes]);

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description});
    }

    return (
        <div>
            <AddNote />
            <button ref={ref} type="button" className="btn d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="title" name="title">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="container">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.etitle} minLength={5} required id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" value={note.edescription} minLength={7} required id="edescription" name="edescription" onChange={onChange}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn d-none" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 7} type="button" className="btn" onClick={handleClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                {notes.map((note) => <NoteItem key={note._id} updateNote={updateNote} note={note} />)}
            </div>
        </div>
    )
}

export default Notes