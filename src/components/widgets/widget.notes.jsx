import Form from 'react-bootstrap/Form';
import "./css/notes.css"
import {useEffect, useRef, useState} from "react";

//todo: add overview of all notes when in edit widget mode


export default function WidgetNotes(identifier) {

    const [noteText, setNoteText] = useState("");
    const [widgetHeight, setWidgetHeight] = useState(undefined);
    let widgetWidth = useRef(null);

    let noteStyle = {
        backgroundColor: '#f0f037',
        height: `${widgetHeight*0.98}px`,
        resize: 'none',
        color: "black",
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

    useEffect(() => {
        setWidgetHeight(widgetWidth.current.offsetWidth);
        window.addEventListener("resize", () => setWidgetHeight(widgetWidth.current.offsetWidth));
    }, [widgetWidth.current]);

    return (
        <div className="widget-notes">
            <Form.Control ref={widgetWidth} as="textarea" style={noteStyle} onKeyUp={(t) => saveText(t)} defaultValue={noteText.substring(1, noteText.length - 1)} />
        </div>
    )
}