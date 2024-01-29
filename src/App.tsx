import { useEffect, useReducer } from "react";

// import './App.css'

import { questions } from "./data/questions";
import reducer from "./reducer/reducer";
import Header from "./components/header";
import Main from "./components/main";
import Loader from "./components/loader";
import Error from "./components/error";
import StartScreen from "./components/startScreen";
import Question from "./components/question";
import { IState, STATUS } from "./types";
import NextButton from "./components/nextButton";
import Progress from "./components/progress";
import FinishScreen from "./components/finishScreen";
import Footer from "./components/footer";
import Timer from "./components/timer";

const initialState: IState = {
  questions: [],
  status: STATUS.LOADING,
  selectedQuestion: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const totalQuestions = state.questions?.length || 0;
  const totalPoints = state.questions && state.questions.reduce((prev, curr) => {
      return prev + curr.points;
  }, 0) || 0;

  useEffect(() => {
    dispatch({type: "dataReceived", payload: {questions: questions}})
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        
        {state.status == "loading" && <Loader />}
        {state.status == "error" && <Error />}
        {state.status == "ready" && <StartScreen numQuestions={totalQuestions} dispatch={dispatch}/>}
        {state.status == "active" && 
        <>
        <Progress index={state.selectedQuestion} numQuestions={totalQuestions} points={state.points} totalPoints={totalPoints} answer={state.answer} />
        <Question question={questions[state.selectedQuestion]} dispatch={dispatch} answer={state.answer}/>
        <Footer>
        <Timer dispatch={dispatch} secondsRemaining={state.secondsRemaining} />
        <NextButton dispatch={dispatch}  answer={state.answer} totalQuestions={totalQuestions} selectedQuestion={state.selectedQuestion} />
        </Footer>
        </>
        }
        {
          state.status == "finished" && 
          <FinishScreen points={state.points} totalPoints={totalPoints} highScore={state.highScore} dispatch={dispatch}/>
        }
        </Main>
    </div>
  );
}

export default App;
