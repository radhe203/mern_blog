import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";
import { app } from "../firbase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function DashProfile() {
  const [file, setfile] = useState(null);
  const [fileError, setfileError] = useState(null);
  const [fileperc, setfileperc] = useState(null);
  const [FormData, setFormData] = useState({});
  console.log(FormData);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (file) {
      handelUpload();
    }
  }, [file]);

  function handelUpload() {
    setfileError(null);
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setfileperc(progress);
      },
      (error) => {
        setfileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...FormData, profilePicture: downloadUrl });
        });
        setfileError(null);
        setfileperc(null);
      }
    );
  }

  return (
    <>
      <form className="max-w-lg mx-auto mt-12 flex flex-col  items-center gap-8 w-full p-3">
        <h1 className="text-3xl font-semibold">Profile</h1>

        <label htmlFor="image" className=" relative">
          {fileperc && (
            <CircularProgressbar
              value={fileperc || 0}
              text={`${fileperc}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                },
                path: {
                  stroke: `rgba(62,152,199,${fileperc / 100})`,
                },
              }}
            />
          )}
          <img
            src={FormData.profilePicture || currentUser.profilePicture}
            className={`rounded-full border-8 border-gray-400 w-[150px] h-[150px] object-cover ${fileperc && "opacity-60"}`}
          />
        </label>

        <input
          type="file"
          onChange={(e) => setfile(e.target.files[0])}
          accept="image/*"
          id="image"
          hidden
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
