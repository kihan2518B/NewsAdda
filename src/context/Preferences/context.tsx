import React, { useContext, createContext, useReducer } from "react";
import { preferencesState, reducer, initialState, PreferencesDispatch } from './reducer'



// Next, using createContext function, we will create a context for
// `Projects State` object. The shape of this new context object is 
// ProjectsState and here I've set the default value to undefined.

const PreferencesDispatchContext = createContext<PreferencesDispatch | undefined>(undefined);
const PreferencesStateContext = createContext<preferencesState | undefined>(undefined);

export const usePreferencesState = () => useContext(PreferencesStateContext)
export const usePreferencesDispatch = () => useContext(PreferencesDispatchContext)

export const PreferencesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <PreferencesStateContext.Provider value={state} >
            <PreferencesDispatchContext.Provider value={dispatch}>
                {children}
            </PreferencesDispatchContext.Provider>
        </PreferencesStateContext.Provider>
    )
}
