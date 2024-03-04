import React from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSearch } from "react-icons/fa";
function Header() {
    const path = useLocation().pathname;
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
        <Button color="gray" pill className="w-12 h-12 hidden sm:inline">
          <FaMoon />
        </Button>
        <Link to={"sign-in"}>
          <Button gradientDuoTone={"purpleToBlue"}>Sign in</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={'div'} active={path==='/'}>
          <Link to={`/`}>Home</Link>
        </Navbar.Link>

        <Navbar.Link as={'div'} active={path==='/about'}>
          <Link to={`/about`}>About</Link>
        </Navbar.Link>

        <Navbar.Link as={'div'} active={path==='/projects'}>
          <Link to={`/projects`}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
