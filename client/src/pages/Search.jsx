import { Button } from "flowbite-react";
import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

function Search() {
  const [sidebarData, setSeideBarData] = useState({
    searchTerm: "",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showMore, SetShowmore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  


  async function fetchPosts() {
    const urlparams = new URLSearchParams(location.search);
    setLoading(true);
    try {
      const searchQuery = urlparams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setLoading(false);
      }
      if (res.ok) {
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          SetShowmore(true);
        } else {
          SetShowmore(false);
        }
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [location.search]);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
      <>
      <div className="flex gap-5 flex-wrap p-5">
        {posts && posts.map((post) => {
          return <PostCard post={post} key={post._id}/>
        })}
      </div>
      {posts.length ===0 && <h1 className=" text-center mt-10">No post found</h1>}
        {error  && <h1 className=" text-center mt-10 text-red-500">{error}</h1>}
        {showMore && <button className="my-12 text-teal-600  w-full" onClick={handleShowMore}>Show More</button>}
      </>
  );
}

export default Search;
