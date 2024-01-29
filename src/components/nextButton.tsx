import { IAction } from "../types";

interface NextButtonProps {
    dispatch: React.Dispatch<IAction>;
    answer?: null | number | undefined;
    selectedQuestion?:number;
    totalQuestions?: number;
    
}
const NextButton = ({dispatch, answer, selectedQuestion, totalQuestions}: NextButtonProps) => {
    if(answer == null){
        return;
    }
    if(selectedQuestion !== totalQuestions! - 1)
    return <button className="btn btn-ui" onClick={() => dispatch({type: "nextQuestion"})}>
        Next
    </button>

    if(selectedQuestion == totalQuestions! - 1){
        return <button className="btn btn-ui" onClick={() => dispatch({ type:"finished"})}> Finish</button>
    }

    
}

export default NextButton;