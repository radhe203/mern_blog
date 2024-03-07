import React, { useState } from "react";
import {
  Button,
  FileInput,
  Select,
  TextInput,
  Alert,
  Spinner,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firbase.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(null);
  const [fileError, setfileError] = useState(null);
  const [Error, setError] = useState(null);
  const [uploading, setuploading] = useState(false);
  const [imageUploading, SetimageUploading] = useState(false);
  const [FormData, setFormData] = useState({});
  const navigate = useNavigate()
  async function handelChange(e) {
    setFormData({ ...FormData, [e.target.id]: e.target.value });
  }

  async function handelImageUpload() {
    setfileError(null);
    if (!file) {
      return setfileError("please select an image first");
    }
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
        setFilePerc(progress);
      },
      (error) => {
        setfileError("image could not upload");
        setFilePerc(null);
        SetimageUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...FormData, image: downloadUrl });
        });
        setfileError(null);
        setFilePerc(null);
        SetimageUploading(false);
      }
    );
  }

  async function submithandel(e) {
    e.preventDefault();
    try {
      setuploading(true);
      setError(null);
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const data = await res.json();
      console.log(data,"data");
      if (!res.ok) {
        setError(data.message);
        setuploading(false);
      }
      setFormData({})
      setuploading(false);
      navigate(`/post/${data.slug}`)
    } catch (error) {
      setError(error.message);
      setuploading(false);
    }
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={submithandel}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="tittle"
            className="flex-1"
            onChange={handelChange}
          />

          <Select onChange={handelChange} id="category">
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
            <option value="python">python</option>
            <option value="c++">C++</option>
            <option value="java">Java</option>
            <option value="rust">Rust</option>
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            onClick={handelImageUpload}
            size="sm"
            outline
            disabled={imageUploading}
          >
            {imageUploading ? (
              <>
                <Spinner size={"sm"} />{" "}
                <span className=" text-green-500 mx-2">
                  uploading... {filePerc}%{" "}
                </span>
              </>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        
        {FormData.image && <img src={FormData.image} className="w-full h-80" alt=" Selected image" />}
        {fileError && (
          <Alert color={"failure"} className="w-full">
            {fileError}
          </Alert>
        )}
        {imageUploading && (
          <span
            className={`h-2 bg-green-700`}
            style={{ width: `${filePerc}%` }}
          ></span>
        )}
        <ReactQuill
          theme="snow"
          placeholder="write somthing..."
          className="h-72 mb-12"
          required
          id="content"
          onChange={(value) => {
            setFormData({ ...FormData, content: value });
          }}
        ></ReactQuill>
        <Button
          type="submit"
          gradientDuoTone={"purpleToPink"}
          outline
          className="w-full uppercase font-semibold text-[18px]"
          disabled={uploading || imageUploading}
        >
          Create A Post
        </Button>
        {Error && (
          <Alert color={"failure"} className="w-full">
            {Error}
          </Alert>
        )}
      </form>
    </div>
  );
}

export default CreatePost;
