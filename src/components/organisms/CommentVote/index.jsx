import { useState, useEffect, useRef } from "react";
import {
  upVoteComment,
  downVoteComment,
  getCommentVotes,
} from "../../../api/commentVotesApi.js";
import Button from "../../atoms/Button/index.jsx";
import IconPlaceholder from "../../atoms/IconPlaceholder/index.jsx";
import Cookies from "js-cookie";

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
      } else if (upvoteResponse.message === "VOTE removed") {
        setUpvoteSuccessful(false);
        if (upVotesComments > 0) {
          setUpVotesComments(upVotesComments - 1);
        }
      }
      window.location.reload();
    } catch (error) {
      console.error("Error upvoting comment:", error);
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
      } else if (downvoteResponse.message === "DOWNVOTE removed") {
        setDownvoteSuccessful(false);
        if (downVotesComments > 0) {
          setDownVotesComments(downVotesComments - 1);
        }
      }
      window.location.reload();
    } catch (error) {
      console.error("Error downvoting comment:", error);
    }
  };

  return (
    <div className="d-flex gap-2 align-items-center m-0 mt-2">
      <Button
        variant={upvoteSuccessful ? "success" : "primary"}
        className={"w-100 w-md-auto rounded-3"}
        onClick={handleUpvoteComment}
      >
        <IconPlaceholder variant={"arrow-up"} />
      </Button>
      <Button
        variant={downvoteSuccessful ? "danger" : "primary"}
        className="w-100 w-md-auto rounded-3"
        onClick={handleDownvoteComment}
      >
        <IconPlaceholder variant={"arrow-down"} />
      </Button>
    </div>
  );
}
