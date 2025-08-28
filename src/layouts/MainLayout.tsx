import { Outlet } from "react-router"
import Navbar from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"


function MainLayout() {
  return (
    <div className="">
         <Navbar />
        <div className="w-[90%] mx-auto">
        <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default MainLayout
