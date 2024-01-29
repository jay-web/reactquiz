import { useState } from "react";
import { IAction, IQuestion } from "../types";

interface OptionsProps {
  question: IQuestion;
  dispatch: React.Dispatch<IAction>;
  answer?: number | null 
}

const Options = ({ question, dispatch , answer}: OptionsProps) => {
  const { options, correctOption } = question;
  const hasAnswered = answer;
  const [selectedId, setSelectedId] = useState<null | number>(null);

  const handleClick = (index:number) => {
    setSelectedId(index);
    dispatch({ type: "newAnswer", payload: {answer: index} })
  }

  return (
    <div className="options">
      {options.map((option, index) => (
        <button 
            key={option}
            className={`btn btn-option ${hasAnswered == null ? "" : correctOption === index ? "correct" : ""} ${(hasAnswered != null && correctOption !== selectedId && selectedId == index) ? "answer-wrong" : ""}`}
            disabled={hasAnswered !== null && true}
            onClick={() => handleClick(index)}
            >{option}</button>
      ))}
    </div>
  );
};

export default Options;
