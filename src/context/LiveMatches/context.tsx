import React, { useContext, createContext, useReducer } from "react";
import { State, reducer, initialState, MatchesDispatch } from './reducer'



// Next, using createContext function, we will create a context for
// `Projects State` object. The shape of this new context object is 
// ProjectsState and here I've set the default value to undefined.

const MatchesDispatchContext = createContext<MatchesDispatch | undefined>(undefined);
const MatchesStateContext = createContext<State | undefined>(undefined);

export const useMatchState = () => useContext(MatchesStateContext)
export const useMatchDispatch = () => useContext(MatchesDispatchContext)

export const MatchesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MatchesStateContext.Provider value={state} >
            <MatchesDispatchContext.Provider value={dispatch}>
                {children}
            </MatchesDispatchContext.Provider>
        </MatchesStateContext.Provider>
    )
}
