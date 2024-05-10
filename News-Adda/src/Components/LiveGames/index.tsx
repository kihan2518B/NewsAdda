import { useContext } from "react";
import LiveGame from "./LiveGame";
import { ThemeContext } from "../../context/theme";

const LiveGames = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <>
            <div className="h-[30%] w-full ">
                <div className={`pl-10 h-10 w-screen  ${theme == "dark" ? "text-violet-50" : "text-violet-800"} flex justify-start items-center font-bold text-2xl`}>
                    <p className="">Live Games</p>
                </div>
                <div className="mx-auto h-60 w-[95vw] flex items-center gap-10 overflow-x-scroll">
                    <LiveGame />
                </div>
            </div>
        </>
    );
};

export default LiveGames;