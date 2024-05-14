

import { sport, team } from "./types"

//initializing state type
export type State = {
    isLoading: boolean,
    sports: sport[],
    teams: team[],
    isError: boolean,
    errorMessage: string
}

export const initialState: State = {
    isLoading: false,
    sports: [],
    teams: [],
    isError: false,
    errorMessage: ""
}

//initializing Action type
export type YourNewsAction =
    | { type: 'Fetch_Sports_Request' }
    | { type: 'Fetch_Sports_Success'; payload: sport[] }
    | { type: 'Fetch_Sports_Failure'; payload: string }
    | { type: 'Fetch_Teams_Request' }
    | { type: 'Fetch_Teams_Success'; payload: team[] }
    | { type: 'Fetch_Teams_Failure'; payload: string }

export type YourNewsDispatch = React.Dispatch<YourNewsAction>;

export const reducer = (state: State, action: YourNewsAction): State => {
    switch (action.type) {
        case 'Fetch_Sports_Request':
            return {
                ...state,
                isLoading: true,
                isError: false,
                errorMessage: ""
            }
        case 'Fetch_Sports_Success':
            return {
                ...state,
                isLoading: false,
                isError: false,
                sports: action.payload,
                errorMessage: ""
            }
        case 'Fetch_Sports_Failure':
            return {
                ...state,
                isLoading: false,
                sports: [],
                isError: true,
                errorMessage: action.payload
            }
        case 'Fetch_Teams_Request':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'Fetch_Teams_Success':
            return {
                ...state,
                teams: action.payload,
                isLoading: false,
                isError: false,
            }
        case 'Fetch_Teams_Failure':
            return {
                ...state,
                isLoading: false,
                teams: [],
                isError: true,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}
