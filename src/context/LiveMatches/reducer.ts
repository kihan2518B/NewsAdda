import { matchDetails } from "./types"

//initializing state type
export type State = {
    isLoading: boolean,
    matches: matchDetails[],
    isError: boolean,
    errorMessage: string
}


export const initialState: State = {
    isLoading: false,
    matches: [],
    isError: false,
    errorMessage: ""
}

//initializing Action type
type MatchAction =
    | { type: 'Fetch_Matches_Request' }
    | { type: 'Fetch_Matches_Success'; payload: matchDetails[] }
    | { type: 'Fetch_Matches_Failure'; payload: string }
    | { type: 'Fetch_LiveMatch_Request' }
    | { type: 'Fetch_LiveMatch_Success'; }
    | { type: 'Fetch_LiveMatch_Failure'; payload: string }
    | { type: 'Refresh_Match_Details'; payload: matchDetails[] }

export type MatchesDispatch = React.Dispatch<MatchAction>;

export const reducer = (state: State, action: MatchAction): State => {
    switch (action.type) {
        case 'Fetch_Matches_Request':
            return {
                ...state,
                isLoading: true,
                isError: false,
                errorMessage: ""
            }
        case 'Fetch_Matches_Success':
            return {
                ...state,
                isLoading: false,
                isError: false,
                matches: action.payload,
                errorMessage: ""
            }
        case 'Fetch_Matches_Failure':
            return {
                ...state,
                isLoading: false,
                matches: [],
                isError: true,
                errorMessage: action.payload
            }
        case 'Fetch_LiveMatch_Request':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'Fetch_LiveMatch_Success':
            return {
                ...state,
                isLoading: false,
                isError: false,
            }
        case 'Fetch_LiveMatch_Failure':
            return {
                ...state,
                isLoading: false,
                matches: [],
                isError: true,
                errorMessage: action.payload
            }
        case 'Refresh_Match_Details':
            return {
                ...state,
                isLoading: false,
                isError: false,
                matches: action.payload,
                errorMessage: ""
            }
        default:
            return state;
    }
}
