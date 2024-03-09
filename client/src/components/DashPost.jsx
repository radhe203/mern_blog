import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowmore] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowmore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, []);

  async function showMoreHandel() {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteHandel() {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/delete/${currentUser._id}/${deleteId}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => prev.filter((item) => item._id !== deleteId));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="table-auto overflow-x-scroll overflow-y-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 w-full h-[100vh]">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className=" shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post tittle</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>

            {userPosts.map((post, index) => {
              return (
                <Table.Body className="divide-y" key={index}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.tittle}
                          className="w-20 h-10 object-cover bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-gray-900 dark:text-white"
                        to={`/post/${post.slug}`}
                      >
                        {post.tittle}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setDeleteId(post._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="text-teal-500 hover:underline"
                        to={`/update-post/${post._id}`}
                      >
                        <span>Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            })}
          </Table>

          {showModal && (
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
                    Are you sure you want to delete this post?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button
                      color="failure"
                      type="button"
                      onClick={deleteHandel}
                    >
                      Yes, I'm sure
                    </Button>
                    <Button
                      color="gray"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          )}

          {showMore && (
            <button
              type="button"
              className="w-full text-teal-500 self-center text-sm py-7"
              onClick={showMoreHandel}
            >
              show more
            </button>
          )}
        </>
      ) : (
        <p>You have no posts</p>
      )}
    </div>
  );
}

export default DashPost;
