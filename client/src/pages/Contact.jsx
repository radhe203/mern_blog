import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { SiGmail } from "react-icons/si";
function Contact() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-8">
          <h1 className="text-3xl font-bold text-center md:text-left">
            Contact Me
          </h1>
          <p className="text-gray-500 text-center md:text-left">
            Have a question or an exciting project in mind? Let's chat!
          </p>
              <Link
                to="mailto:shyam25jio@gmail.com"
                target="_"
                className="text-blue-500 underline"
              >
               <SiGmail />
              </Link>

              <Link to="https://github.com/radhe203" target="_">
                {" "}
                <FaGithub />
              </Link>

              <Link to="https://www.linkedin.com/in/radhe2003" target="_">
                {" "}
                <FaLinkedin />
              </Link>

              <Link to="https://twitter.com/Radhe_2003" target="_">
                {" "}
                <FaTwitter />
              </Link>
            
          <div className="flex space-x-4 justify-center md:justify-start">
            <a href="#" className="text-2xl text-blue-500 hover:text-blue-700">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-2xl text-red-500 hover:text-red-700">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
