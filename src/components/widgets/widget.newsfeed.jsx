import React, {useEffect, useRef, useState} from "react";

import "./css/newsfeed.css";

//todo: fix UI
//todo: add all CSS to this file

export default function WidgetNewsFeed() {
    const [getNews, setGetNews] = useState([]);
    const [isPending, setIsPending] = useState(true);
    //TODO: replace null with empty value maybe '' ?
    const [error, setError] = useState(null);
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
                setError(null);
            })
            .catch((err) => {
                setIsPending(false);
                setError(err.message);
            });
    }, []);

    return (
        <div className="newsfeed">
            <header>
                {error && <p>{error}</p>}
                {isPending && <p>Page Loading...</p>}

                <div className="layout">
                    {getNews.map((item, index) => (
                        <div key={index} className="content">
                            <h3>
                                <a href={item.link}>{item.title}</a>
                            </h3>
                            {/*<p>*/}
                            {/*    <i>{item.pubDate}</i>*/}
                            {/*</p>*/}
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );
}