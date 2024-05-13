import { API_ENDPOINT } from "../../config/constants"
import { MatchesDispatch } from "./reducer"
import { Match } from "./types"
import { matchDetails } from "./types"
import { State } from "./reducer"

export const fetchMatches = async (dispatch: MatchesDispatch) => {
    const token = localStorage.getItem("authToken") ?? ""
    try {
        dispatch({ type: "Fetch_Matches_Request" })
        // console.log("token", token)
        const res = await fetch(`${API_ENDPOINT}/matches`, {
            headers: { 'content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        console.log(data)

        //Array containing full details of live match
        const AllMatchesDetails: matchDetails[] = []

        //iterating in Live matches to call api to get match details
        data.matches.map(async (match: Match) => {
            try {
                dispatch({ type: "Fetch_MatchDetails_Request" })
                const response = await fetch(`${API_ENDPOINT}/matches/${match.id}`, {
                    headers: { 'content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
                })
                const MatchDetails = await response.json();
                // console.log("MatchDetails", MatchDetails);
                AllMatchesDetails.push(MatchDetails)
                dispatch({ type: "Fetch_MatchDetails_Success" }) //Live match data
            } catch (e) {
                console.log("Error While fetching match details", e);
                dispatch({ type: "Fetch_MatchDetails_Failure", payload: "Cannot get match Details" })
            }
        });

        console.log("AllMatchesDetails", AllMatchesDetails)

        //We will update state With all Live matches
        dispatch({ type: "Fetch_Matches_Success", payload: AllMatchesDetails })
    } catch (error) {
        console.log("Error while fetching matches: ", error);
        dispatch({ type: "Fetch_Matches_Failure", payload: "Cant get Live Matches" })
    }
}

export const refreshMatch = async (matchId: number, dispatch: MatchesDispatch, state: State) => {
    const token = localStorage.getItem("authToken");
    try {
        const res = await fetch(`${API_ENDPOINT}/matches/${matchId}`, {
            headers: { 'content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()

        //updating match data which matches matchID
        const updatedMatches: matchDetails[] = state.matches.map((match) => {
            if (match.id === matchId) {
                return data; // Replace the old match with the updated match data
            } else {
                return match; // Keep other matches as they are
            }
        });

        dispatch({ type: 'Refresh_Match_Details', payload: updatedMatches }) // match data
    } catch (error) {
        console.log("Error while fetching match details", error);
    }

}