import React, { useContext, createContext, useReducer } from "react";
import { ArticleState, reducer, initialState, ArticlesDispatch } from './reducer'



// Next, using createContext function, we will create a context for
// `Projects State` object. The shape of this new context object is 
// ProjectsState and here I've set the default value to undefined.

const ArticlesDispatchContext = createContext<ArticlesDispatch | undefined>(undefined);
const ArticleStateContext = createContext<ArticleState | undefined>(undefined);

export const useArticleState = () => useContext(ArticleStateContext)
export const useArticlesDispatch = () => useContext(ArticlesDispatchContext)

export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ArticleStateContext.Provider value={state} >
            <ArticlesDispatchContext.Provider value={dispatch}>
                {children}
            </ArticlesDispatchContext.Provider>
        </ArticleStateContext.Provider>
    )
}
