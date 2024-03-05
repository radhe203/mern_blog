import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Spinner } from "flowbite-react";
import {
  signInFailure,
  signInSuccess,
  signInStart,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
function SignIn() {
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  function handelChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }
  async function submitHandel(e) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("all fiels required"));
    }

    dispatch(signInStart());
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      dispatch(signInSuccess(data));
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  }

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
        <form
          className="flex-1  mx-auto flex flex-col gap-3 mt-5"
          onSubmit={submitHandel}
        >
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handelChange}
            required
            className="rounded-lg border-2 border-gray-400 w-[300px] py-3"
            placeholder="email"
          />

          <input
            type="password"
            required
            id="password"
            value={formData.password}
            onChange={handelChange}
            className=" rounded-lg border-2 border-gray-400 w-[300px] py-3"
            placeholder="password"
          />
          <Button
            gradientDuoTone={"purpleToPink"}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size={"sm"} />
                <span className="ml-2">Loading</span>
              </>
            ) : (
              "Sign in"
            )}
          </Button>
          <p className=" text-slate-700 mt-1 text-sm">
            Don't Have an account
            <span className=" text-blue-700 ml-1 cursor-pointer">
              <Link to={"/sign-up"}>sign up</Link>
            </span>
          </p>
          {error && <Alert color={"failure"}>{error}</Alert>}
        </form>
      </div>
    </div>
  );
}

export default SignIn;
