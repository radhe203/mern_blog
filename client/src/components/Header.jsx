import React, { useState } from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSearch,FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {toggleTheme} from "../redux/theme/themeSlice"

function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const [ profile, SetProfile ] = useState(false);
  console.log(currentUser, "currentuser");
  return (
    <Navbar className=" border-b-2">
      <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 from via-purple-500 to-pink-500 rounded-lg">
          Radhe's
        </span>
        Blog
      </Link>

      <form action="">
        <TextInput
          placeholder="search..."
          type="text"
          rightIcon={FaSearch}
          className="hidden lg:inline"
        ></TextInput>
      </form>

      <Button className="w-12 h-12 lg:hidden" color="gray" pill>
        <FaSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button color="gray" pill className="w-12 h-12 hidden sm:inline" onClick={()=>{
          dispatch(toggleTheme())
        }}>
          {theme==="light"?<FaMoon />: <FaSun />}
          
         
        </Button>

        {currentUser ? (<div className="profile z-50 relative">
          <img
            src={currentUser.profilePicture}
            onClick={() => {
              SetProfile(!profile);
            }}
            alt=""
            className="w-12 h-12 rounded-full cursor-pointer"
          />
          <div className={` py-4 px-6 absolute top-[110%] right-0 ${!profile && "hidden"} ${theme === "dark" ? "bg-slate-700" : "bg-slate-50" } `} >
            <p className="truncate text-sm py-1"> {currentUser.username} </p>
            <p className="truncate text-sm py-1 "> {currentUser.email} </p>
            <div className=" border-t-2 border-gray-500 mt-2 flex justify-between pt-2 font-semibold">
              <span className=" cursor-pointer">Log out</span>
              <span className=" cursor-pointer">Profile</span>
            </div>
          </div>
        </div>):(
          <Link to={"sign-in"}>
          <Button gradientDuoTone={"purpleToBlue"} outline>Sign in</Button>
        </Link>
        ) }
        
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={"div"} active={path === "/"}>
          <Link to={`/`}>Home</Link>
        </Navbar.Link>

        <Navbar.Link as={"div"} active={path === "/about"}>
          <Link to={`/about`}>About</Link>
        </Navbar.Link>

        <Navbar.Link as={"div"} active={path === "/projects"}>
          <Link to={`/projects`}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;


