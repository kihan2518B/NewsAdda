import { useContext } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

import { refreshMatch } from "../../context/LiveMatches/action";
import { ThemeContext } from "../../context/theme";
import { Match, matchDetails } from "../../context/LiveMatches/types";
import { useMatchDispatch, useMatchState } from "../../context/LiveMatches/context";

const LiveGame = () => {
  const { theme } = useContext(ThemeContext)

  const state: any = useMatchState()
  const MatchesDispatch: any = useMatchDispatch()

  const { isLoading, matches, isError, errorMessage } = state

  const LiveMatches: matchDetails[] = matches.filter((match: Match) => match.isRunning)//This will contain Live match Details
  // console.log("LiveMatchesDetails", LiveMatches)

  if (isLoading) {
    return <>Loading...</>
  }
  if (isError) {
    return <div className="text-red-500">{errorMessage}</div>
  }

  const handleRefreshMatch = (matchId: number) => {
    refreshMatch(matchId, MatchesDispatch, state)
  }

  console.log("matches", matches);
  return (
    <>
      {LiveMatches.map((match) => (
        <div key={match.id} className={`shrink-0 h-32 w-60 border-2 rounded-md  ${theme == 'dark' ? "bg-violet-500 hover:bg-violet-600 text-white border-violet-950" : "bg-violet-300 border-violet-900 hover:bg-violet-200"} `}>
          <div className="flex h-10 w-full items-center">
            <div className="flex pl-4 w-[70%] font-bold text-xl">
              <p>{match.sportName}</p>
            </div>
            <div className="flex justify-center w-[30%]  text-xl">
              <ArrowPathIcon onClick={() => handleRefreshMatch(match.id)} className="h-6 w-6 cursor-pointer hover:text-gray-500" />
            </div>
          </div>
          <div className="mx-auto flex justify-start items-center w-[85%] h-10 text-sm">
            <p>{match.name}</p>
          </div>
          <hr className="border-1 border-violet-600" />
          {match.score && Object.entries(match.score).map(([teamName, score]) => (
            <div className="flex flex-col">
              <div className="flex h-4 w-full items-center justify-around">
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