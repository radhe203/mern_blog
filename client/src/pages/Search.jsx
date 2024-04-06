import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
function Search() {
  const [sidebarData, setSeideBarData] = useState({});

  console.log(sidebarData);

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
      const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function termHandel(e) {
    e.preventDefault();
    const urlparams = new URLSearchParams(location.search);
    if(sidebarData.searchTerm){
      urlparams.set('searchTerm',sidebarData.searchTerm)
    }
    if(sidebarData.sort){
      urlparams.set('sort', sidebarData.sort)
    }
    if(sidebarData.category){
      urlparams.set('category', sidebarData.category)
    }
    const searchQuery = urlparams.toString();
    navigate(`/search?${searchQuery}`);
    fetchPosts();
  }

  return (
    <div className=" md:flex md:gap-2">
      <div className=" min-w-[300px] border-r-2 shadow-md p-4 relative">
        <form
          className="grid grid-cols-2 md:grid-cols-4 md:flex md:flex-col gap-3 sticky top-10 "
          onSubmit={termHandel}
        >
          <label>
            Search Term
            <input
              type="text"
              className="w-full mt-1 bg-transparent"
              onChange={(event) => {
                setSeideBarData({
                  ...sidebarData,
                  searchTerm: event.target.value,
                });
              }}
            />
          </label>

          <label>
            Sort
            <select
              name=""
              id=""
              className="w-full mt-1 bg-transparent"
              onChange={(event) => {
                setSeideBarData({
                  ...sidebarData,
                  sort: event.target.value,
                });
              }}
            >
              <option value="asc" className=" bg-transparent">
                Latest
              </option>
              <option value="dsc" className=" bg-transparent">
                Oldest
              </option>
            </select>
          </label>

          <label>
            Category
            <select
              name=""
              id=""
              className="w-full mt-1 bg-transparent block"
              onChange={(event) => {
                setSeideBarData({
                  ...sidebarData,
                  category: event.target.value,
                });
              }}
            >
              <option value="uncategorized" className=" bg-transparent">
              uncategorized
              </option>
              <option value="javascript" className=" bg-transparent">
              javascript
              </option>
              <option value="reactjs" className=" bg-transparent">
              reactjs
              </option>
              <option value="nextjs" className=" bg-transparent">
              nextjs
              </option>
            </select>
          </label>

          <Button
            gradientDuoTone={"purpleToPink"}
            type="submit"
            className="md:w-full md:mt-5"
          >
            Submit
          </Button>
        </form>
      </div>
      <div>
        <div className="flex gap-5 flex-wrap p-5 min-h-[80vh]">
          {posts &&
            posts.map((post) => {
              return <PostCard post={post} key={post._id} />;
            })}
        </div>
        {posts.length === 0 && (
          <h1 className=" text-center mt-10">No post found</h1>
        )}
        {error && <h1 className=" text-center mt-10 text-red-500">{error}</h1>}
        {showMore && (
          <button
            className="my-12 text-teal-600  w-full"
            onClick={handleShowMore}
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;
