import { useEffect, useReducer } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { API_ENDPOINT } from "../../config/constants";

type Match = { //this is type object of details of matches when we fetch all matches at once
  id: number,
  isRunning: boolean,
  name: string,
  location: string,
  sportName: string,
  endsAt: string,
  teams: { id: number, name: string }[],
}

type matchDetails = { //this is type object of full details of match
  id: number,
  isRunning: boolean,
  name: string,
  location: string,
  endsAt: string,
  startsAt: string,
  score: {
    [teamName: string]: string
  },
  teams: { id: number, name: string }[],
  sportName: string,
  playingTeam: number,
  story: string,
}

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
  | { type: 'Fetch_Matches_Success'; }
  | { type: 'Fetch_Matches_Failure'; payload: string }
  | { type: 'Fetch_LiveMatch_Request' }
  | { type: 'Fetch_LiveMatch_Success'; payload: matchDetails }
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
        matches: [...state.matches, action.payload],
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
        console.log("LiveMatches", LiveMatches)

        // Use a set to store IDs of already fetched matches
        const fetchedMatchIds = new Set<number>();

        //iterating in Live matches to call api to get match details
        const fetchPromises = LiveMatches.map(async (match: Match) => {
          if (!fetchedMatchIds.has(match.id)) {
            await fetchLiveMatchDetails(match.id);
            fetchedMatchIds.add(match.id); // Add the fetched match ID to the set
          }
        });
        await Promise.all(fetchPromises);

        //We will not update state here
        dispatch({ type: "Fetch_Matches_Success", })
      } catch (error) {
        console.log("Error while fetching matches: ", error);
        dispatch({ type: "Fetch_Matches_Failure", payload: "Cant get Live Matches" })
      }
    }

    const fetchLiveMatchDetails = async (id: number) => {
      try {
        dispatch({ type: "Fetch_LiveMatch_Request" })
        const res = await fetch(`${API_ENDPOINT}/matches/${id}`, {
          headers: { 'content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        console.log("Live match data", data)
        dispatch({ type: "Fetch_LiveMatch_Success", payload: data }) //Live match data
      } catch (error) {
        console.log("Error while fetching match details", error);
        dispatch({ type: "Fetch_LiveMatch_Failure", payload: "Cannot get match Details" })
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
      <div className="shrink-0 h-32 w-60 border-2 rounded-md bg-violet-300 hover:bg-violet-200 border-violet-900">
        <div className="flex h-10 w-full items-center">
          <div className="flex pl-4 w-[70%] font-bold text-xl">
            <p>Cricket</p>
          </div>
          <div className="flex justify-center w-[30%]  text-xl">
            <ArrowPathIcon className="h-6 w-6 cursor-pointer hover:text-gray-500" />
          </div>
        </div>
        <div className="mx-auto flex justify-start items-center w-[85%] h-5 text-lg">
          <p>IPL 2023,Delhi</p>
        </div>
        <div className="flex flex-col">
          <div className="flex h-8 w-full items-center">
            <div className="flex justify-center w-[30%] font-bold text-xl">
              <p>CSK</p>
            </div>
            <div className="flex justify-center w-[70%] ">
              <p>(20 Overs) 235/6</p>
            </div>
          </div>
          <div className="flex h-8 w-full items-center">
            <div className="flex justify-center w-[30%] font-bold text-xl">
              <p>GT</p>
            </div>
            <div className="flex justify-center w-[70%] ">
              <p>(19 Overs) 235/5</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveGame;