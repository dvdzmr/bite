import React, {useEffect, useRef, useState} from "react";

import "./css/newsfeed.css";
import {ListGroup} from "react-bootstrap";

export default function WidgetNewsFeed(identifier) {
    const [getNews, setGetNews] = useState([
        {
            "article_id": "1909ead1f2309b90025c78a7e4070604",
            "title": "Are diamonds a quantum computer’s best friend?",
            "link": "https://www.computerweekly.com/news/366587897/Are-diamonds-a-quantum-computers-best-friend",
            "keywords": null,
            "creator": null,
            "video_url": null,
            "description": null,
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-06-06 07:41:00",
            "image_url": "https://www.computerweekly.com/visuals/ComputerWeekly/Hero Images/IT-innovation-fotolia_searchsitetablet_520X173.jpg",
            "source_id": "computerweekly",
            "source_priority": 102109,
            "source_url": "https://www.computerweekly.com",
            "source_icon": null,
            "language": "english",
            "country": [
                "united states of america"
            ],
            "category": [
                "technology"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS"
        },
        {
            "article_id": "65b3642c920a2b89bd1e31f7e6b58b5a",
            "title": "Vivo V40 surfaces in official-looking renders with Zeiss-branded cameras",
            "link": "https://www.gizmochina.com/2024/06/06/vivo-v40-renders-specs-leak/",
            "keywords": [
                "news",
                "vivo",
                "vivo v40"
            ],
            "creator": [
                "Rajesh"
            ],
            "video_url": null,
            "description": "The Vivo V family is about to get some new members globally. The Vivo V40 and V40 Pro are expected to arrive soon, and the former has now appeared in official-looking renders, accompanied by key specs. If you remember the design of the V30, you’ll notice that the V40 looks nothing like its predecessor. The [...]The post Vivo V40 surfaces in official-looking renders with Zeiss-branded cameras appeared first on Gizmochina.",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-06-06 07:39:40",
            "image_url": "https://www.gizmochina.com/wp-content/uploads/2024/06/Vivo-V40-renders.jpg",
            "source_id": "gizmochina",
            "source_priority": 22871,
            "source_url": "https://www.gizmochina.com",
            "source_icon": "https://i.bytvi.com/domain_icons/gizmochina.png",
            "language": "english",
            "country": [
                "singapore",
                "united states of america",
                "united kingdom",
                "australia",
                "canada",
                "india"
            ],
            "category": [
                "technology"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS"
        },
        {
            "article_id": "1170503d15d3cafea6a88a7b241973bf",
            "title": "Xbox Game Pass adds two excellent Square Enix RPGs in surprise shadow drop",
            "link": "https://www.trueachievements.com/news/xbox-game-pass-octopath-traveler-2",
            "keywords": null,
            "creator": null,
            "video_url": null,
            "description": "The Octopath Traveler rumors were correct!",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-06-06 07:35:42",
            "image_url": "https://www.trueachievements.com/customimages/carousel/149468.jpg",
            "source_id": "trueachievements",
            "source_priority": 4437,
            "source_url": "https://www.trueachievements.com",
            "source_icon": "https://i.bytvi.com/domain_icons/trueachievements.png",
            "language": "english",
            "country": [
                "united kingdom",
                "canada",
                "australia",
                "india",
                "united states of america",
                "singapore"
            ],
            "category": [
                "technology"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS"
        },
        {
            "article_id": "718b5d53008ded8e5b1d3ace21597174",
            "title": "SpaceX's 4th Starship Flight To Stream Exclusively On X As Elon Musk Consolidates Tech Empire",
            "link": "https://www.benzinga.com/news/24/06/39199344/spacexs-4th-starship-flight-to-stream-exclusively-on-x-as-elon-musk-consolidates-tech-empire",
            "keywords": [
                "elon musk",
                "mobility",
                "news",
                "social media",
                "space",
                "spacex",
                "starship",
                "x",
                "top stories",
                "tech",
                "news",
                "space",
                "social media",
                "top stories",
                "tech",
                "benzinga"
            ],
            "creator": [
                "Anan Ashraf"
            ],
            "video_url": null,
            "description": "The upcoming flight test of SpaceX‘s Starship will be live-streamed only on social media platform X, company CEO Elon Musk said on Wednesday, hinting at increased consolidation across his companies. What Happened: Though Musk is most renowned as the CEO of EV company Tesla, he is also CEO of SpaceX and executive chairman of social media platform X, formerly Twitter. In a move to consolidate the activities across his portfolio of companies, Musk on Wednesday said that the upcoming flight of SpaceX’s Starship will be streamed solely on X. Previously, the company also used to stream some launches on YouTube.The @SpaceX Starship launch tomorrow morning will be live-streamed exclusively on X!— Elon Musk (@elonmusk) June 5, 2024SpaceX is looking to launch the Starship ...Full story available on Benzinga.com",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-06-06 07:35:13",
            "image_url": "https://cdn.benzinga.com/files/images/story/2024/06/06/Elon-Musk-and-SpaceX-Photo-by-Angga-Budh.jpeg?optimize=medium&dpr=1&auto=jpg&height=480&width=720&fit=crop",
            "source_id": "benzinga",
            "source_priority": 3903,
            "source_url": "https://www.benzinga.com",
            "source_icon": "https://i.bytvi.com/domain_icons/benzinga.png",
            "language": "english",
            "country": [
                "united states of america"
            ],
            "category": [
                "technology"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS"
        },
        {
            "article_id": "0353af125db1e83df3bedd1ab9e21bec",
            "title": "A Pilates instructor says these 6 exercises strengthen your abs without weights — so I gave them a try",
            "link": "https://www.tomsguide.com/wellness/fitness/a-pilates-instructor-says-these-6-exercises-strengthen-your-abs-without-weights-so-i-gave-them-a-try",
            "keywords": [
                "fitness",
                "wellness"
            ],
            "creator": [
                "sam.hopes@futurenet.com (Sam Hopes)"
            ],
            "video_url": null,
            "description": "A Pilates instructor shares six abs exercises that strengthen your core and hip flexors without weights, and the routine only takes five minutes. Here's how.",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-06-06 07:30:53",
            "image_url": "https://cdn.mos.cms.futurecdn.net/qHRMChaPeHqnqzfuKvr457.jpg",
            "source_id": "tomsguide",
            "source_priority": 203,
            "source_url": "https://www.tomsguide.com",
            "source_icon": "https://i.bytvi.com/domain_icons/tomsguide.png",
            "language": "english",
            "country": [
                "united states of america"
            ],
            "category": [
                "technology"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS"
        },
        {
            "article_id": "127ab1b01eabae5f4c5aed84f98905e6",
            "title": "Google's privacy chief and head of competition law are leaving, will not be replaced",
            "link": "https://www.techspot.com/community/topics/googles-privacy-chief-and-head-of-competition-law-are-leaving-will-not-be-replaced.286226/",
            "keywords": [
                "techspot news discussion"
            ],
            "creator": [
                "invalid@example.com (midian182)",
                "midian182"
            ],
            "video_url": null,
            "description": null,
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-06-06 07:30:35",
            "image_url": "https://www.techspot.com/images2/news/bigimage/2024/05/2024-05-01-image-13.jpg",
            "source_id": "techspot",
            "source_priority": 8847,
            "source_url": "https://www.techspot.com",
            "source_icon": "https://i.bytvi.com/domain_icons/techspot.png",
            "language": "english",
            "country": [
                "united states of america"
            ],
            "category": [
                "technology"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS"
        },
        {
            "article_id": "3b8fac22e7eeb05d2f2d49179f51b68a",
            "title": "Gigabyte's 'Next-gen' Intel motherboard shows off the new Arrow Lake CPU socket for the first time alongside AMD's X870E",
            "link": "https://www.pcgamer.com/hardware/motherboards/gigabytes-next-gen-intel-motherboard-shows-off-the-new-arrow-lake-cpu-socket-for-the-first-time-alongside-amds-x870e",
            "keywords": [
                "motherboards",
                "hardware"
            ],
            "creator": [
                "dave.james@futurenet.com (Dave James)"
            ],
            "video_url": null,
            "description": "Gigabyte had both new AMD and Intel boards in its VIP suite, and also marked the return of its Project Stealth design.",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-06-06 07:29:41",
            "image_url": "https://cdn.mos.cms.futurecdn.net/FVNHBTL4qBe3cdZ8pWgG9K.jpg",
            "source_id": "pcgamer",
            "source_priority": 571,
            "source_url": "https://www.pcgamer.com",
            "source_icon": "https://i.bytvi.com/domain_icons/pcgamer.png",
            "language": "english",
            "country": [
                "united kingdom",
                "australia",
                "united states of america",
                "canada"
            ],
            "category": [
                "technology"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS"
        },
        {
            "article_id": "94dbf43a38efc0d87db20fcf9b8d7ec6",
            "title": "Microsoft Research chief scientist has no issue with Windows Recall - The Register",
            "link": "https://news.google.com/rss/articles/CBMiQWh0dHBzOi8vd3d3LnRoZXJlZ2lzdGVyLmNvbS8yMDI0LzA2LzA2L21pY3Jvc29mdF9yZXNlYXJjaF9yZWNhbGwv0gFFaHR0cHM6Ly93d3cudGhlcmVnaXN0ZXIuY29tL0FNUC8yMDI0LzA2LzA2L21pY3Jvc29mdF9yZXNlYXJjaF9yZWNhbGwv?oc=5",
            "keywords": null,
            "creator": null,
            "video_url": null,
            "description": "Microsoft Research chief scientist has no issue with Windows Recall The RegisterThis Hacker Tool Extracts All the Data Collected by Windows' New Recall AI WIREDA PR disaster: Microsoft has lost trust with its users, and Windows Recall is the straw that broke the camel's back Windows CentralMicrosoft's AI Recall Feature for Copilot Plus PCs Sees Backlash From Security Experts CNETMicrosoft defends controversial Windows 11 Recall feature – but in a feeble, unconvincing manner TechRadar",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-06-06 07:26:00",
            "image_url": null,
            "source_id": "google",
            "source_priority": 14,
            "source_url": "https://news.google.com",
            "source_icon": "https://i.bytvi.com/domain_icons/google.png",
            "language": "english",
            "country": [
                "united states of america"
            ],
            "category": [
                "technology"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS"
        },
        {
            "article_id": "2e95c2513eea8227a66b2deea0e835ab",
            "title": "FTC Is Reportedly Probing Microsoft’s Deal With Inflection AI",
            "link": "https://www.forbes.com/sites/siladityaray/2024/06/06/ftc-is-reportedly-probing-microsofts-deal-with-inflection-ai/",
            "keywords": [
                "business",
                "/business",
                "business",
                "/business",
                "breaking",
                "breaking-news",
                "topline"
            ],
            "creator": [
                "Siladitya Ray, Forbes Staff",
                "",
                "Siladitya Ray, Forbes Staff",
                "",
                ""
            ],
            "video_url": null,
            "description": "In March, Inflection’s co-founder and CEO joined Microsoft with nearly all of the company’s employees as part of a deal in which the tech giant did not outright buy the startup.",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-06-06 07:23:15",
            "image_url": "https://imageio.forbes.com/specials-images/imageserve/66616311b2fc1255de42c0d1/0x0.jpg?width=960&precrop=1978%2C1113%2Cx0%2Cy17",
            "source_id": "forbes",
            "source_priority": 57,
            "source_url": "https://www.forbes.com",
            "source_icon": "https://i.bytvi.com/domain_icons/forbes.png",
            "language": "english",
            "country": [
                "united states of america"
            ],
            "category": [
                "technology"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS"
        },
        {
            "article_id": "1baf66152955c50b67bcd5117ca95924",
            "title": "YouTube is cracking down on DIY gun content",
            "link": "https://sea.mashable.com/tech/32906/youtube-is-cracking-down-on-diy-gun-content",
            "keywords": [
                "youtube",
                "tech",
                "article"
            ],
            "creator": [
                "Amanda Yeo"
            ],
            "video_url": null,
            "description": "The platform is banning videos showing how to disable safety features on guns.YouTube is age restricting some gun content, as well as banning videos which demonstrate how to remove safety features from firearms. It'll be nowhere near as impactful as finally getting U.S. politicians to implement proper gun control, but at least it's something.As spotted ...",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-06-06 07:22:40",
            "image_url": "https://sm.mashable.com/mashable_sea/article/y/youtube-is/youtube-is-cracking-down-on-diy-gun-content_3dwj.jpg",
            "source_id": "mashable",
            "source_priority": 363,
            "source_url": "https://sea.mashable.com",
            "source_icon": "https://i.bytvi.com/domain_icons/mashable.png",
            "language": "english",
            "country": [
                "india",
                "united states of america",
                "australia",
                "united kingdom",
                "singapore"
            ],
            "category": [
                "technology"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS"
        }
    ]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState('');
    const [widgetHeight, setWidgetHeight] = useState(0);
    let widgetWidth = useRef(null);
    const apiKey = "pub_45264ce1382248d28d83fd1c410d4633ba67e";
    const category = "technology";
    const country = "us";

    useEffect(() => {
        // const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${country}&language=en&category=${category}`;
        // fetch(url)
        //     .then((res) => res.json())
        //     .then((result) => {
        //         setGetNews(result.results);
        //         setIsPending(false);
        //         setError('');
        //     })
        //     .catch((err) => {
        //         setIsPending(false);
        //         setError(err.message);
        //     });
        //
        // console.log(getNews)

    }, []);

    useEffect(() => {
        setWidgetHeight(widgetWidth.current.offsetWidth);
        window.addEventListener("resize", () => setWidgetHeight(widgetWidth.current.offsetWidth));
    }, [widgetWidth.current]);

    return (
        <div ref={widgetWidth} className="newsfeed" style={{height:`${widgetHeight*0.98}px`}}>
            <header>
                {/*{error && <p>{error}</p>}*/}
                {/*{isPending && <p>Page Loading...</p>}*/}


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



