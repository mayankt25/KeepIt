import React, { useState, useContext } from 'react'
import { NoteContext } from '../contexts/NoteState';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "" });

    const [expansion, setExpansion] = useState(false);

    const expand = () => {
        setExpansion(true);
    }

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
                    {expansion && <input type="text" onChange={onChange} value={note.title} name="title" minLength={5} required placeholder="Title" />}
                    <textarea type="text" onClick={expand} onChange={onChange} value={note.description} name="description" minLength={7} required placeholder="Take a note..." rows={expansion ? 3  : 1} />
                    <Zoom in={expansion}>
                        <Fab disabled={note.title.length < 5 || note.description.length < 7} type="submit" onClick={handleClick}><AddIcon /></Fab>
                    </Zoom>
                </form>
            </div>
        </div>
    )
}

export default AddNote