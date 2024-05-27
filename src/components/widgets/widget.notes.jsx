import Form from 'react-bootstrap/Form';
import "./css/notes.css"
import React from "react";


export default function WidgetNotes(height) {

    let totalHeight = (height.height/3) * 0.95

    let noteStyle = {
        backgroundColor: '#f0f037',
        height: `${totalHeight}px`,
        resize: 'none'
    }

    return (
        <div className="widget-notes">
            <Form.Control as="textarea" style={noteStyle}/>
        </div>
    )
}