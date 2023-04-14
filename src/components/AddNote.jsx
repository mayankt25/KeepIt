import React, { useState, useContext } from 'react'
import { NoteContext } from '../contexts/NoteState';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description);
        setNote({ title: "", description: "" });
    }

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <div>
                <form className="create-note">
                    <input type="text" onChange={onChange} value={note.title} name="title" minLength={5} required placeholder="Title" />
                    <textarea type="text" onChange={onChange} value={note.description} name="description" minLength={7} required placeholder="Take a note..." rows="3" />
                    <Zoom in={true}>
                        <Fab disabled={note.title.length < 5 || note.description.length < 7} type="submit" onClick={handleClick}><AddIcon /></Fab>
                    </Zoom>
                </form>
            </div>
        </div>
    )
}

export default AddNote