import React, { Suspense, useEffect, useState } from "react"

import Appbar from "../../Components/Appbar"
const LiveGames = React.lazy(() => import('../../Components/LiveGames'))
import TrendingNews from "../../Components/TrendingNews"

import ErrorBoundary from "../../Components/ErrorBoundary"

const Dashboard = () => {
    const token = localStorage.getItem("userData") ?? ""
    // console.log("token", token)
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (token && localStorage.getItem("signedIn") === "true") {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
                localStorage.removeItem("signedIn")
            }, 2000); // Set timeout for 2 seconds

            return () => clearTimeout(timer);
        }
    }, []);
    return (
        <div className="h-full w-full">
            {showMessage && (
                <div className="absolute h-10 w-32 top-0 left-0 bg-green-600 flex justify-center items-center">Signin Successful!</div>
            )}
            <Appbar />
            <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                    <LiveGames />
                </Suspense>
            </ErrorBoundary>
            <TrendingNews />
        </div>
    )
}

export default Dashboard
