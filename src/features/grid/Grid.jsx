import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setRowOne, setRowThree, setRowTwo} from './gridSlice'
import { DropdownButton, Dropdown} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Widgets from "../../components/components.widgets.jsx";

export function CreatingGrid() {
    const dispatch = useDispatch()

    function SetGrid(rowOne, rowTwo, rowThree) {
        dispatch(setRowOne(rowOne));
        dispatch(setRowTwo(rowTwo));
        dispatch(setRowThree(rowThree));
    }

    return (
        <DropdownButton title="Grid layout">
            <Dropdown.Item as="button" onClick={() => SetGrid(2,4,3)}>2x4x3</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => SetGrid(3,3,3)}>3x3x3</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => SetGrid(4,2,3)}>4x2x3</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => SetGrid(5,1,3)}>5x1x3</Dropdown.Item>
        </DropdownButton>
    )
}

export function SpawnGrid() {
    const grid = useSelector((state) => state.grid)
    const rowStyle = { height: '35vh', padding: '5px 0' };
    return (
        <>
        <div>grid info: {grid.rowOne} {grid.rowTwo} {grid.rowThree}</div>
        <Row style={rowStyle}>

            {addRows(grid.rowOne)}
        </Row>
        <Row style={rowStyle}>
            {addRows(grid.rowTwo)}
        </Row>
        <Row style={rowStyle}>
            {addRows(grid.rowThree)}
        </Row>
        </>
    )
}

function addRows(rowNumber) {
    let items = [];
    for (let i = 0; i < rowNumber; i++) {
        if (i % 2 === 0) {
            items.push(<Col className="lightgray" key={i}><Widgets/></Col>);
        }
        else {
            items.push(<Col className="mediumgray" key={i}><Widgets/></Col>);
        }
    }
    return <>{items}</>;
}