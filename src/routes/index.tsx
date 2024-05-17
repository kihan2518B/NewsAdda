import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Signout from "../pages/signout";
import ArticleDetailsContainer from "../pages/ArticleDetails";
import MatchDetailsContainer from "../pages/MatchDetails";

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