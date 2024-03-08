import { useState } from "react";
import React, { useEffect } from "react";
import moment from "moment";
function AllComment({ comment }) {
  const [user, setUser] = useState({});
  console.log(user);
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
          <p className='text-gray-500 pb-2'>{comment.content}</p>
        </div>
      </div>
    </>
  );
}

export default AllComment;
