// import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import "./css/countdown.css"
import FlipNumbers from 'react-flip-numbers';
import {Col, Dropdown, InputGroup, Row, SplitButton} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {ReactFitty} from "react-fitty";
import Container from "react-bootstrap/Container";

export default function WidgetCountdown(identifier) {
    const [years, setYears] = useState(0);
    const [weeks, setWeeks] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [date, setDate] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [countdownMessage, setCountdownMessage] = useState("your event");
    const [widgetEdit, setWidgetEdit] = useState(false);

    window.addEventListener('editWidgets', () => {
        setWidgetEdit(!widgetEdit);
    })


    const personalCountdownMessage = (e) => {
        e.preventDefault();
        const
            formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries());
        setCountdownMessage(formDataObj.userInput);
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
            {widgetEdit ?
                <Form onSubmit={personalCountdownMessage}>
                    <InputGroup size="md" className="countdown-message">
                        <Form.Control type="text" name="userInput"/>
                        <Button
                            variant="secondary"
                            type="submit"
                            alignRight
                        >Add Message
                        </Button>
                    </InputGroup>
                    <h3>Your message:</h3>
                    <h3>{countdownMessage}</h3>
                </Form>

                :
                <>
                    <Form className="countdown-date-selector" >
                <Form.Group required className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="datetime-local" onChange={handleDate} value={date} />
                </Form.Group>
            </Form>

            { seconds >= 0 ? //making sure we don't display anything if the timer is NaN,
                // seconds are always set when a date is picked.
                <>
                    <Container className="">
                    <ReactFitty className="digitalclock-text">{years !== 0 ? <h1>{String(years)} {years > 1 ? "Years" : "Year"}</h1> : null}</ReactFitty>
                    <ReactFitty className="digitalclock-text">{weeks !== 0 ? <h1>{String(weeks)} {weeks > 1 ? "Weeks" : "Week"}</h1> : null}</ReactFitty>
                    <ReactFitty className="digitalclock-text">{days !== 0 || (days === 0 && weeks > 0) ? <h1>{String(days)} {days > 1 || days === 0 ? "Days" : "Day"}</h1> : null}</ReactFitty>
                    <ReactFitty className="digitalclock-text">{`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</ReactFitty>
                    </Container>

                    <h3><span>Until: {countdownMessage}</span></h3>


                    {/*{countdownMessage === "your event" ?*/}
                {/*<h6 style={{textAlign: "center"}}>Write your own custom message by pressing Edit Widgets up top</h6>:null}*/}
                    </>:null}
                </>
            }
        </>
    )
}
