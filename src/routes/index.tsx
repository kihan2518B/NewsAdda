import { createBrowserRouter } from "react-router-dom";
import React from "react";

const Dashboard = React.lazy(() => import("../pages/Dashboard"))
const Signin = React.lazy(() => import("../pages/Signin"))
const Signup = React.lazy(() => import("../pages/Signup"))
const Signout = React.lazy(() => import("../pages/signout"))
const ArticleDetailsContainer = React.lazy(() => import("../pages/ArticleDetails"))
const MatchDetailsContainer = React.lazy(() => import("../pages/MatchDetails"))

const router = createBrowserRouter([
    {
        path: '/',
        children: [
            { index: true, element: <><Dashboard /></> },
            {
                path: "articles/:articleId",
                element: <ArticleDetailsContainer />
            },
            {
                path: "matches/:matchId",
                element: <MatchDetailsContainer />
            }
        ]
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/signin',
        element: <Signin />
    },
    {
        path: '/signout',
        element: <Signout />
    }
])

export default router