// Logic to handle placing and changing widgets
import React from 'react';
import "./css/widgets.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

// Manually add entries from ./widgets/ here
const widgetList = ["Weather", "Stocks", "Clock", "PhotoAlbum"];



export default class Widgets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            showWidget: false,
            widget: null
        }
    }

    render() {
        const showWidgetList = () => {
            this.setState({show: !this.state.show});
        };

        const addSelectedWidget = (widgetName) => {
            console.log("clicked widget:", widgetName);
            this.setState({showWidget: true});
            this.setState({widget: widgetName});
        }

        const showWidgets = () => {
            if (this.state.widget === "Weather") {
                return <h1>Weather</h1>
            }
            if (this.state.widget === "Stocks") {
                return <h1>Stocks</h1>
            }
            if (this.state.widget === "Clock") {
                return <h1>Clock</h1>
            }
            if (this.state.widget === "PhotoAlbum") {
                return <h1>Photo Album</h1>
            }
            return <h1>Error no widget found</h1>
        }
        return (
            <>{!this.state.showWidget?

            <div className={!this.state.show ? "widget-container_default" : "widget-container_clicked"}>
                <Button active={this.state.show} onClick={showWidgetList}><FontAwesomeIcon icon={faPlus}/>
                </Button>
                {this.state.show ? <div className="widget_text">
                <ul className="widget_list">
                    {widgetList.map(function(widget, index) {
                        return <li key={index}> <Button onClick={() => addSelectedWidget(widget)}>{widget}</Button></li>
                    })}
                </ul>
                </div> : null}
            </div>
                : <div>{showWidgets()}</div>}
            </>
        );
    }
}