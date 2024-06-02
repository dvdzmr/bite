import Form from 'react-bootstrap/Form';
import "./css/notes.css"
import {useEffect, useState} from "react";


//todo: fix UI
//todo: add all CSS to this file

export default function WidgetNotes(identifier) {

    const [noteText, setNoteText] = useState("");

    let noteStyle = {
        backgroundColor: '#f0f037',
        height: '90%',
        resize: 'none'
    }

    const saveText = (t) => {
        // console.log(t.target.value);
        localStorage.setItem("notes_text" + identifier.identifier, JSON.stringify(t.target.value));
    }

    useEffect(() => {
        const rawData = localStorage.getItem("notes_text" + identifier.identifier);
        if (rawData === null) return localStorage.setItem("notes_text" + identifier.identifier, "")
        else setNoteText(rawData)
    }, []);

    return (
        <div className="widget-notes">
            <Form.Control as="textarea" style={noteStyle} onKeyUp={(t) => saveText(t)} defaultValue={noteText.substring(1, noteText.length - 1)} />
        </div>
    )
}