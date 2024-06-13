import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById } from "../../api/questionApi.js";
import { getCommentsByPostId } from "../../api/commentApi.js";
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
import CommentForm from "../organisms/CommentForm/index.jsx";

export default function SinglePostQuestionPagesLayout() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState(0);
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

  useEffect(() => {
    async function fetchQuestionAndComments() {
      try {
        const question = await getQuestionById(id);
        let comments = await getCommentsByPostId(id);
        comments = comments.sort((a, b) => {
          if (sortOrder === "latest") {
            return new Date(b.commentedAt) - new Date(a.commentedAt);
          } else {
            return new Date(a.commentedAt) - new Date(b.commentedAt);
          }
        });
        let votes = await getVotes(id);
        setVotes(votes.length);
        setPost(question);
        setComments(comments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching question and comments:", error);
        setLoading(false);
      }
    }
    fetchQuestionAndComments();
  }, [id, sortOrder]);

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
                  description={post.body}
                  imageSrc={post.imageUrl}
                  imageAlt={post.title}
                  createdAt={new Date(post.createdAt).toLocaleString()}
                  username={post.createdBy.username}
                  avatarSrc={post.createdBy.avatar}
                  avatarAlt={post.createdBy.username}
                  votes={votes}
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
                <CommentForm onNewComment={handleNewComment} />
              </div>
              {currentComments.map((comment) => (
                <>
                  {comment && comment.commentedBy && (
                    <Card key={comment.uuid} className="mb-3">
                      <TypographyText cssReset={true}>
                        {timeAgo(comment.commentedAt)}
                      </TypographyText>
                      <SubheadingText
                        cssReset={true}
                        className="fw-semibold text-primary"
                      >
                        {comment.commentedBy.username}
                      </SubheadingText>
                      <TypographyText cssReset={true}>
                        {comment.body}
                      </TypographyText>
                    </Card>
                  )}
                </>
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
