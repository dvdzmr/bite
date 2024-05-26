// Main grid where widgets will be put in
import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Container} from "react-bootstrap";
import "./css/grid.css"
import Widgets from "./components.widgets.jsx";
import {SpawnGrid} from "../features/grid/Grid.jsx";


export default class Grid extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Container fluid>
                <SpawnGrid/>
            </Container>
        );
    }
}



