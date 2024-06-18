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
  updateCommentVotes,
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
  const [showRemoveUpvoteToast, setShowRemoveUpvoteToast] = useState(false);
  const [showRemoveDownvoteToast, setShowRemoveDownvoteToast] = useState(false);

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
      let updatedUpvotes = upVotesComments;
      let updatedDownvotes = downVotesComments;

      if (downvoteSuccessful) {
        const removeDownvoteResponse = await downVoteComment(commentId);
        if (removeDownvoteResponse.message === "DOWNVOTE removed") {
          setDownvoteSuccessful(false);
          updatedDownvotes = Math.max(downVotesComments - 1, 0);
          setDownVotesComments(updatedDownvotes);
        }
      }
      const upvoteResponse = await upVoteComment(commentId);
      if (upvoteResponse.role === "VOTE") {
        setUpvoteSuccessful(true);
        updatedUpvotes = upVotesComments + 1;
        setUpVotesComments(updatedUpvotes);
        setShowUpvoteSuccessToast(true);
        setTimeout(() => setShowUpvoteSuccessToast(false), 3000);
      } else if (upvoteResponse.message === "VOTE removed") {
        setUpvoteSuccessful(false);
        updatedUpvotes = Math.max(upVotesComments - 1, 0);
        setUpVotesComments(updatedUpvotes);
        setShowRemoveUpvoteToast(true);
        setTimeout(() => setShowRemoveUpvoteToast(false), 3000);
      }
      updateCommentVotes(commentId, updatedUpvotes, updatedDownvotes);
    } catch (error) {
      console.error("Error upvoting comment:", error);
      setShowUpvoteFailureToast(true);
      setTimeout(() => setShowUpvoteFailureToast(false), 3000);
    }
  };

  const handleDownvoteComment = async () => {
    try {
      let updatedUpvotes = upVotesComments;
      let updatedDownvotes = downVotesComments;

      if (upvoteSuccessful) {
        const removeUpvoteResponse = await upVoteComment(commentId);
        if (removeUpvoteResponse.message === "VOTE removed") {
          setUpvoteSuccessful(false);
          updatedUpvotes = Math.max(upVotesComments - 1, 0);
          setUpVotesComments(updatedUpvotes);
        }
      }
      const downvoteResponse = await downVoteComment(commentId);
      if (downvoteResponse.role === "DOWNVOTE") {
        setDownvoteSuccessful(true);
        updatedDownvotes = downVotesComments + 1;
        setDownVotesComments(updatedDownvotes);
        setShowDownvoteSuccessToast(true);
        setTimeout(() => setShowDownvoteSuccessToast(false), 3000);
      } else if (downvoteResponse.message === "DOWNVOTE removed") {
        setDownvoteSuccessful(false);
        updatedDownvotes = Math.max(downVotesComments - 1, 0);
        setDownVotesComments(updatedDownvotes);
        setShowRemoveDownvoteToast(true);
        setTimeout(() => setShowRemoveDownvoteToast(false), 3000);
      }
      updateCommentVotes(commentId, updatedUpvotes, updatedDownvotes);
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
      {showRemoveUpvoteToast && (
        <Toasts
          onClose={() => setShowRemoveUpvoteToast(false)}
          variant={"warning"}
          variantBody={"warning-subtle"}
          title={"Success"}
          titleColor={"white"}
          description={"Upvote removed successfully."}
        />
      )}
      {showRemoveDownvoteToast && (
        <Toasts
          onClose={() => setShowRemoveDownvoteToast(false)}
          variant={"warning"}
          variantBody={"warning-subtle"}
          title={"Success"}
          titleColor={"white"}
          description={"Downvote removed successfully."}
        />
      )}
    </>
  );
}
