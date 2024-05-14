import { API_ENDPOINT } from "../../config/constants";
import { YourNewsDispatch } from "./reducer";

export const fetchSports = async (dispatch: YourNewsDispatch) => {
    const token = localStorage.getItem("authToken") ?? ''
    try {
        dispatch({ type: "Fetch_Sports_Request" })
        const res = await fetch(`${API_ENDPOINT}/sports`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        // console.log("Sports: ", data);
        dispatch({ type: "Fetch_Sports_Success", payload: data.sports })

    } catch (error) {
        console.log("error while fetching sports", error);
        dispatch({ type: "Fetch_Sports_Failure", payload: "Can not Fetch teams" })
    }
}

export const fetchTeams = async (dispatch: YourNewsDispatch) => {
    const token = localStorage.getItem("authToken") ?? ''
    // console.log("fetch Request")
    try {
        dispatch({ type: "Fetch_Teams_Request" })
        const res = await fetch(`${API_ENDPOINT}/teams`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        // console.log("Teams: ", data);
        dispatch({ type: "Fetch_Teams_Success", payload: data })

    } catch (error) {
        console.log("error while fetching Teams", error);
        dispatch({ type: "Fetch_Teams_Failure", payload: "Error while fetching Teams" })
    }
}