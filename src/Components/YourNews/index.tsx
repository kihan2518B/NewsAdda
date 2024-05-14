import React, { useEffect } from "react";

const NewsList = React.lazy(() => import("./NewsList"))

import { useYourNewsDispatch } from "../../context/YourNews/context";
import { fetchSports, fetchTeams } from "../../context/YourNews/action";

const YourNews = () => {
    const YourNewsDispatch: any = useYourNewsDispatch()

    useEffect(() => {
        console.log("fetch Req")
        fetchSports(YourNewsDispatch);
        fetchTeams(YourNewsDispatch)
    }, [])
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <NewsList />
        </React.Suspense>
    )
}

export default YourNews