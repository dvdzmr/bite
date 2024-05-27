import React, {useEffect, useState} from 'react';
import ScaleText from "react-scale-text";
import './css/clock.css';


export default function WidgetClock(width, height) {

    // console.log(width, height)
    let time  = new Date().toLocaleTimeString()

    const [ctime,setTime] = useState(time)
    const UpdateTime=()=>{
        time =  new Date().toLocaleTimeString()
        setTime(time)
    }
    setInterval(UpdateTime)


    // console.log("size of this window:", width, height);
    return (
        <div style={{ width: `${width}px`, height: `${height}px` }}>
            <ScaleText maxFontSize={200}>
                {ctime}
            </ScaleText>
        </div>

)
}
