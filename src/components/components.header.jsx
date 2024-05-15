// Header and (google) searchbar
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import {Container} from "react-bootstrap";
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./css/header.css"

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar className="bg-body-secondary navigation">
                <Container >
                    <NavDropdown title="Search Provider" id="navbarScrollingDropdown" className="justify-content-end">
                        <NavDropdown.Item href="#action3">Google</NavDropdown.Item>
                        <NavDropdown.Item href="#action3">DuckDuckGo</NavDropdown.Item>
                        <NavDropdown.Item href="#action3">Bing</NavDropdown.Item>
                    </NavDropdown>
                </Container>

                <Container className="justify-content-center align-items-center">
                        <Form inline>
                            <Row>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Internet search"
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button type="submit">Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
            </Navbar>
        )
    }
}