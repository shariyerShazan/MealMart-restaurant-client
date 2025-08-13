import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import VerifyEmail from "../auth/VerifyEmail";
import Profile from "../pages/Profile";


const Router = createBrowserRouter([
    {
        path: "/" ,
        element: <MainLayout /> ,
        children: [
            {
                index: true ,
                element: <Home />
            } ,
            {
                path: "/profile" ,
                element: <Profile />
            }
        ]
    },
    {
        path: "/login" ,
        element: <Login />
    },
    {
        path: "/register" ,
        element: <Register />
    },
    {
        path: "/forgot-password" ,
        element: <ForgotPassword />
    },
    {
        path: "/reset-password" ,
        element: <ResetPassword />
    },
    {
        path: "/verify-email" ,
        element: <VerifyEmail />
    }

])

export default Router