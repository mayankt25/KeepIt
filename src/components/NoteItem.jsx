import React, { useContext } from 'react'
import { NoteContext } from '../contexts/NoteState'
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    return (
        <div className="note">
            <h1>{props.note.title}</h1>
            <p>{props.note.description}</p>
            <button onClick={() => { deleteNote(props.note._id) }}><DeleteIcon /></button>
            <button onClick={() => { props.updateNote(props.note) }}><EditNoteIcon /></button>
        </div>
    )
}

export default NoteItem