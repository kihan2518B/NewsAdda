import { createBrowserRouter } from "react-router-dom";
import React from "react";

import Notfound from "../pages/NotFound";
const Dashboard = React.lazy(() => import("../pages/Dashboard"))
const Signin = React.lazy(() => import("../pages/Signin"))
const Signup = React.lazy(() => import("../pages/Signup"))
const Signout = React.lazy(() => import("../pages/signout"))
const ArticleDetailsContainer = React.lazy(() => import("../pages/ArticleDetails"))

const router = createBrowserRouter([
    {
        path: '*',
        element: <Notfound />
    },
    {
        path: '/',
        children: [
            { index: true, element: <><Dashboard /></> },
            {
                path: "articles/:articleId",
                element: <ArticleDetailsContainer />
            },
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