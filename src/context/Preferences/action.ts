import { API_ENDPOINT } from "../../config/constants";
import { PreferencesDispatch } from './reducer'

export const fetchPreferences = async (dispatch: PreferencesDispatch) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            // console.log("Token", token)
            dispatch({ type: "Fetch_Preferences_Request" }); //Fetch req starts
            const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
                headers: { 'content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            })
            const data = await res.json();
            // console.log(data);

            dispatch({ type: "Fetch_Preferences_Success", payload: data.preferences })
        } catch (error) {
            console.log("error while Fetching articles", error);
            dispatch({ type: "Fetch_Preferences_Error", payload: "error while Fetching Preferences" })
        }
    } else {
        console.log("User not signed in")
    }
}
