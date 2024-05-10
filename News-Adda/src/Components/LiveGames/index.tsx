import LiveGame from "./LiveGame";

const LiveGames = () => {
    return (
        <>
            <div className="h-[35%] w-full ">
                <div className="pl-10 h-10 w-screen text-violet-800 flex justify-start items-center font-bold text-2xl">
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