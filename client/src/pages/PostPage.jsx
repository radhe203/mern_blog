import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import PostCard from "../components/PostCard";
function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentPost,setRecentPost] = useState([])
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/post/getposts?slug=${slug}`);
        const data = await res.json();
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
        } else {
          setError(data.message);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchPost();
  }, [slug]);

  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=3");
        const data = await res.json();
        if (res.ok) {
          setRecentPost(data.posts);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchRecentPost();
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size={"xl"} />
      </div>
    );

  return (
    <>
      <main className="flex flex-col p-3 max-w-6xl mx-auto min-h-screen text-center ">
        <h1 className="text-3xl mt-10 lg:text-4xl font-serif mx:auto text-center p-3">
          {post && post.tittle}
        </h1>
        <Link
          to={`search?category=${post && post.category}`}
          className="mx-auto"
        >
          <Button color="gray" pill size={"xs"}>
            {post && post.category}
          </Button>
        </Link>
        <img
          src={post && post.image}
          alt={post && post.tittle}
          className="mt-10 p-3 max-h-[600px] w-full object-cover"
        />
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <div dangerouslySetInnerHTML={{__html:post.content}} className="p-3 max-w-2xl mx-auto post-content">
        </div>

        <Comment postId={post._id}/>


        <div className="flex flex-col p-3 max-w-6xl mx-auto min-h-screen text-center ">
          <h1 className="text-3xl mt-10 lg:text-4xl font-serif mx:auto text-center mb-10 p-3">Recent posts</h1>
          <div className="flex gap-5 justify-center flex-wrap ">
            {recentPost && recentPost.map((post)=>{
              return <PostCard key={post._id} post={post}/>;
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default PostPage;
