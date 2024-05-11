import { API_ENDPOINT } from "../../config/constants";
import { ArticlesDispatch } from './reducer'

export const fetchArticles = async (dispatch: ArticlesDispatch) => {
    const token = localStorage.getItem("authToken");

    try {
        dispatch({ type: "Fetch_Article_Request" }); //Fetch req starts
        const res = await fetch(`${API_ENDPOINT}/articles`, {
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }
        })
        const data = await res.json();
        console.log(data);

        dispatch({ type: "Fetch_Article_Success", payload: data })
    } catch (error) {
        console.log("error while Fetching articles", error);
        dispatch({ type: "Fetch_Article_Error", payload: "error while Fetching articles" })
    }
}