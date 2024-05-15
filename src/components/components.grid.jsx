// Main grid where widgets will be put in
import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Container} from "react-bootstrap";
import "./css/grid.css"
import Widgets from "./components.widgets.jsx";

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid>
                <Row className="first_row">
                    <Col className="red"><Widgets/></Col>
                    <Col className="blue"><Widgets/></Col>
                </Row>
                <Row className="second_row">
                    <Col className="red"><Widgets/></Col>
                    <Col className="blue"><Widgets/></Col>
                    <Col className="green"><Widgets/></Col>
                </Row>
            </Container>
        );
    }
}