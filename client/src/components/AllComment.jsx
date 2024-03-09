import { useState } from "react";
import React, { useEffect } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Textarea, Button } from "flowbite-react";
function AllComment({ comment, onLike,deleteComment }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [showEditCom, SetShowEditCom] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [comment]);

  const handelEdit = async (id) => {
    setEditing(true);
    try {
      const res = await fetch(`/api/comment/editcomment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedComment }),
      });
      const data = await res.json();


      if (res.ok) {
        setEditing(false);
        SetShowEditCom(true);
      } else {
        console.log("error");
        setEditing(false);
      }
    } catch (error) {
      console.log(error);
      setEditing(false);
    }
  };

  return (
    <>
      <div className="flex p-4 border-b dark:border-gray-600 text-sm">
        <div className="flex-shrink-0 mr-3">
          <img
            className="w-10 h-10 rounded-full bg-gray-200"
            src={user.profilePicture}
            alt={user.username}
          />
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center mb-1">
            <span className="font-bold mr-1 text-xs truncate">
              {user ? `@${user.username}` : "anonymous user"}
            </span>
            <span className="text-gray-500 text-xs">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>

          {isEditing ? (
            <>
              <Textarea
                id="content"
                rows="3"
                value={editedComment}
                className="border border-gray-300 rounded-md p-2 w-full resize-none"
                onChange={(e) => {
                  setEditedComment(e.target.value);
                }}
              ></Textarea>
              <div className=" flex flex-row-reverse gap-3 mt-5 ">
                <button
                className=" text-green-500 font-semibold uppercase text-sm "
                  onClick={() => {
                    handelEdit(comment._id);
                  }}
                >
                  Save
                </button>

                <button
                className=" text-red-500 font-semibold uppercase text-sm"
                  onClick={() => {
                    setEditing(false);
                    setEditedComment(comment.content);
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-500 pb-2">
                {showEditCom ? editedComment : comment.content}
              </p>
              <div className=" text-gray-600 hover:text-blue-500 flex items-center gap-2">
                <button onClick={() => onLike(comment._id)}>
                  <FaThumbsUp
                    className={`${
                      currentUser &&
                      comment.likes.includes(currentUser._id) &&
                      " text-blue-800"
                    }`}
                  />
                </button>
                <span className=" text-gray-500 text-xs">
                  {comment.numberOfLikes} likes
                </span>
                {currentUser &&
                  (currentUser._id === comment.userId ||
                    currentUser.isAdmin) && (
                   <>
                   
                   <button
                      type="button"
                      className=" text-gray-600 hover:text-blue-500 flex items-center gap-2"
                      onClick={() => setEditing(true)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className=" text-gray-600 hover:text-blue-500 flex items-center gap-2"
                      onClick={() => deleteComment(comment._id)}
                    >
                      Delete
                    </button>
                   
                   </>


                  )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AllComment;
