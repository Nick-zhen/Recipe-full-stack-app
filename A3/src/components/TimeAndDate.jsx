import React, { useEffect, useState } from 'react'

function TimeAndDate() {
    const [dateTime, setDateTime] = useState(new Date());
    useEffect(() => {
        // The setInterval() method calls a function at specified intervals (in milliseconds).
        setInterval(() => setDateTime(new Date()), 1000);
    }, []);
    return (
            <div>
                Time: {dateTime.toLocaleTimeString()}
            </div>
        )   
    }

export default TimeAndDate
