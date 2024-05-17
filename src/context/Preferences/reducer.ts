import { team,sport } from "../YourNews/types"

export type preferencesState ={
   preferences: {
    selectedTeams: team[];
    selectedSports: sport[];
},
   isLoading: boolean,
   isError: boolean,
    errorMessage: string
}

export const initialState: preferencesState = {
    preferences: {
        selectedTeams: [],
        selectedSports: []
    },
    isLoading: false,
    isError: false,
    errorMessage: ""
}

export type PreferencesActions =
    | { type: 'Fetch_Preferences_Request' }
    | { type: 'Fetch_Preferences_Success'; payload:{selectedTeams: team[];selectedSports: sport[];} }
    | { type: 'Fetch_Preferences_Error'; payload: string }
    | { type: 'Update_Preferences_Request' }
    | { type: 'Update_Preferences_Success'; payload:{selectedTeams: team[];selectedSports: sport[];} }
    | { type: 'Update_Preferences_Error'; payload: string }

export type PreferencesDispatch = React.Dispatch<PreferencesActions>;

export const reducer = (state: preferencesState, action: PreferencesActions): preferencesState => {
   switch (action.type) {
      case 'Fetch_Preferences_Request':
         return {
            ...state,
            isLoading: true,
            isError: false,
         };
      case 'Fetch_Preferences_Success':
         return {
            ...state,
            preferences: {
               selectedTeams: action.payload.selectedTeams,
               selectedSports: action.payload.selectedSports
            },
            isLoading: false,
            isError: false,
         };
      case 'Fetch_Preferences_Error':
         return {
            ...state,
            isLoading: false,
            isError: true,
            errorMessage: action.payload
         };
      default:
         return state;
   }
};