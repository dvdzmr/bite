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
                    <Col className="lightgray"><Widgets/></Col>
                    <Col className="mediumgray"><Widgets/></Col>
                </Row>
                <Row className="second_row">
                    <Col className="lightgray"><Widgets/></Col>
                    <Col className="mediumgray"><Widgets/></Col>
                    <Col className="lightgray"><Widgets/></Col>
                </Row>
            </Container>
        );
    }
}