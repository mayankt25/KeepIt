require("dotenv").config();
import { createContext, useContext, useState } from "react";
import { AlertContext } from "./AlertState";

const host = process.env.REACT_APP_HOST;

const NoteContext = createContext();

const NoteState = (props) => {
    const notesInitial = [];

    const context = useContext(AlertContext);
    const {showAlert} = context;

    const [notes, setNotes] = useState(notesInitial);

    const getNotes = async () => {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      });

      const json = await response.json();
      setNotes(json);
    }


    const addNote = async (title, description) => {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({title, description})
      });

      const json = response.json();
      console.log(json);

      const note = {
        "title": title,
        "description": description
      }

      setNotes(notesInitial.concat(note));
      showAlert("Added Successfully", "success");
    }

    const deleteNote = async (id) => {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      });

      const json = await response.json();
      console.log(json);

      const newNotes = notes.filter((note) => {return note._id !== id;})
      setNotes(newNotes);
      showAlert("Deleted Successfully", "success");
    }

    const editNote = async (id, title, description) => {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({title, description})
      });

      const json = response.json();
      console.log(json);

      for (let i = 0; i < notes.length; i++) {
        const element = notes[i];
        if(element._id === id){
          notes[i].title = title;
          notes[i].description = description;
        }
      }
    }

    return (
        <NoteContext.Provider value={{notes, getNotes, addNote, deleteNote, editNote}}>
        {props.children}
        </NoteContext.Provider>
    )
}

export {NoteState, NoteContext};