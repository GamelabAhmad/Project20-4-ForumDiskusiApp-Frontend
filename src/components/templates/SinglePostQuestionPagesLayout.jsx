import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuestionById } from "../../api/questionApi.js";
import {
  getCommentsByPostId,
  deleteCommentById,
} from "../../api/commentApi.js";
import { getVotes } from "../../api/voteApi.js";
import { timeAgo } from "../../utils/timeDistance.js";
import Sidebar from "../molecules/Sidebar/index.jsx";
import Card from "../molecules/Card/index.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import PagesLayout from "./PagesLayout.jsx";
import CardPost from "../organisms/CardPost/index.jsx";
import SkeletonPlaceholder from "../atoms/SkeletonPlaceholder/index.jsx";
import HeadingText from "../atoms/HeadingText/index.jsx";
import TypographyText from "../atoms/TypographyText/index.jsx";
import SubheadingText from "../atoms/SubheadingText/index.jsx";
import IconPlaceholder from "../atoms/IconPlaceholder/index.jsx";
import Button from "../atoms/Button/index.jsx";
import { getUserProfile } from "../../api/userApi.js";
import Toasts from "../molecules/Toasts/index.jsx";
import EditCommentForm from "../organisms/EditCommentForm/index.jsx";
import CreateCommentForm from "../organisms/CreateCommentForm/index.jsx";
import Cookies from "js-cookie";
import CommentVote from "../organisms/CommentVote/index.jsx";
import { getCommentVotes } from "../../api/commentVotesApi.js";

export default function SinglePostQuestionPagesLayout() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const [upVotes, setUpVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);
  const [profiles, setProfiles] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment,
  );
  const [editingComment, setEditingComment] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailureToast, setShowFailureToast] = useState(false);
  const [formValues, setFormValues] = useState({ body: "" });
  const [commentVotes, setCommentVotes] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const commentFormRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchQuestionAndComments() {
      try {
        const question = await getQuestionById(id);
        let comments = await getCommentsByPostId(id);
        let profile = null;
        let isGuest = !Cookies.get("user");
        if (!isGuest) {
          profile = await getUserProfile();
        }
        comments = comments.sort((a, b) => {
          if (sortOrder === "latest") {
            return new Date(b.commentedAt) - new Date(a.commentedAt);
          } else {
            return new Date(a.commentedAt) - new Date(b.commentedAt);
          }
        });
        let votes = isGuest ? [] : await getVotes(id);
        if (isMounted) {
          setVotes(votes.length);
          let upVotes = votes.filter((vote) => vote.role === "VOTE");
          setUpVotes(upVotes.length);
          let downVotes = votes.filter((vote) => vote.role === "DOWNVOTE");
          setDownVotes(downVotes.length);

          let commentsData = [];
          let commentVotesData = {};

          for (let comment of comments) {
            let commentVotes = isGuest
              ? []
              : await getCommentVotes(comment.uuid);
            let upVotesComments = commentVotes.filter(
              (commentVote) => commentVote.role === "VOTE",
            );
            let downVotesComments = commentVotes.filter(
              (commentVote) => commentVote.role === "DOWNVOTE",
            );

            commentVotesData[comment.uuid] = {
              upVotes: upVotesComments.length,
              downVotes: downVotesComments.length,
            };

            commentsData.push({
              ...comment,
              upVotes: upVotesComments.length,
              downVotes: downVotesComments.length,
            });
          }

          setCommentsData(commentsData);
          setCommentVotes(commentVotesData);
          setProfiles(profile);
          setComments(comments);
          setPost(question);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching question and comments:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchQuestionAndComments();

    return () => {
      isMounted = false;
    };
  }, [id, sortOrder]);

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setFormValues({ body: comment.body });
    console.log("Editing comment:", comment);
  };

  useEffect(() => {
    setFormValues({ body: editingComment ? editingComment.body : "" });
  }, [editingComment]);

  const handleUpdateComment = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.uuid === updatedComment.uuid ? updatedComment : comment,
      ),
    );
  };

  const handleDeleteComment = async (uuid) => {
    try {
      await deleteCommentById(uuid);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.uuid !== uuid),
      );
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } catch (error) {
      console.error("Error deleting comment:", error);
      setShowFailureToast(true);
      setTimeout(() => setShowFailureToast(false), 3000);
    }
  };

  useEffect(() => {
    const sortedComments = [...comments];
    sortedComments.sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.commentedAt) - new Date(a.commentedAt);
      } else {
        return new Date(a.commentedAt) - new Date(b.commentedAt);
      }
    });

    setComments(sortedComments);
  }, [sortOrder]);

  const handleSortOrderChange = (order, event) => {
    event.preventDefault();
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const maxPageNumbersToShow = 5;
  const startPage = Math.max(
    currentPage - Math.floor(maxPageNumbersToShow / 2),
    1,
  );
  const endPage = Math.min(
    startPage + maxPageNumbersToShow - 1,
    Math.ceil(comments.length / commentsPerPage),
  );

  useEffect(() => {
    if (editingComment && commentFormRef.current) {
      commentFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [editingComment]);

  return (
    <>
      <PagesLayout>
        <ContainerLayout>
          <div className="row">
            <aside className="col-12 col-lg-2 mb-3 mb-lg-0">
              <Card className="shadow-sm">
                <Sidebar />
              </Card>
            </aside>
            <div className="col-12 col-lg-10 mb-lg-0">
              {loading ? (
                <SkeletonPlaceholder
                  variant={"secondary"}
                  className={"col-12"}
                />
              ) : post ? (
                <CardPost
                  title={post.title}
                  topic={post.topic?.name}
                  description={post.body}
                  imageSrc={post.imageUrl}
                  imageAlt={post.title}
                  createdAt={new Date(post.createdAt).toLocaleString()}
                  username={post.createdBy.username}
                  avatarSrc={post.createdBy.avatar}
                  avatarAlt={post.createdBy.username}
                  votes={upVotes}
                  downvotes={downVotes}
                  answers={comments.length || 0}
                  className={"mb-3"}
                />
              ) : (
                <Card>
                  <Card.Title className="d-flex align-items-center justify-content-center fw-semibold">
                    No post available
                  </Card.Title>
                </Card>
              )}
            </div>
            <div className="col-12 col-lg-10 ms-auto mb-3 mb-lg-0">
              <div className="d-flex justify-content-between align-items-center m-0">
                <div className="mb-3">
                  <HeadingText
                    cssReset={true}
                    className="fw-semibold text-primary"
                  >
                    Comments
                  </HeadingText>
                  <TypographyText cssReset={true}>
                    Total Comments: {comments.length}
                  </TypographyText>
                </div>
                <div className="dropdown">
                  <Button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <IconPlaceholder variant={"funnel"} />
                  </Button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(event) =>
                          handleSortOrderChange("latest", event)
                        }
                      >
                        Latest
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(event) =>
                          handleSortOrderChange("oldest", event)
                        }
                      >
                        Oldest
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                {editingComment ? (
                  <div ref={commentFormRef}>
                    <EditCommentForm
                      onUpdateComment={handleUpdateComment}
                      editingComment={editingComment}
                    />
                  </div>
                ) : (
                  <div ref={commentFormRef}>
                    <CreateCommentForm onNewComment={handleNewComment} />
                  </div>
                )}
              </div>
              {currentComments.map((comment) => (
                <Card key={comment.uuid} className="mb-3 w-100 p-3">
                  <div className="d-flex w-100">
                    <div className="d-grid justify-content-center me-4 row">
                      <TypographyText
                        cssReset={true}
                        className="col align-self-start"
                      >
                        {commentVotes[comment.uuid]?.upVotes || 0}
                      </TypographyText>
                      <TypographyText
                        cssReset={true}
                        className="col align-self-end"
                      >
                        {commentVotes[comment.uuid]?.downVotes || 0}
                      </TypographyText>
                    </div>
                    <div className="w-100">
                      <div className="d-flex justify-content-between m-0 align-items-center">
                        <TypographyText cssReset={true}>
                          {timeAgo(comment.commentedAt)}
                        </TypographyText>
                        <div className="d-flex gap-2">
                          {Cookies.get("user") &&
                            comment.commentedBy.username ===
                              profiles?.username && (
                              <>
                                <Button
                                  variant={"success"}
                                  className="rounded-3 btn-sm mb-1"
                                  onClick={() => handleEditComment(comment)}
                                >
                                  <IconPlaceholder variant={"pencil"} />
                                </Button>
                                <Button
                                  variant={"danger"}
                                  className="rounded-3 btn-sm mb-1"
                                  onClick={() =>
                                    handleDeleteComment(comment.uuid)
                                  }
                                >
                                  <IconPlaceholder variant={"trash"} />
                                </Button>
                              </>
                            )}
                          {showSuccessToast && (
                            <Toasts
                              onClose={() => setShowSuccessToast(false)}
                              variant={"success"}
                              variantBody={"success-subtle"}
                              title={"Success"}
                              titleColor={"white"}
                              description={
                                "Comment has been successfully deleted."
                              }
                            />
                          )}
                          {showFailureToast && (
                            <Toasts
                              onClose={() => setShowFailureToast(false)}
                              variant={"danger"}
                              variantBody={"danger-subtle"}
                              title={"Failure"}
                              titleColor={"white"}
                              description={"Failed to delete comment."}
                            />
                          )}
                        </div>
                      </div>
                      <SubheadingText
                        cssReset={true}
                        className="fw-semibold text-primary"
                      >
                        <Link
                          to={`/profile/${comment.commentedBy.username}`}
                          className="text-decoration-none"
                        >
                          {comment.commentedBy.username}
                        </Link>
                      </SubheadingText>
                      <TypographyText cssReset={true} className="py-2">
                        {comment.body}
                      </TypographyText>
                      <div className="d-flex gap-2 align-items-center m-0 mt-2">
                        {comment && comment.uuid && (
                          <>
                            <CommentVote commentId={comment.uuid} />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              <div className="justify-content-center d-flex">
                <ul className="pagination">
                  <li className="page-item">
                    <a
                      role="button"
                      className="page-link"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                          paginate(currentPage - 1);
                        }
                      }}
                    >
                      Previous
                    </a>
                  </li>
                  {Array(endPage - startPage + 1)
                    .fill()
                    .map((_, index) => (
                      <li key={index + startPage} className={`page-item`}>
                        <a
                          role="button"
                          className={`page-link ${currentPage === index + startPage ? "bg-primary-subtle text-body" : ""}`}
                          onClick={(e) => {
                            e.preventDefault();
                            paginate(index + startPage);
                          }}
                        >
                          {index + startPage}
                        </a>
                      </li>
                    ))}
                  <li className="page-item">
                    <a
                      role="button"
                      className="page-link"
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          currentPage <
                          Math.ceil(comments.length / commentsPerPage)
                        ) {
                          paginate(currentPage + 1);
                        }
                      }}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ContainerLayout>
      </PagesLayout>
    </>
  );
}
