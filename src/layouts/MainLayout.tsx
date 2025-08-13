import { Outlet } from "react-router"
import Navbar from "../components/shared/Navbar"


function MainLayout() {
  return (
    <div className="">
         <Navbar />
         <Outlet />
    </div>
  )
}

export default MainLayout
