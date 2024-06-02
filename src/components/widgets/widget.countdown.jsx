// import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";

//todo: fix UI
//todo: add all CSS to this file

export default function WidgetCountdown(identifier) {
    const [years, setYears] = useState(0);
    const [weeks, setWeeks] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [date, setDate] = useState(undefined);


    useEffect(() => {
        if (date !== undefined) localStorage.setItem("countdown" + identifier.identifier, JSON.stringify(date));
        handleInputChange(date);
    }, [date]);


    useEffect(() => {
        const countdownRaw = localStorage.getItem("countdown" + identifier.identifier);
        setDate(countdownRaw != null ? JSON.parse(countdownRaw) : []);
    }, []);

    useEffect(() => {
        window.addEventListener("storage", storage => {
            setDate(storage.newValue === null ? [] : JSON.parse(storage.newValue));
        })
    }, [])

    const handleInputChange = (e) => {
        const time = Date.parse(e) - Date.parse(new Date());
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

    return (
        <>
            <Form>
                <Form.Group required className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Countdown</Form.Label>
                    <Form.Control type="datetime-local" onChange={handleDate} value={date} />
                </Form.Group>
                {/*<Button type="submit">Countdown!</Button>*/}
            </Form>

            <div>
                {years !== 0 ? <div>{String(years).padStart(2, '0')} {years > 1? "Years" : "Year"}</div>:null}
                {weeks !== 0 ? <div>{String(weeks).padStart(2, '0')} {weeks > 1? "Weeks" : "Week"}</div>:null}
                {days !== 0 || (days === 0 && weeks > 0) ? <div>{String(days).padStart(2, '0')} {days > 1? "Days" : "Day"}</div>:null}
                <div>{String(hours).padStart(2, '0')} {hours > 1? "Hours" : "Hour"}</div>
                <div>{String(minutes).padStart(2, '0')} {minutes > 1? "Minutes" : "Minute"}</div>
                <div>{String(seconds).padStart(2, '0')} {seconds > 1? "Seconds" : "Second"}</div>
            </div>


        </>
    )
}