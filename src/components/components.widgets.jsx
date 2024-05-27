// Logic to handle placing and changing widgets
import React, {useEffect, useState} from 'react';
import "./css/widgets.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Weather from "./widgets/widget.weather.jsx";
import WidgetClock from "./widgets/widget.clock.jsx";
import WidgetNotes from "./widgets/widget.notes.jsx";

// Manually add entries from ./widgets/ here
const widgetList = ["Weather", "Stocks", "Clock", "PhotoAlbum", "Notes"];



export default function Widgets() {
    const [showList, setShowList] = React.useState(false);
    const [showWidget, setShowWidget] = React.useState(false);
    const [widget, setWidget] = React.useState(null);


    const showWidgetList = () => {
        setShowList(!showList);
    };

    const addSelectedWidget = (widgetName) => {
        console.log("clicked widget:", widgetName);
        setShowWidget(true);
        setWidget(widgetName);
    }

    const showWidgets = (width, height) => {
        if (widget === "Weather") {
            return <Weather width={width} height={height} />
        }
        if (widget === "Stocks") {
            return <h1>Stocks</h1>
        }
        if (widget === "Clock") {
            return <WidgetClock width={width} height={height}/>
        }
        if (widget === "PhotoAlbum") {
            return <h1>Photo Album</h1>
        }
        if (widget === "Notes") {
            return <WidgetNotes height={height}/>
        }
        return <h1>Error no widget found</h1>
    }


    const useSize = () => {
        const [windowSize, setWindowSize] = useState([
            window.innerHeight,
            window.innerWidth,
        ]);

        useEffect(() => {
            const windowSizeHandler = () => {
                setWindowSize([window.innerWidth, window.innerHeight]);
            };
            window.addEventListener("resize", windowSizeHandler);

            return () => {
                window.removeEventListener("resize", windowSizeHandler);
            };
        }, []);

        return windowSize;
    };

    const windowSize = useSize();

    return (
        <>
            {!showWidget ?
                <div className={!showList ? "widget-container_default" : "widget-container_clicked"}>
                    <Button active={showList} onClick={showWidgetList}><FontAwesomeIcon icon={faPlus}/>
                    </Button>
                    {showList ? <div className="widget_text">
                        <ul className="widget_list">
                            {widgetList.map(function(widget, index) {
                                return <li key={index}> <Button onClick={() => addSelectedWidget(widget)}>{widget}</Button></li>
                            })}
                        </ul>
                    </div> : null}
                </div>
                : <div>{showWidgets(windowSize[0], windowSize[1])}</div>}
        </>
    );
}
