import { Link, NavLink, useNavigate } from "react-router";
import { BsCart2 } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "../ui/avatar";

import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxTypeHooks";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/apiEndPoint";
import { setUser } from "../../redux/userSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";


// ================== DESKTOP NAVBAR ==================
const Navbar = () => {
  const [logoutLoading , setLogoutLoading] = useState<boolean>(false)

    const {user} = useAppSelector((state)=>state.user)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault()
      setLogoutLoading(true)
      try {
             const res = await axios.post(`${USER_API_END_POINT}/logout` , {} , {withCredentials: true})
             if(res.data.success){
              setLogoutLoading(false)
                  dispatch(setUser(null))
                  toast(res.data.meesage)
             }else{
              setLogoutLoading(false)
             }
      } catch (error: any) {
        console.log(error)
           toast.error(error?.response?.data?.message)
        setLogoutLoading(false)
      }
    }

  return (
    <div className="w-[90%] mx-auto">
      {/* Mobile */}
      <div className="block sm:hidden">
        <NavbarForMobile  user={user}   logoutLoading={logoutLoading}  handleLogout={handleLogout}  navigate={navigate}/>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <h2 className="text-3xl font-bold">
            Meal<span className="text-myColor">Mart</span>
          </h2>

          {/* Links + Icons */}
          <div className="flex items-center gap-8">
            <CustomNavLink to="/">Home</CustomNavLink>
            <CustomNavLink to="/order">Order</CustomNavLink>

            {/* Cart */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative text-lg cursor-pointer ${isActive ? "text-myColor" : ""}`
              }
            >
              <BsCart2 size={25} />
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-myColor rounded-full">
                1
              </span>
            </NavLink>

            {/* Avatar Dropdown */}
            {
              user ?  <DropdownMenu >
              <DropdownMenuTrigger className="" asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage className="object-cover" src={`${user?.profilePicture || "https://github.com/shadcn.png"} `} />
                  
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup>
                  <DropdownMenuLabel className="text-md text-center">
                  {user?.fullName}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioItem value="profile">
                    <Link className="text-lg font-bold" to="/profile">
                      Profile
                    </Link>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dashboard">
                    <Link className="text-lg font-bold" to="/dashboard">
                      Dashboard
                    </Link>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="logout">
                    {
                      logoutLoading ? <Button className="bg-myColor hover:bg-myColor">
                           <Loader2 className="animate-spin"/> please wait
                      </Button>: <Button onClick={handleLogout} className="w-full cursor-pointer bg-myColor hover:bg-myColor/90">
                      Logout
                    </Button>
                    }
                    
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            : 
            <div>
              <Button onClick={()=>navigate("/login")} className="bg-myColor hover:bg-myColor cursor-pointer">
                  Login
              </Button>
            </div>
            }
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


// ================== MOBILE NAVBAR ==================
const NavbarForMobile = ({user , logoutLoading , handleLogout , navigate}) => {
  return (
   <div className=" flex items-center justify-between">
          <h2 className="text-3xl font-bold">
              Meal<span className="text-myColor">Mart</span>
            </h2>
    <Sheet>
      <SheetTrigger asChild>
        <Button className="mt-2 cursor-pointer" variant="outline" size="icon">
          <FiMenu size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex justify-between ">
        <SheetHeader>
          <SheetTitle>
            <h2 className="text-3xl font-bold">
              Meal<span className="text-myColor">Mart</span>
            </h2>
          </SheetTitle>

          <SheetDescription className="flex-1">
            <div className="flex  flex-col gap-4 mt-4">
            <CustomNavLink to="/">Home</CustomNavLink>
            <CustomNavLink to="/order">Order</CustomNavLink>
            <CustomNavLink to="/cart">Cart <span className="text-myColor">(1)</span></CustomNavLink>
            <CustomNavLink to="/profile">Profile</CustomNavLink>
            <CustomNavLink to="/dashboard">Dashboard</CustomNavLink>
            </div>
          </SheetDescription>
        </SheetHeader>

        <SheetFooter className="flex  flex-col items-start gap-4 mt-6">
          {user? <div className="flex  flex-col gap-2 w-full">
            <div className="flex gap-3 items-center">
            <Avatar>
            <AvatarImage className="object-cover" src={`${user?.profilePicture || "https://github.com/shadcn.png"} `} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-bold">{user?.fullName}</h2>
          </div>
          {
                    logoutLoading? <Button className="bg-myColor hover:bg-myColor">
                           <Loader2 className="animate-spin"/> please wait
                      </Button>: <Button onClick={handleLogout} className="w-full bg-myColor hover:bg-myColor/90">
                      Logout
                    </Button>
                    }
                    
          </div> :
              <div>
                   <Button onClick={()=>navigate("/login")} className="bg-myColor hover:bg-myColor cursor-pointer">
                  Login
              </Button>
            </div>}
          <SheetClose asChild>
            <Button variant="outline" className="w-full cursor-pointer">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
   </div>
  );
};


// ================== REUSABLE NAVLINK ==================
const CustomNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `text-lg font-medium transition-colors rounded-md  hover:bg-myColor/10 px-3 py-1 ${
        isActive ? "text-myColor" : ""
      }`
    }
  >
    {children}
  </NavLink>
);
