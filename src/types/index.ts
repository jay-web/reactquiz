export interface IQuestion {
    "question": string,
    "options": string[],
    "correctOption": number,
    "points": number
}

export interface IAction {
    type:string,
    payload?: {
        questions?: IQuestion[],
        answer?: number | null
    }
}

export enum STATUS {
    LOADING = "loading",
    READY = "ready",
    ERROR = "error",
    ACTIVE = "active",
    FINISHED = "finished"
}

export interface IState {
    questions?: IQuestion[],
    status: STATUS,
    selectedQuestion : number,
    answer: number | null | undefined                    // ! will be the answer number given by candidate
    points : number,
    highScore: number,
    secondsRemaining: null | number
}