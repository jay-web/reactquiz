import { IAction } from "../types";


interface FinishScreenProps {
    dispatch: React.Dispatch<IAction>;
    points: number,
    totalPoints: number,
    highScore:number
}

const FinishScreen = ({points, totalPoints, highScore, dispatch}: FinishScreenProps) => {
    const percentageScore = Math.ceil((points / totalPoints) * 100);
    let emoji;
    if(percentageScore == 100) emoji = "🥇";
    if(percentageScore >=80 && percentageScore < 100) emoji = "🎉🎉";
    if(percentageScore >=60 && percentageScore < 80) emoji = "🤔";
    if(percentageScore >=0 && percentageScore < 60) emoji = "🤦‍♀️🤦‍♂️";

    return <>
    <p className="result">
        {emoji} You have scored {points} out of {totalPoints} ({percentageScore} %)
    </p>
    <p className="highscore">Highscore: {highScore}</p>
    <button onClick={() => dispatch({ type: "reset"})} className="btn btn-ui">Restart Quiz</button>
    </>
}

export default FinishScreen;