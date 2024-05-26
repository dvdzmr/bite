import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import {Container, DropdownButton, Dropdown} from "react-bootstrap";
import "./css/header.css"
import {useDispatch} from "react-redux";
import {setRowOne} from "./gridReducer.jsx";
import {CreatingGrid} from "../features/grid/Grid.jsx";


export default function Header() {

    const [searchProvider, setSearchProvider] = React.useState("DuckDuckGo");
    const [searchUrl, setSearchUrl] = React.useState("https://duckduckgo.com/?q=");
    const [searchQuery, setSearchQuery] = React.useState(null);

    return (
        <>
        <Navbar className="bg-body-secondary navigation">
            <Container >
                <DropdownButton title="Search Provider">
                    <Dropdown.Item as="button"
                                   onClick={() => {setSearchProvider("Google"); setSearchUrl("https://www.google.com/search?q=")}}>Google</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => {setSearchProvider("Bing"); setSearchUrl("https://www.bing.com/search?q=")}}>Bing</Dropdown.Item>
                    <Dropdown.Item as="button"
                                   onClick={() => {setSearchProvider("DuckDuckGo"); setSearchUrl("https://duckduckgo.com/?q=")}}>DuckDuckGo</Dropdown.Item>
                </DropdownButton>
            </Container>

            <Container className="">
                <CreatingGrid/>
            </Container>

            <Container className="justify-content-center align-items-center">
                    <Form inline="true">
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={searchProvider + " search"}
                                    onChange={ (e) => setSearchQuery(e.target.value)}
                                />
                            </Col>
                            <Col xs="auto">
                                <Button type="submit" onClick={() => window.open(searchUrl+searchQuery, '_blank')}>Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
        </Navbar>
        </>
    )
}






