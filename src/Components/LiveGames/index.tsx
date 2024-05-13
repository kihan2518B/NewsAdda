import { useContext, useEffect } from "react";
import LiveGame from "./LiveGame";
import { ThemeContext } from "../../context/theme";
import { useMatchDispatch } from "../../context/LiveMatches/context";
import { fetchMatches } from "../../context/LiveMatches/action";

const LiveGames = () => {
    const { theme } = useContext(ThemeContext)
    const MatchesDispatch: any = useMatchDispatch()

    useEffect(() => {
        fetchMatches(MatchesDispatch)
    })

    return (
        <>
            <div className="h-44 w-full py-3">
                <div className={`pl-10 h-4 w-full  ${theme == "dark" ? "text-violet-50" : "text-violet-800"} flex justify-start items-center font-bold text-2xl`}>
                    <p className="">Live Games</p>
                </div>
                <div className="mx-auto h-40 w-[95vw] flex items-center gap-10 overflow-x-scroll">
                    <LiveGame />
                </div>
            </div>
        </>
    );
};

export default LiveGames;