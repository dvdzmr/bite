// import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import "./css/countdown.css"
import FlipNumbers from 'react-flip-numbers';
import {Col, Row} from "react-bootstrap";

export default function WidgetCountdown(identifier) {
    const [years, setYears] = useState(0);
    const [weeks, setWeeks] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [date, setDate] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [countdownMessage, setCountdownMessage] = useState("Until ...");
    const [widgetEdit, setWidgetEdit] = useState(false);

    window.addEventListener('editWidgets', () => {
        setWidgetEdit(!widgetEdit);
    })


    const personalCountdownMessage = (e) => {
        console.log(e.target.value);
        setCountdownMessage(e.target.value)
        localStorage.setItem("countdown_message_" + identifier.identifier, countdownMessage);
    }

    useEffect(() => {
        if (date !== '') localStorage.setItem("countdown" + identifier.identifier, JSON.stringify(date));
        handleInputChange(date);

        let countdownMessage = localStorage.getItem("countdown_message_" + identifier.identifier);
        if (countdownMessage !== null)
            setCountdownMessage(countdownMessage);

    }, [date]);

    useEffect(() => {
        const countdownRaw = localStorage.getItem("countdown" + identifier.identifier);
        setDate(countdownRaw != null ? JSON.parse(countdownRaw) : []);
        setInterval(updateDate, 1000);
    }, []);

    useEffect(() => {
        handleInputChange(date);
    }, [currentDate]);


    const handleInputChange = (e) => {
        let time
        if (currentDate !== '') time = Date.parse(e) - currentDate;
        else time = Date.parse(e) - Date.parse(new Date());

        if (time < 0) {
            setDays(0);
            setHours(0);
            setMinutes(0);
            setSeconds(0);
        } else {
            setYears(Math.floor(time / (1000 * 60 * 60 * 24 * 7 * 52)));
            setWeeks(Math.floor(time / (1000 * 60 * 60 * 24 * 7))%52);
            setDays(Math.floor(time / (1000 * 60 * 60 * 24))%7);
            setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
            setMinutes(Math.floor((time / 1000 / 60) % 60));
            setSeconds(Math.floor((time / 1000) % 60));
        }
    };


    const handleDate = (e) => {
        setDate(e.target.value);
    }

    const updateDate = () => {
        setCurrentDate(new Date())
    }


    return (
        <>
            {widgetEdit ? <Form.Control
                    type="text"
                    placeholder="Countdown message"
                    className="countdown-message"
                    // onChange={personalCountdownMessage}
                    onKeyUp={(t) => personalCountdownMessage(t)}
                />
                :
            <>
            <Form className="countdown-date-selector" >
                <Form.Group required className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="datetime-local" onChange={handleDate} value={date} />
                </Form.Group>
            </Form>

            <div>
                <FlipNumbers
                    height={30}
                    width={20}
                    color="white"
                    background="grey"
                    play
                    perspective={400}
                    numbers={`${String(hours).padStart(2, '0')} | ${String(minutes).padStart(2, '0')} | ${String(seconds).padStart(2, '0')}`}
                />

                {years !== 0 ? <h1>{String(years)} {years > 1 ? "Years" : "Year"}</h1> : null}
                {weeks !== 0 ? <h1>{String(weeks)} {weeks > 1 ? "Weeks" : "Week"}</h1> : null}
                {days !== 0 || (days === 0 && weeks > 0) ?
                    <h1>{String(days)} {days > 1 || days === 0 ? "Days" : "Day"}</h1> : null}

                <br/>
                <h3 style={{textAlign: "center"}}>{countdownMessage}</h3>

                {countdownMessage === "Until ..." ?
                <h6 style={{textAlign: "center"}}>Write your own custom message by pressing Edit Widgets up top</h6>:null}

            </div>
            </>
            }
        </>
    )
}
