
import { IAction, IState, STATUS } from "../types";
const SECONDS_PER_QUESTION = 30;

const reducer: React.Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                status: STATUS.READY,
                questions: action.payload?.questions,
                
            }
        case "dataFailed":
            return {
                ...state,
                status: STATUS.ERROR
            }
        case "start":{
            return {
                ...state,
                status: STATUS.ACTIVE,
                secondsRemaining: state.questions!.length * SECONDS_PER_QUESTION
            }
        }
        case "newAnswer":{
            let newPoints = state.points;
            const question = state.questions && state.questions[state.selectedQuestion];
            if(question){
                newPoints = question?.correctOption === action.payload?.answer ? newPoints + question.points : newPoints;
            }
           
            return {
                ...state,
                answer : action.payload?.answer,
                points: newPoints
            }
        }
        case "nextQuestion":{
            return {
                ...state,
                selectedQuestion : state.selectedQuestion + 1,
                answer : null
            }
        }
        case "finished":{
            return {
                ...state,
                status: STATUS.FINISHED,
                highScore: state.points > state.highScore ? state.points : state.highScore
            }
        }
        case "reset":
            return {
                ...state,
                questions: state.questions,
                status: STATUS.READY,
                selectedQuestion: 0,
                answer: null,
                points: 0,
                highScore: state.highScore

            }
        case "tick":{
            return {
                ...state,
                secondsRemaining: state.secondsRemaining && state.secondsRemaining - 1,
                status: state.secondsRemaining == 0 ? state.status = STATUS.FINISHED : state.status = state.status 
            }
        }
    
        default:
            throw new Error("Action unknown")
            
    }
}

export default reducer;