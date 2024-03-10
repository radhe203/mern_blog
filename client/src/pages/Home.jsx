import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hero from "../assets/hero.webp";
function Home() {
  const [recentPost, setRecentPost] = useState([]);
  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
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
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>

      <div className="flex max-w-[95vw] md:max-w-[1200px] mx-auto gap-4 flex-wrap md:flex-nowrap">
        <img src={hero} className="max-w-[300px]" alt="" />
        <div>
          <h2 className="text-blue-700 uppercase font-semibold">Unleash Your Creativity: Code Your World and Shape the Digital</h2>
          <p className="mt-10 text-slate-500">
            Future In today's tech-driven world, coding is no longer a niche
            skill – it's a superpower. Whether you're a seasoned developer or a
            curious beginner, this blog is your one-stop shop for all things
            programming. We'll guide you through the fundamentals of various
            languages, unveil industry secrets, and equip you with the tools to
            build the next generation of websites, apps, and games. But coding
            goes beyond functionality; it's a language of creativity, allowing
            you to express your ideas and solutions in a powerful and impactful
            way. So, join us on this exciting journey as we unlock your coding
            potential and empower you to shape the digital future!
          </p>
        </div>
      </div>

      <div className="my-20">
        <div className="flex flex-col max-w-[95vw] md:max-w-[1000px] mx-auto ">
          <div>
            <p className="px-3 py-2 uppercase bg-red-500 text-white w-fit">
              Latest blogs
            </p>
            <hr className=" border-none bg-red-500 h-[2px] mb-5" />
          </div>

          {recentPost &&
            recentPost.map((post) => {
              return (
                <div
                  key={post._id}
                  className="flex flex-col md:flex-row gap-2 p-3"
                >
                  <img src={post.image} className=" w-[200px]" />
                  <div>
                    <Link
                      to={`/post/${post.slug}`}
                      className="text-[18px] font-bold hover:underline"
                    >
                      {post.tittle}
                    </Link>
                    <p className="text-sm text-gray-500 ">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>

                    <p className="text-sm text-gray-500 line-clamp-2 mt-3">
                      {post.content.replace(/<[^>]+>/g, "")}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex flex-col max-w-[95vw] md:max-w-[1000px] mx-auto mt-10">
          <div className="flex flex-col">
            <p className="px-3 py-2 uppercase bg-blue-500 text-white w-fit self-end">
              Top Blogs
            </p>
            <hr className=" border-none bg-blue-500 h-[2px] mb-5" />
          </div>

          {recentPost &&
            recentPost.map((post) => {
              return (
                <div
                  key={post._id}
                  className="flex flex-col md:flex-row gap-2 p-3"
                >
                  <img src={post.image} className=" w-[200px]" />
                  <div>
                    <Link
                      to={`/post/${post.slug}`}
                      className="text-[18px] font-bold hover:underline"
                    >
                      {post.tittle}
                    </Link>
                    <p className="text-sm text-gray-500 ">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>

                    <p className="text-sm text-gray-500 line-clamp-2 mt-3">
                      {post.content.replace(/<[^>]+>/g, "")}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
