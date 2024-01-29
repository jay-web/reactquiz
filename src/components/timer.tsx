import { useEffect } from "react";
import { IAction } from "../types";

interface TimerProps {
    dispatch: React.Dispatch<IAction>
    secondsRemaining: number | null
}

const Timer = ({ dispatch, secondsRemaining}: TimerProps) => {
    const minutes = secondsRemaining && Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining && secondsRemaining % 60;

    useEffect(() => {
        let id = setInterval(() => {
            dispatch({type: "tick"});
        }, 1000);

        return () => clearInterval(id);
    }, [dispatch]);


    return <div className="timer">
       {minutes !== null && minutes < 10 && "0"}{minutes}:
       {seconds !== null && seconds < 10 && "0"}{seconds}
    </div>
}


export default Timer;