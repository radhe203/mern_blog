import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
function DashComments() {
  const [allComments, setallComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowmore] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  async function fetchComment() {
    try {
      const res = await fetch(`/api/comment/getallcomments`);
      const data = await res.json();
      if (res.ok) {
        setallComments(data.comments);
        if (data.comments.length < 9) {
          setShowmore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (currentUser.isAdmin) {
        fetchComment()
    }
  }, []);

  async function deleteHandel() {
    setShowModal(false);
    try {
      const res = await fetch(`/api/comment/deletecomment/${deleteId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        alert("comment deleted");
      fetchComment()
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function showMoreHandel() {
    const startIndex = allComments.length;
    try {
      const res = await fetch(`/api/comment/getallcomments?StartIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setallComments((prev) => [...prev, ...data.comments]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="table-auto overflow-x-scroll overflow-y-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 w-full h-[100vh]">
      {currentUser.isAdmin && allComments.length > 0 ? (
        <>
          <Table hoverable className=" shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>Post id</Table.HeadCell>
              <Table.HeadCell>User id</Table.HeadCell>
              <Table.HeadCell>
                <span>Delete</span>
              </Table.HeadCell>
            </Table.Head>

            {allComments.map((comment, index) => {
              return (
                <Table.Body className="divide-y" key={index}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      {comment.content}
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    <Table.Cell>{comment.postId}</Table.Cell>
                    <Table.Cell>{comment.userId}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setDeleteId(comment._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
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
                    Are you sure you want to delete this Comment?
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
        <p>No comments yet</p>
      )}
    </div>
  );
}


export default DashComments