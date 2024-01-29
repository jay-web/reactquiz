import { IAction, IQuestion } from "../types";
import Options from "./options";

interface QuestionProps {
    question: IQuestion,
    dispatch: React.Dispatch<IAction>,
    answer?: number | null 
}
const Question  = ({ question, dispatch, answer }: QuestionProps) => {
    const {question: quest} = question;
    

    return <div>
        <h4>{quest} </h4>
        <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
}

export default Question;