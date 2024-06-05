// Logic to handle placing and changing widgets
import {useState} from 'react';
import "./css/widgets.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Weather from "./widgets/widget.weather.jsx";
import WidgetClock from "./widgets/widget.clock.jsx";
import WidgetNotes from "./widgets/widget.notes.jsx";
import WidgetCountdown from "./widgets/widget.countdown.jsx";
import WidgetPhotoalbum from "./widgets/widget.photoalbum.jsx";
import WidgetTodo from "./widgets/widget.todo.jsx";
import {ListGroup} from "react-bootstrap";
import {CloseButton} from "react-bootstrap";

// Manually add entries from ./widgets/ here
const widgetList = ["Weather", "Clock", "Carousel", "Notes", "CountDown", "News", "ToDo"];


export default function Widgets(id) {
    const [showList, setShowList] = useState(false);
    const [showWidget, setShowWidget] = useState(false);
    const gridName = "grid_" + id.id + "_" + id.rowNum;
    const [showCloseWidget, setShowCloseWidget] = useState(false);

    const [widget, setWidget] = useState(() => {
        let saved = null;
        if (widgetList.includes(localStorage.getItem(gridName))) {
            saved = localStorage.getItem(gridName);
            setShowWidget(true);
        }
        // console.log("saved " + gridName, saved);
        return saved;
    });


    const showWidgetList = () => {
        setShowList(!showList);
    };

    const addSelectedWidget = (widgetName) => {
        setShowWidget(true);
        setWidget(widgetName);
        localStorage.setItem(gridName, widgetName);
    }

    const removeWidget = () => {
        setShowWidget(false);
        setWidget(null);
        localStorage.setItem(gridName, null);
    }

    const showWidgets = () => {
        // console.log("Current widget:", widget);
        if (widget === "Weather") {
            return <Weather identifier={gridName}/>
            // return <h1>Weather</h1>
        }
        if (widget === "Clock") {
            return <WidgetClock identifier={gridName}/>
            // return <h1>Clock</h1>
        }
        if (widget === "Carousel") {
            return <WidgetPhotoalbum identifier={gridName}/>
            // return <h1>Photo Album</h1>
        }
        if (widget === "Notes") {
            return <WidgetNotes identifier={gridName}/>
            // return <h1>Notes</h1>
        }
        if (widget === "CountDown") {
            return <WidgetCountdown identifier={gridName}/>
            // return <h1>CountDown</h1>
        }
        if (widget === "News") {
            // return <WidgetNewsFeed identifier={gridName}/>
            return <h1>News</h1>
        }
        if (widget === "ToDo") {
            return <WidgetTodo identifier={gridName}/>
            // return <h1>Todoapp</h1>
        }
        return <h1>Error no widget found</h1>
    }

    // use useEffect
    window.addEventListener('editWidgets', () => {
        setShowCloseWidget(!showCloseWidget);
    })


    return (
        <>
            {!showWidget ?
                <div className="widget-button"  style={{top: !showList ? "50%" : "20%"}}>
                    <Button variant="dark" active={showList} onClick={showWidgetList}><FontAwesomeIcon icon={faPlus}/>
                    </Button>
                    {showList ? <div className="widget_text">
                        <ul className="widget_list">
                            {widgetList.map(function(widget, index) {
                                return <li
                                    key={index}
                                    // style={{float: "left"}}
                                >
                                    <ListGroup defaultActiveKey="#link1" variant="flush" data-bs-theme="dark">
                                        <ListGroup.Item action onClick={() => addSelectedWidget(widget)}>
                                            {widget}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </li>
                            })}
                        </ul>
                    </div> : null}
                </div>
                :
                <div className="widget-container">
                    {showWidgets()}
                    {showCloseWidget ?
                        <Button aria-label="Close Widget"
                                className="widget_remove_button"
                                variant="danger"
                                onClick={removeWidget}>X</Button> : null }
                </div>}
        </>
    );
}