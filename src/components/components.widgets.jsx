// Logic to handle placing and changing widgets
import React from 'react';
import "./css/widgets.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

export default class Widgets extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="widget-container">
                <Button><FontAwesomeIcon icon={faPlus}/></Button>
            </div>
        );
    }
}