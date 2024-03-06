import React from "react";
import { useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";
function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <form className="max-w-lg mx-auto mt-12 flex flex-col  items-center gap-8 w-full p-3">
        <h1 className="text-3xl font-semibold">Profile</h1>
        <img
          src={currentUser.profilePicture}
          className="rounded-full border-8 border-gray-400 "
        />
        <TextInput
          type="text"
          defaultValue={currentUser.username}
          className="w-full"
          id="username"
          placeholder="username"
        ></TextInput>

        <TextInput
          type="email"
          defaultValue={currentUser.email}
          className="w-full"
          id="email"
          placeholder="username"
        ></TextInput>

        <TextInput
          type="password"
          className="w-full"
          id="username"
          placeholder="password"
        ></TextInput>
        <Button
          type="submit"
          className="w-full uppercase font-semibold"
          gradientDuoTone={"purpleToBlue"}
          outline
        >
          Update
        </Button>
        <div className=" text-sm text-red-700 flex justify-between w-full">
          <span>Delete Account</span>
          <span>Sign out</span>
        </div>
      </form>
    </>
  );
}

export default DashProfile;
