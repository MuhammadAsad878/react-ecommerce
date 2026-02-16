import { useEffect, useState } from "react";

export default function Timer(){

    const [time, setTime] = useState({
        days: 1,
        hours: 12,
        minutes: 20,
        seconds: 30
    });

    useEffect(() => {
        const countdown = setInterval(() => {
            setTime((prevTime) => {
                let { days, hours, minutes, seconds } = prevTime;   
                if (seconds > 0) {
                    seconds--;
                }
                else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                }
                else if (hours > 0) {
                    hours--;
                    minutes = 59;   
                    seconds = 59;
                }
                else if (days > 0) {
                    days--;
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }
                else {
                    clearInterval(countdown);
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(countdown);
    }
    , []);
    
    const timeBoxes = [
        {  id:1, label: 'Days',value: time.days },
        {  id:2 ,label: 'Hr', value: time.hours },
        {  id:3 ,label: 'Mins', value: time.minutes },
        {  id:4 ,label: 'Sec', value: time.seconds },
    ];

return(
    <div className="mt-6 w-70 ">
    <p className="text-lg">Hurry, Before It’s Too Late!</p>
    <ul className="flex gap-4  mt-3">
    {
        timeBoxes.map((el)=> (
            <li className="text-center">
            <span
            className="block shadow-md shadow-gray-700/50 text-lg px-4 py-2 rounded tracking-widest"
            key={el.id}>{el.value}</span>
            <label className="block mt-1">{el.label} </label>
            </li>
        ))
    }
    </ul>    
    </div>
)
}