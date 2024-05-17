import React, { useEffect } from "react";

const NewsList = React.lazy(() => import("./NewsList"))

import { useYourNewsDispatch } from "../../context/YourNews/context";
import { fetchSports, fetchTeams } from "../../context/YourNews/action";
import { fetchPreferences } from "../../context/Preferences/action";
import { usePreferencesDispatch } from "../../context/Preferences/context";

const YourNews = () => {
    const YourNewsDispatch: any = useYourNewsDispatch()
    const PreferencesDispatch: any = usePreferencesDispatch()
    useEffect(() => {
        fetchSports(YourNewsDispatch);
        fetchTeams(YourNewsDispatch);
        fetchPreferences(PreferencesDispatch)
    }, [])
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <NewsList />
        </React.Suspense>
    )
}

export default YourNews