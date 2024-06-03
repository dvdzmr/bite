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
        setRowOne(Number(localStorage.getItem("rowOne")));
        setRowTwo(Number(localStorage.getItem("rowTwo")));
        setRowThree(Number(localStorage.getItem("rowThree")));
    }, [rowOne, rowTwo, rowThree]);


    window.addEventListener('rowsAdded', () => {
        window.location.reload();
    })

    return (
        <Container fluid="xxl">
            <Row style={{aspectRatio: rowOne}} className="grid_styling">
                {addRows((isNaN(rowOne)) ? 3 : rowOne, 1)}
            </Row>
            <Row style={{aspectRatio: rowTwo}} className="grid_styling">
                {addRows((isNaN(rowTwo)) ? 2 : rowTwo, 2)}
            </Row>
            <Row style={{aspectRatio: rowThree}} className="grid_styling">
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
            items.push(<Col style={{backgroundColor: "#454444"}} key={i}><Widgets id={i} rowNum={rowNum}/></Col>);
        } else {
            items.push(<Col style={{backgroundColor: "#6b6a6a"}} key={i}><Widgets id={i} rowNum={rowNum}/></Col>);
        }
    }
    return <>{items}</>;
}
