import { Article } from "./types";

export interface ArticleState {
    articles: Article[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}

export const initialState: ArticleState = {
    articles: [],
    isLoading: false,
    isError: false,
    errorMessage: ''
}

export type ArticlesActions =
    | { type: 'Fetch_Article_Request' }
    | { type: 'Fetch_Article_Success'; payload: Article[] }
    | { type: 'Fetch_Article_Error'; payload: string }

export type ArticlesDispatch = React.Dispatch<ArticlesActions>;


export const reducer = (state: ArticleState, action: ArticlesActions) => {
    switch (action.type) {
        case 'Fetch_Article_Request':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'Fetch_Article_Success':
            return {
                ...state,
                articles: action.payload,
                isLoading: false,
                isError: false,
            }
        case 'Fetch_Article_Error':
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload
            }
        default:
            return state
    }
}