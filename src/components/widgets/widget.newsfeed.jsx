import React, {useEffect, useRef, useState} from "react";

import "./css/newsfeed.css";
import {ListGroup} from "react-bootstrap";

export default function WidgetNewsFeed(identifier) {
    const [getNews, setGetNews] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState('');
    const [widgetHeight, setWidgetHeight] = useState(0);
    let widgetWidth = useRef(null);
    const apiKey = "pub_45264ce1382248d28d83fd1c410d4633ba67e";
    const category = "technology";
    const country = "us";

    useEffect(() => {
        const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${country}&language=en&category=${category}`;
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                setGetNews(result.results);
                setIsPending(false);
                setError('');
            })
            .catch((err) => {
                setIsPending(false);
                setError(err.message);
            });
    }, []);

    useEffect(() => {
        setWidgetHeight(widgetWidth.current.offsetWidth);
        window.addEventListener("resize", () => setWidgetHeight(widgetWidth.current.offsetWidth));
    }, [widgetWidth.current]);

    return (
        <div ref={widgetWidth} className="newsfeed" style={{height:`${widgetHeight*0.98}px`}}>
            <header>
                {error && <p>{error}</p>}
                {isPending && <p>Page Loading...</p>}
                <ListGroup className="layout">
                    {getNews.map((item, index) => (
                        <ListGroup.Item
                            key={index}
                            action
                            href={item.link}
                            target='_blank'
                        >
                            <h2><b>{item.title}</b></h2><hr/>
                            <h5>{item.description}</h5>
                            <i>{item.pubDate}</i>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </header>
        </div>
    );
}



