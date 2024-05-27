// Main grid where widgets will be put in
import React from 'react';
import {Container} from "react-bootstrap";
import "./css/grid.css"
import {SpawnGrid} from "../features/grid/Grid.jsx";


export default function Grid() {

    return (
        <Container fluid>
            <SpawnGrid/>
        </Container>
    );
}



