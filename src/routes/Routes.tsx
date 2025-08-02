import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";


const Router = createBrowserRouter([
    {
        path: "/" ,
        element: <MainLayout /> ,
        children: [
            {
                index: true ,
                element: <Home />
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
    }

])

export default Router