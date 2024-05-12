import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Signout from "../pages/signout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />
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