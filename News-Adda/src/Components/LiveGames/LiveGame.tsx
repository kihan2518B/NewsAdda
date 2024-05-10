import { useContext, useEffect, useReducer } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { API_ENDPOINT } from "../../config/constants";

import { matchDetails, Match } from "./types";
import { ThemeContext } from "../../context/theme";

//initializing state type
type State = {
  isLoading: boolean,
  matches: matchDetails[],
  isError: boolean,
  errorMessage: string
}

//initializing Action type
type Action_Type =
  | { type: 'Fetch_Matches_Request' }
  | { type: 'Fetch_Matches_Success'; payload: matchDetails[] }
  | { type: 'Fetch_Matches_Failure'; payload: string }
  | { type: 'Fetch_LiveMatch_Request' }
  | { type: 'Fetch_LiveMatch_Success'; }
  | { type: 'Fetch_LiveMatch_Failure'; payload: string };


const initialState: State = {
  isLoading: false,
  matches: [],
  isError: false,
  errorMessage: ""
}

const reducer = (state: State, action: Action_Type): State => {
  switch (action.type) {
    case 'Fetch_Matches_Request':
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      }
    case 'Fetch_Matches_Success':
      return {
        ...state,
        isLoading: false,
        isError: false,
        matches: action.payload,
        errorMessage: ""
      }
    case 'Fetch_Matches_Failure':
      return {
        ...state,
        isLoading: false,
        matches: [],
        isError: true,
        errorMessage: action.payload
      }
    case 'Fetch_LiveMatch_Request':
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: ""
      }
    case 'Fetch_LiveMatch_Success':
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: ""
      }
    case 'Fetch_LiveMatch_Failure':
      return {
        ...state,
        isLoading: false,
        matches: [],
        isError: true,
        errorMessage: action.payload
      }
    default:
      return state;
  }
}

const LiveGame = () => {
  const { theme } = useContext(ThemeContext)

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log("Api request")
    const token = localStorage.getItem("authToken") ?? ""
    const fetchMatches = async () => {
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
            console.log("Livematch", Livematch);
            LiveMatchesDetails.push(Livematch)
            dispatch({ type: "Fetch_LiveMatch_Success" }) //Live match data
          } catch (e) {
            console.log("Error While fetching match details", e);
            dispatch({ type: "Fetch_LiveMatch_Failure", payload: "Cannot get match Details" })
          }
        });

        console.log("LiveMatchesDetails", LiveMatchesDetails)

        //We will update state With all Live matches
        dispatch({ type: "Fetch_Matches_Success", payload: LiveMatchesDetails })
      } catch (error) {
        console.log("Error while fetching matches: ", error);
        dispatch({ type: "Fetch_Matches_Failure", payload: "Cant get Live Matches" })
      }
    }

    //fetch request to get all matches
    fetchMatches()
  }, [])
  const { isLoading, matches, isError, errorMessage } = state
  if (isLoading) {
    return <>Loading...</>
  }
  if (isError) {
    return <div className="text-red-500">{errorMessage}</div>
  }
  console.log("matches", matches);
  return (
    <>
      {matches.map((match) => (
        <div key={match.id} className={`shrink-0 h-40 w-60 border-2 rounded-md  ${theme == 'dark' ? "bg-violet-700 hover:bg-violet-600 text-white border-violet-950" : "bg-violet-300 border-violet-900 hover:bg-violet-200"} `}>
          <div className="flex h-10 w-full items-center">
            <div className="flex pl-4 w-[70%] font-bold text-xl">
              <p>{match.sportName}</p>
            </div>
            <div className="flex justify-center w-[30%]  text-xl">
              <ArrowPathIcon className="h-6 w-6 cursor-pointer hover:text-gray-500" />
            </div>
          </div>
          <div className="mx-auto flex justify-start items-center w-[85%] h-10 text-sm">
            <p>{match.name}</p>
          </div>
          <hr className="border-1 border-violet-600" />
          {match.score && Object.entries(match.score).map(([teamName, score]) => (
            <div className="flex flex-col">
              <div className="flex h-8 w-full items-center justify-around">
                <div className="flex justify-end w-full font-bold text-sm">
                  <p>{teamName}:</p>
                </div>
                <div className="flex justify-center w-full ">
                  <p>{score}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      ))}
    </>

  );
};

export default LiveGame;