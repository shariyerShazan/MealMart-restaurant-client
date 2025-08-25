import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import VerifyEmail from "../auth/VerifyEmail";
import Profile from "../pages/Profile";
import SearchPage from "../pages/SearchPage";
import RestaurantDetails from "../pages/RestaurantDetails";
import Cart from "../pages/Cart";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Admin/Dashboard";
import Reastaurant from "../pages/Admin/Reastaurant";
import Menus from "../pages/Admin/Menus";
import UserOrder from "../pages/UserOrder";


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
                path: "profile" ,
                element: <Profile />
            } ,
            {
                path: "search/:searchText",
                element: <SearchPage />
            } ,
            {
                path: "restaurant/:restaurantId" ,
                element: <RestaurantDetails />
            } ,
            {
                path: "cart" ,
                element : <Cart />
            },
            {
                path: "order" ,
                element : <UserOrder />
            }
        ]
    },
    {
        path: "/dashboard" ,
        element: <DashboardLayout />,
        children: [
            {
                index: true ,
                element: <Dashboard />
            } ,
            {
                path : "restaurant" ,
                element: <Reastaurant />
            } ,
            {
                path: "add-menu" ,
                element: <Menus />
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