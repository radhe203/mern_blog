import { Alert, Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Comment({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [Comment, setComment] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [commentSuccess, setCommentSuccess] = useState(null);
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  async function handleSubmit(e) {
    setCommentError(null);
    setCommentSuccess(null);
    e.preventDefault();
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: Comment,
          userId: currentUser._id,
          postId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentSuccess(true);
        setCommentError(null);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center text-gray-500 w-full mx-auto">
          <p>signed in as</p>
          <img
            src={currentUser.profilePicture}
            alt=""
            className="w-5 h-5 rounded-full ml-2"
          />
          <Link to={`/dashboard?tab=profile`} className="text-blue-500">
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex items-center text-gray-500 mx-auto">
          <p>you must sign in to comment</p>
          <Link to={"/sign-in"} className="text-sm text-blue-600 ml-2">
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border border-teal-500 rounded-md p-4 mt-1"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="write a comment"
            required={true}
            rows={4}
            name="comment"
            onChange={handleComment}
            value={Comment}
            maxLength={200}
          />
          <div className="flex justify-between items-center mt-1 mb-3">
            <p className="text-gray-500">
              {Comment ? 200 - Comment.length : 200} characters left
            </p>
            <Button type="submit" outline gradientDuoTone={"purpleToPink"}>
              submit
            </Button>
          </div>
          {commentError && <Alert>{commentError}</Alert>}
        </form>
      )}
    </div>
  );
}

export default Comment;
