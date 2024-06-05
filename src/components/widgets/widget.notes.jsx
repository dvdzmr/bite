import Form from 'react-bootstrap/Form';
import "./css/notes.css"
import {useEffect, useRef, useState} from "react";

//todo: add overview of all notes when in edit widget mode


export default function WidgetNotes(identifier) {

    const [noteText, setNoteText] = useState("");
    const [noteOpacity, setNoteOpacity] = useState(1);
    const [widgetHeight, setWidgetHeight] = useState(0);
    let widgetWidth = useRef(null);

    let noteStyle = {
        backgroundColor: '#f0f037',
        height: `${widgetHeight*0.98}px`,
        resize: 'none',
        color: "black",
        opacity: `${noteOpacity}`
    }

    //todo: if i add a note overview on editwidgets, remove opacity changes
    window.addEventListener('editWidgets', () => {
        noteOpacity === 1 ? setNoteOpacity(0.3) : setNoteOpacity(1);
    })

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
            <Form.Control
                ref={widgetWidth}
                as="textarea"
                style={noteStyle}
                onKeyUp={(t) => saveText(t)}
                defaultValue={noteText.substring(1, noteText.length - 1)} />
        </div>
    )
}