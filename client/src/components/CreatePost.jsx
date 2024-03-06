import React, { useState } from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function CreatePost() {
    const [file,setFile] = useState()
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className='flex flex-col gap-4' >
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
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

        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
          >Upload Image
          </Button>
        </div>
        <ReactQuill theme="snow" placeholder="write somthing..." className="h-72 mb-12" required></ReactQuill>
        <Button type="submit" gradientDuoTone={'purpleToPink'} outline className="w-full uppercase font-semibold text-[18px]" >Create A Post</Button>
      </form>
    </div>
  );
}

export default CreatePost;
