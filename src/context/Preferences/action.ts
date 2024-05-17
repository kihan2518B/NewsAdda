import { API_ENDPOINT } from "../../config/constants";
import { sport, team } from "../YourNews/types";
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

export const UpdatePreferences = async (selectedSports: string[], selectedTeams: string[]) => {
    const token = localStorage.getItem("authToken") ?? ""
    try {
        const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                preferences: {
                    selectedSports,
                    selectedTeams,
                }
            }),
        });
        const data = res.json()
        console.log("data", data)
        if (!res.ok) {
            throw new Error('Failed to update preferences');
        }

        // Save selected preferences in localStorage
        let userData = JSON.parse(localStorage.getItem('userData') ?? '{}');
        localStorage.setItem(
            'userData',
            JSON.stringify({
                ...userData,
                preferences: {
                    selectedSports,
                    selectedTeams,
                },
            })
        );
        userData = JSON.parse(localStorage.getItem('userData') || '{}');
    } catch (error) {
        console.error('Error updating preferences:', error);
    }
}
