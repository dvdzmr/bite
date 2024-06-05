import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import Widgets from "./components.widgets.jsx";
import "./css/grid.css"

export default function Grid() {
    const [rowOne, setRowOne] = useState(3);
    const [rowTwo, setRowTwo] = useState(2);
    const [rowThree, setRowThree] = useState(4);


    useEffect(() => {
        if (localStorage.getItem("rowOne") !== null) setRowOne(Number(localStorage.getItem("rowOne")));
        if (localStorage.getItem("rowTwo") !== null) setRowTwo(Number(localStorage.getItem("rowTwo")));
        if (localStorage.getItem('rowThree') !== null) setRowThree(Number(localStorage.getItem("rowThree")));
    }, [rowOne, rowTwo, rowThree]);


    window.addEventListener('rowsAdded', () => {
        window.location.reload();
    })

    return (
        <Container fluid="xxl">
            <Row style={{aspectRatio: rowOne}} className="grid-styling">
                {addRows((isNaN(rowOne)) ? 3 : rowOne, 1)}
            </Row>
            <Row style={{aspectRatio: rowTwo}} className="grid-styling">
                {addRows((isNaN(rowTwo)) ? 2 : rowTwo, 2)}
            </Row>
            <Row style={{aspectRatio: rowThree}} className="grid-styling">
                {addRows((isNaN(rowThree)) ? 4 : rowThree, 3)}
            </Row>
        </Container>
    )
}


function addRows(colAmount, rowNum) {
    let items = [];
    // Setting alternating background colors for better visiblity
    for (let i = 0; i < colAmount; i++) {
        if (i % 2 === 0) {
            items.push(<Col className="grid-column checker-light" key={i}><Widgets id={i} rowNum={rowNum}/></Col>);
        } else {
            items.push(<Col className="grid-column checker-dark" key={i}><Widgets id={i} rowNum={rowNum}/></Col>);
        }
    }
    return <>{items}</>;
}
