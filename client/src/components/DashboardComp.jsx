import React, { useDebugValue, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaLongArrowAltUp, FaUsers } from "react-icons/fa";
import { Button, Table } from "flowbite-react";
import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { LiaCommentSolid } from "react-icons/lia";
import { IoIosDocument } from "react-icons/io";
function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/user/getUsers?limit=5");
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastmonthusers);
      }
    }

    async function fetchPosts() {
      const res = await fetch("/api/post/getPosts?limit=5");
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.lastMonthPosts);
      }
    }

    async function fetchComments() {
      const res = await fetch("/api/comment/getallcomments?limit=5");
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments);
        setTotalComments(data.totalComments);
        setLastMonthComments(data.lastMonthComments);
      }
    }

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <main className="flex flex-col w-full">
      <div className="mx-auto flex h-fit gap-5 mt-8 justify-center flex-wrap ">
        <div className="flex min-w-[300px] justify-between py-3 px-6 gap-3 shadow-lg hover:shadow-2xl border">
          <div className="flex flex-col gap-3">
            <p className="uppercase font-semibold text-[21px]">Total users</p>
            <p className=" text-lg">{totalUsers}</p>
            <p>
              <FaLongArrowAltUp className="text-green-700 inline-block" />
              {totalUsers} last months
            </p>
          </div>
          <div>
            <FaUsers className="text-green-500 text-[70px]" />
          </div>
        </div>

        <div className="flex min-w-[300px] justify-between py-3 px-6 gap-3 shadow-lg hover:shadow-2xl border">
          <div className="flex flex-col gap-3">
            <p className="uppercase font-semibold text-[21px]">Total posts</p>
            <p className=" text-lg">{totalPosts}</p>
            <p>
              <FaLongArrowAltUp className="text-green-700 inline-block" />
              {totalPosts} last months
            </p>
          </div>
          <div>
            <IoIosDocument className="text-blue-500 text-[70px]" />
          </div>
        </div>

        <div className="flex min-w-[300px] justify-between py-3 px-6 gap-3 shadow-lg hover:shadow-2xl border">
          <div className="flex flex-col gap-3">
            <p className="uppercase font-semibold text-[21px]">
              Total Comments
            </p>
            <p className=" text-lg">{totalComments}</p>
            <p>
              <FaLongArrowAltUp className="text-green-700 inline-block" />
              {totalComments} last months
            </p>
          </div>
          <div>
            <LiaCommentSolid className="text-pink-500 text-[70px]" />
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-fit gap-5 mt-8 justify-center flex-wrap">

        <div className=" flex flex-col p-5  shadow-lg hover:shadow-2xl border">
          <div className=" flex gap-5 text-left items-center font-medium my-2 ">
            <span className=" uppercase font-semibold">Recent Users</span>
            <span className="border py-1 px-3 border-green-500 text-green-700 cursor-pointer">
              See All
            </span>
          </div>
          <hr className="w-full border-none h-[2px] bg-slate-400 my-3" />
          <div className="flex gap-10 items-center font-semibold my-2">
            <span>Image</span>
            <span>Username</span>
          </div>
          <div>
            {users &&
              users.map((user) => (
                <div className="flex items-center gap-10 my-5">
                  <img
                    src={user.profilePicture}
                    className="w-10 h-10 rounded-full object-contain"
                  />
                  <span className="text-left"> {user.username}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col p-5 shadow-lg hover:shadow-2xl  border">
          <div className=" flex gap-5 text-left items-center font-medium my-2 justify-between">
            <span className=" uppercase font-semibold">Recent comments</span>
            <span className="border py-1 px-3 border-green-500 text-green-700 cursor-pointer">
              See All
            </span>
          </div>
          <hr className="w-full border-none h-[2px] bg-slate-400 my-3" />
          <div className="flex gap-10 items-center font-semibold my-2 justify-between">
            <span >Content</span>
            <span>likes</span>
          </div>
          <div>
            {comments &&
              comments.map((com) => (
                <div className="flex items-center gap-10 my-5 justify-between">
                 <span className="max-w-[300px]">{com.content}</span>
                  <span className="text-left"> {com.likes.length} likes</span>
                </div>
              ))}
          </div>
        </div>

      </div>

    </main>
  );
}

export default DashboardComp;
