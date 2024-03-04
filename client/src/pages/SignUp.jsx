import React from "react";
import { Link } from "react-router-dom";
import {Button, Label, TextInput} from "flowbite-react"
function SignUp() {
  return (
    <div className="mt-20 min-h-screen">
      
      <div className="flex justify-center items-center  flex-col md:flex-row p-3 mx-auto max-w-3xl gap-5">
        {/* left */}
        <div className="">
          <Link
            to={"/"}
            className="text-3xl sm:text-xl font-bold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 from via-purple-500 to-pink-500 rounded-lg text-white">
              Radhe's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
            quaerat?Lorem ipsum dolor sit amet.
          </p>
        </div>
        {/* Right */}
        <form className="flex-1  mx-auto flex flex-col gap-3 mt-5">
          <input type="text" required className="rounded-lg border-2 border-gray-400 w-[300px] py-3" placeholder="usernmae"/>

          <input type="email" required className="rounded-lg border-2 border-gray-400 w-[300px] py-3" placeholder="email"/>

          <input type="password" required className=" rounded-lg border-2 border-gray-400 w-[300px] py-3" placeholder="password"/>
          <Button gradientDuoTone={"purpleToPink"} type="submit">Sign up</Button>
          <p className=" text-slate-700 mt-1 text-sm">Have an account <span className=" text-blue-700 ml-3">Sign in</span></p>
        </form>
        
      </div>

      {/* Right */}
    </div>
  );
}

export default SignUp;
