import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from 'react';
import {Container, DropdownButton, Dropdown} from "react-bootstrap";
import "./css/header.css"


export default function Header() {
    const [searchProvider, setSearchProvider] = useState("DuckDuckGo");
    const [searchUrl, setSearchUrl] = useState("https://duckduckgo.com/?q=");
    const [searchQuery, setSearchQuery] = useState(null);

    const [background, setBackground] = useState(() => {
        const saved = localStorage.getItem("SearchBarImage");
        return saved || "linear-gradient(to right,#823604,#f96400)";
    });

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
        localStorage.setItem("SearchBarImage", background)
    }, [rowOne, rowTwo, rowThree, background]);


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
            {/*settings*/}
            <Navbar bg="dark" >
                    {/*Set edit widget mode*/}
                    <Button variant="dark" size="sm" onClick={editWidgets}>Edit Widgets</Button>

                    {/*Set search engine*/}
                    <DropdownButton title="Search Provider" size="sm" variant="dark">
                        <Dropdown.Item as="button"
                                       onClick={() => {setSearchProvider("Google"); setSearchUrl("https://www.google.com/search?q=")}}>Google</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {setSearchProvider("Bing"); setSearchUrl("https://www.bing.com/search?q=")}}>Bing</Dropdown.Item>
                        <Dropdown.Item as="button"
                                       onClick={() => {setSearchProvider("DuckDuckGo"); setSearchUrl("https://duckduckgo.com/?q=")}}>DuckDuckGo</Dropdown.Item>
                    </DropdownButton>

                    {/*Set grid layout*/}
                    <DropdownButton title="Grid layout" size="sm" variant="dark">
                        <Dropdown.Item as="button" onClick={() => SetGrid(2,4,3)}>2x4x3</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => SetGrid(3,3,3)}>3x3x3</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => SetGrid(4,2,3)}>4x2x3</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => SetGrid(5,1,3)}>5x1x3</Dropdown.Item>
                    </DropdownButton>

                    {/*Searchbar background*/}
                <DropdownButton title="Background" size="sm" variant="dark">
                    <Dropdown.Item as="button" onClick={() => setBackground("linear-gradient(to right,#823604,#f96400)")}>Orange gradient</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setBackground("linear-gradient(to right,#91A6FF,#5078F2)")}>Blue gradient</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setBackground("url('https://images.pexels.com/photos/1310755/pexels-photo-1310755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')")}>Forest</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setBackground("url('https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')")}>Stars</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setBackground("url('https://images.pexels.com/photos/748626/pexels-photo-748626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')")}>Moon</Dropdown.Item>
                </DropdownButton>
            </Navbar>

            {/*Search bar*/}
            <Navbar className="navigation" style={{backgroundImage: `${background}`}}>
                <Container className="justify-content-center align-items-center">
                    <Form inline="true">
                        <Row>
                            <Col data-bs-theme="light">
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder={searchProvider + " search"}
                                    onChange={ (e) => setSearchQuery(e.target.value)}
                                />
                            </Col>
                            <Col xs="auto" >
                                <Button size="lg" variant="secondary" type="submit" onClick={() => window.open(searchUrl+searchQuery, '_blank')}>Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Navbar>
        </>
    )
}




