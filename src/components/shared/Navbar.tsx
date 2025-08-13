import { Link, NavLink } from "react-router"
import { BsCart2 } from "react-icons/bs";
import { Button } from "../ui/button";
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

const Navbar = () => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="hidden sm:block">
      <div className="flex justify-between py-3">
           <h2 className="text-3xl font-bold">Meal<span className="text-myColor">Mart</span></h2>
           <div className="flex justify-center items-center gap-8">
               <NavLink to={"/home"} className={({isActive})=>`text-lg  cursor-pointer ${isActive? "text-myColor" : ""}`}>
                     Home
               </NavLink>
               <NavLink to={"/home"} className={({isActive})=>`text-lg  cursor-pointer ${isActive? "text-myColor" : ""}`}>
                     Order
               </NavLink>
               <NavLink to={"/home"} className={({isActive})=>`relative text-lg  cursor-pointer ${isActive? "text-myColor" : ""}`}>
                     <BsCart2 className="" size={25}/>
                     <Button size="icos" className=" absolute w-4 h-4 rounded-full -top-3 right-1 bg-myColor hover:bg-myColor">
                       1
                     </Button>
               </NavLink>
               <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Avatar>
  <AvatarImage  src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup  >
        <DropdownMenuLabel className="text-md text-center">Shariyer shazan</DropdownMenuLabel>
        <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="top">
            <Link className="text-lg font-bold" to={"/profile"}>Profile</Link>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="top">
            <Link className="text-lg font-bold" to={"/dashboard"}>Dashboard</Link>
            </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">
               <Button className="w-full cursor-pointer bg-myColor hover:bg-myColor">
                  Logout
               </Button>
            </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
           </div>   
      </div>
      </div>
    </div>
  )
}

export default Navbar
