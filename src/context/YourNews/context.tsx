import React, { useContext, createContext, useReducer } from "react";
import { State, reducer, initialState, YourNewsDispatch } from './reducer'



// Next, using createContext function, we will create a context for
// `Projects State` object. The shape of this new context object is 
// ProjectsState and here I've set the default value to undefined.

const YourNewsDispatchContext = createContext<YourNewsDispatch | undefined>(undefined);
const YourNewsStateContext = createContext<State | undefined>(undefined);

export const useYourNewsState = () => useContext(YourNewsStateContext)
export const useYourNewsDispatch = () => useContext(YourNewsDispatchContext)

export const YourNewsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <YourNewsStateContext.Provider value={state} >
            <YourNewsDispatchContext.Provider value={dispatch}>
                {children}
            </YourNewsDispatchContext.Provider>
        </YourNewsStateContext.Provider>
    )
}
