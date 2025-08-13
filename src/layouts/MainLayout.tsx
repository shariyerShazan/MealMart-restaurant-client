import { Outlet } from "react-router"
import Navbar from "../components/shared/Navbar"


function MainLayout() {
  return (
    <div className="">
         <Navbar />
        <div className="w-[90%] mx-auto">
        <Outlet />
        </div>
    </div>
  )
}

export default MainLayout
