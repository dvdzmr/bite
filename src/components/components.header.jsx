import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from 'react';
import {Container, DropdownButton, Dropdown} from "react-bootstrap";
import "./css/header.css"
// import {CreatingGrid} from "../features/grid/Grid.jsx";

//todo: fix UI

export default function Header() {
    const [searchProvider, setSearchProvider] = useState("DuckDuckGo");
    const [searchUrl, setSearchUrl] = useState("https://duckduckgo.com/?q=");
    const [searchQuery, setSearchQuery] = useState(null);

    const [rowOne, setRowOne] = useState(() => {
        const saved = localStorage.getItem("rowOne");
        let initialValue = JSON.parse(saved);
        return initialValue || null;
    });

    const [rowTwo, setRowTwo] = useState(() => {
        const saved = localStorage.getItem("rowTwo");
        let initialValue = JSON.parse(saved);
        return initialValue || null;
    });

    const [rowThree, setRowThree] = useState(() => {
        const saved = localStorage.getItem("rowThree");
        let initialValue = JSON.parse(saved);
        return initialValue || null;
    });


    useEffect(() => {
        localStorage.setItem("rowOne", rowOne);
        localStorage.setItem("rowTwo", rowTwo);
        localStorage.setItem("rowThree", rowThree);
    }, [rowOne, rowTwo, rowThree]);


    const SetGrid = (first, second, third) => {
        setRowOne(first);
        setRowTwo(second);
        setRowThree(third);
        window.dispatchEvent(new Event("rowsAdded"));
    }

    const editWidgets = () => {
        window.dispatchEvent(new Event("editWidgets"));
    }

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
                    <DropdownButton title="Grid layout">
                        <Dropdown.Item as="button" onClick={() => SetGrid(2,4,3)}>2x4x3</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => SetGrid(3,3,3)}>3x3x3</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => SetGrid(4,2,3)}>4x2x3</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => SetGrid(5,1,3)}>5x1x3</Dropdown.Item>
                    </DropdownButton>
                </Container>

                <Container>
                    <Button onClick={editWidgets}>Edit Widgets</Button>
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




