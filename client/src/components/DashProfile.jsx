import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Modal, Spinner, TextInput } from "flowbite-react";
import { app } from "../firbase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signOutsucsess,
} from "../redux/user/userSlice";

function DashProfile() {
  const [showModal, setShowModal] = useState(false);
  const [file, setfile] = useState(null);
  const [fileError, setfileError] = useState(null);
  const [updateEroor, SetUpdateError] = useState(null);
  const [imageUploading, SetimageUploading] = useState(false);
  const [fileperc, setfileperc] = useState(null);
  const [FormData, setFormData] = useState({});
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (file) {
      handelUpload();
    }
  }, [file]);

  function handelUpload() {
    setfileError(null);
    SetimageUploading(true);
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
        setfileError(
          "could not uploaded (!!! image size must be less than 2MB)"
        );
        SetimageUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...FormData, profilePicture: downloadUrl });
        });
        setfileError(null);
        setfileperc(null);
        SetimageUploading(false);
      }
    );
  }

  function handelChange(e) {
    setFormData({
      ...FormData,
      [e.target.id]: e.target.value,
    });
  }

  async function updateHandel(e) {
    e.preventDefault();
    SetUpdateError(null);

    if (Object.keys(FormData).length === 0) {
      return SetUpdateError("no changes made");
    }

    try {
      dispatch(updateStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(FormData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        alert("user updated success");
        setFormData({});
      }
    } catch (error) {
      dispatch(updateFailure(data.message));
    }
  }

  async function handleDeleteUser() {
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(deleteSuccess());
      } else {
        dispatch(deleteSuccess());
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  }

  async function signOutHandel(){
    const res = await fetch('/api/user/signout',{
      method:"POST"
    })
    const data = res.json();
    if(!res.ok){
      console.log(data)
    }

    dispatch(signOutsucsess())
  }
  return (
    <>
      <form
        className="max-w-lg mx-auto mt-12 flex flex-col  items-center gap-8 w-full p-3"
        onSubmit={updateHandel}
      >
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
            className={`rounded-full border-8 border-gray-400 w-[150px] h-[150px] object-cover ${
              fileperc && "opacity-60"
            }`}
          />
        </label>

        <input
          type="file"
          onChange={(e) => setfile(e.target.files[0])}
          accept="image/*"
          id="image"
          hidden
        />
        {fileError && (
          <Alert color={"failure"} className="w-full">
            {fileError}
          </Alert>
        )}
        <TextInput
          type="text"
          defaultValue={currentUser.username}
          className="w-full"
          id="username"
          placeholder="username"
          onChange={handelChange}
        ></TextInput>

        <TextInput
          type="email"
          defaultValue={currentUser.email}
          className="w-full"
          id="email"
          placeholder="username"
          onChange={handelChange}
        ></TextInput>

        <TextInput
          type="password"
          className="w-full"
          id="password"
          placeholder="password"
          onChange={handelChange}
        ></TextInput>
        <Button
          type="submit"
          className="w-full uppercase font-semibold disabled:opacity-95"
          gradientDuoTone={"purpleToBlue"}
          outline
          disabled={imageUploading}
        >
          {loading ? (
            <>
              <Spinner size={"sm"} />
              <span className="ml-2">Updating...</span>
            </>
          ) : (
            "update"
          )}
        </Button>
        <div className=" text-sm text-red-700 flex justify-between w-full">
          <span onClick={() => setShowModal(true)} className=" cursor-pointer">Delete Account</span>
          <span className=" cursor-pointer" onClick={()=>signOutHandel()}>Sign out</span>
        </div>

        {error && (
          <Alert color={"failure"} className="w-full">
            {error}
          </Alert>
        )}
        {updateEroor && (
          <Alert color={"failure"} className="w-full">
            {updateEroor}
          </Alert>
        )}
      </form>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size={"md"}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" type="button" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray"  type="button" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DashProfile;
