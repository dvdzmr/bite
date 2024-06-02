import Container from "react-bootstrap/Container";
import {useState, useEffect} from "react";
import {Col, Row} from "react-bootstrap";
import "./css/grid.css"
import Widgets from "./components.widgets.jsx";

//todo: fix UI

export default function Grid() {
    const [rowOne, setRowOne] = useState(3);
    const [rowTwo, setRowTwo] = useState(2);
    const [rowThree, setRowThree] = useState(4);

    useEffect(() => {
        setRowOne(Number(localStorage.getItem("rowOne")));
        setRowTwo(Number(localStorage.getItem("rowTwo")));
        setRowThree(Number(localStorage.getItem("rowThree")));
    }, [rowOne, rowTwo, rowThree]);


    window.addEventListener('rowsAdded', () => {
        window.location.reload();
    })

    return (
        <Container>
            <Row className="grid-row">
                {addRows((isNaN(rowOne))? 3 : rowOne, 1)}
            </Row>
            <Row className="grid-row">
                {addRows((isNaN(rowTwo))? 2 : rowTwo, 2)}
            </Row>
            <Row className="grid-row">
                {addRows((isNaN(rowThree))? 4 : rowThree, 3)}
            </Row>
        </Container>
    )
}


function addRows(colAmount, rowNum) {
    let items = [];
    for (let i = 0; i < colAmount; i++) {
        if (i % 2 === 0) {
            items.push(<Col className="lightgray" key={i}><Widgets id={i} rowNum={rowNum}/></Col>);
        }
        else {
            items.push(<Col className="mediumgray" key={i}><Widgets id={i} rowNum={rowNum}/></Col>);
        }
    }
    return <>{items}</>;
}