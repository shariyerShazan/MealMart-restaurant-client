import { Link, NavLink } from "react-router";
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


// ================== DESKTOP NAVBAR ==================
const Navbar = () => {
  return (
    <div className="w-[90%] mx-auto">
      {/* Mobile */}
      <div className="block sm:hidden">
        <NavbarForMobile />
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup>
                  <DropdownMenuLabel className="text-md text-center">
                    Shariyer Shazan
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
                    <Button className="w-full bg-myColor hover:bg-myColor/90">
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
  );
};

export default Navbar;


// ================== MOBILE NAVBAR ==================
const NavbarForMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="mt-2" variant="outline" size="icon">
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
            <CustomNavLink to="/cart">Cart (1)</CustomNavLink>
            <CustomNavLink to="/profile">Profile</CustomNavLink>
            <CustomNavLink to="/dashboard">Dashboard</CustomNavLink>
            </div>
          </SheetDescription>
        </SheetHeader>

        <SheetFooter className="flex  flex-col items-start gap-4 mt-6">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-bold">Shariyer Shazan</h2>
          </div>
          <Button className="bg-myColor hover:bg-myColor/90 w-full cursor-pointer">Logout</Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full cursor-pointer">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
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
