import { sport, team } from "./types";
import { API_ENDPOINT } from "../../config/constants";

export const fetchSports = async () => {
    const token = localStorage.getItem("authToken") ?? ''
    try {
        const res = await fetch(`${API_ENDPOINT}/sports`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        const data: sport[] = await res.json()
        console.log("Sports: ", data);
        return data
    } catch (error) {
        console.log("error while fetching sports", error);
    }
}

export const fetchTeams = async () => {
    const token = localStorage.getItem("authToken") ?? ''
    try {
        const res = await fetch(`${API_ENDPOINT}/teams`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        const data: team[] = await res.json()
        console.log("Teams: ", data);
        return data
    } catch (error) {
        console.log("error while fetching Teams", error);
    }
}