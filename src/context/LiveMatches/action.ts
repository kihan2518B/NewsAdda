import { API_ENDPOINT } from "../../config/constants"
import { MatchesDispatch } from "./reducer"
import { Match } from "./types"
import { matchDetails } from "./types"

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

        //Filtering live matches
        const LiveMatches = data.matches.filter((match: Match) => match.isRunning)
        // console.log("LiveMatches", LiveMatches)

        //Array containing full details of live match
        const LiveMatchesDetails: matchDetails[] = []

        //iterating in Live matches to call api to get match details
        LiveMatches.map(async (match: Match) => {
            try {
                dispatch({ type: "Fetch_LiveMatch_Request" })
                const response = await fetch(`${API_ENDPOINT}/matches/${match.id}`, {
                    headers: { 'content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
                })
                const Livematch = await response.json();
                // console.log("Livematch", Livematch);
                LiveMatchesDetails.push(Livematch)
                dispatch({ type: "Fetch_LiveMatch_Success" }) //Live match data
            } catch (e) {
                console.log("Error While fetching match details", e);
                dispatch({ type: "Fetch_LiveMatch_Failure", payload: "Cannot get match Details" })
            }
        });

        // console.log("LiveMatchesDetails", LiveMatchesDetails)

        //We will update state With all Live matches
        dispatch({ type: "Fetch_Matches_Success", payload: LiveMatchesDetails })
    } catch (error) {
        console.log("Error while fetching matches: ", error);
        dispatch({ type: "Fetch_Matches_Failure", payload: "Cant get Live Matches" })
    }
}