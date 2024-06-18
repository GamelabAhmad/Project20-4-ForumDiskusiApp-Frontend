import { useState, useEffect, useRef } from "react";
import {
  upVoteComment,
  downVoteComment,
  getCommentVotes,
} from "../../../api/commentVotesApi.js";
import Button from "../../atoms/Button/index.jsx";
import IconPlaceholder from "../../atoms/IconPlaceholder/index.jsx";
import Cookies from "js-cookie";
import Toasts from "../../molecules/Toasts/index.jsx";

export default function CommentVote({
  commentId,
  initialUpvoteStatus,
  initialDownvoteStatus,
}) {
  const [upvoteSuccessful, setUpvoteSuccessful] = useState(initialUpvoteStatus);
  const [downvoteSuccessful, setDownvoteSuccessful] = useState(
    initialDownvoteStatus,
  );
  const [upVotesComments, setUpVotesComments] = useState(0);
  const [downVotesComments, setDownVotesComments] = useState(0);
  const [showUpvoteSuccessToast, setShowUpvoteSuccessToast] = useState(false);
  const [showUpvoteFailureToast, setShowUpvoteFailureToast] = useState(false);
  const [showDownvoteSuccessToast, setShowDownvoteSuccessToast] =
    useState(false);
  const [showDownvoteFailureToast, setShowDownvoteFailureToast] =
    useState(false);
  const user = Cookies.get("user");
  const hasFetchedVotes = useRef(false);

  useEffect(() => {
    if (hasFetchedVotes.current) return;
    hasFetchedVotes.current = true;

    async function checkCommentVoteStatus() {
      try {
        const response = await getCommentVotes(commentId);
        const upVotesComments = response.filter(
          (response) => response.role === "VOTE",
        );
        const downVotesComments = response.filter(
          (response) => response.role === "DOWNVOTE",
        );
        setUpVotesComments(upVotesComments.length);
        setDownVotesComments(downVotesComments.length);
        const userUpvoted = upVotesComments.some(
          (response) => response.user.username === user,
        );
        const userDownvoted = downVotesComments.some(
          (response) => response.user.username === user,
        );
        setUpvoteSuccessful(userUpvoted);
        setDownvoteSuccessful(userDownvoted);
      } catch (error) {
        console.error("Error checking vote status:", error);
      }
    }

    checkCommentVoteStatus();
  }, [commentId, user]);

  const handleUpvoteComment = async () => {
    try {
      if (downvoteSuccessful) {
        const removeDownvoteResponse = await downVoteComment(commentId);
        console.log("Remove downvote response:", removeDownvoteResponse);
        if (removeDownvoteResponse.message === "DOWNVOTE removed") {
          setDownvoteSuccessful(false);
          if (downVotesComments > 0) {
            setDownVotesComments(downVotesComments - 1);
          }
        }
      }
      const upvoteResponse = await upVoteComment(commentId);
      console.log("Upvote response:", upvoteResponse);
      if (upvoteResponse.role === "VOTE") {
        setUpvoteSuccessful(true);
        setUpVotesComments(upVotesComments + 1);
        setShowUpvoteSuccessToast(true);
        setTimeout(() => setShowUpvoteSuccessToast(false), 3000);
        window.location.reload();
      } else if (upvoteResponse.message === "VOTE removed") {
        setUpvoteSuccessful(false);
        if (upVotesComments > 0) {
          setUpVotesComments(upVotesComments - 1);
        }
        setShowUpvoteSuccessToast(true);
        setTimeout(() => setShowUpvoteSuccessToast(false), 3000);
      }
    } catch (error) {
      console.error("Error upvoting comment:", error);
      setShowUpvoteFailureToast(true);
      setTimeout(() => setShowUpvoteFailureToast(false), 3000);
    }
  };

  const handleDownvoteComment = async () => {
    try {
      if (upvoteSuccessful) {
        const removeUpvoteResponse = await upVoteComment(commentId);
        console.log("Remove upvote response:", removeUpvoteResponse);
        if (removeUpvoteResponse.message === "VOTE removed") {
          setUpvoteSuccessful(false);
          if (upVotesComments > 0) {
            setUpVotesComments(upVotesComments - 1);
          }
        }
      }
      const downvoteResponse = await downVoteComment(commentId);
      console.log("Downvote response:", downvoteResponse);
      if (downvoteResponse.role === "DOWNVOTE") {
        setDownvoteSuccessful(true);
        setDownVotesComments(downVotesComments + 1);
        setShowDownvoteSuccessToast(true);
        setTimeout(() => setShowDownvoteSuccessToast(false), 3000);
        window.location.reload();
      } else if (downvoteResponse.message === "DOWNVOTE removed") {
        setDownvoteSuccessful(false);
        if (downVotesComments > 0) {
          setDownVotesComments(downVotesComments - 1);
        }
        setShowDownvoteSuccessToast(true);
        setTimeout(() => setShowDownvoteSuccessToast(false), 3000);
      }
    } catch (error) {
      console.error("Error downvoting comment:", error);
      setShowDownvoteFailureToast(true);
      setTimeout(() => setShowDownvoteFailureToast(false), 3000);
    }
  };

  return (
    <>
      <div className="d-flex gap-2 align-items-center m-0 mt-2">
        <Button
          variant={upvoteSuccessful ? "primary" : "outline-primary"}
          className={"w-100 w-md-auto rounded-3"}
          onClick={handleUpvoteComment}
        >
          <IconPlaceholder variant={"arrow-up"} />
        </Button>
        <Button
          variant={downvoteSuccessful ? "primary" : "outline-primary"}
          className="w-100 w-md-auto rounded-3"
          onClick={handleDownvoteComment}
        >
          <IconPlaceholder variant={"arrow-down"} />
        </Button>
      </div>
      {showUpvoteSuccessToast && (
        <Toasts
          onClose={() => setShowUpvoteSuccessToast(false)}
          variant={"success"}
          variantBody={"success-subtle"}
          title={"Success"}
          titleColor={"white"}
          description={"Upvote successful."}
        />
      )}
      {showUpvoteFailureToast && (
        <Toasts
          onClose={() => setShowUpvoteFailureToast(false)}
          variant={"danger"}
          variantBody={"danger-subtle"}
          title={"Failure"}
          titleColor={"white"}
          description={"Failed to upvote. Please log in to upvote."}
        />
      )}
      {showDownvoteSuccessToast && (
        <Toasts
          onClose={() => setShowDownvoteSuccessToast(false)}
          variant={"success"}
          variantBody={"success-subtle"}
          title={"Success"}
          titleColor={"white"}
          description={"Downvote successful."}
        />
      )}
      {showDownvoteFailureToast && (
        <Toasts
          onClose={() => setShowDownvoteFailureToast(false)}
          variant={"danger"}
          variantBody={"danger-subtle"}
          title={"Failure"}
          titleColor={"white"}
          description={"Failed to downvote. Please log in to downvote."}
        />
      )}
    </>
  );
}
