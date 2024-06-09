import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById } from "../../api/questionApi.js";
import { getCommentsByPostId } from "../../api/commentApi.js";
import { timeAgo } from "../../utils/timeDistance.js"; // new import
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

export default function SinglePostQuestionPagesLayout() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("latest");
  const { id } = useParams();

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
                  votes={post.votes || 0}
                  answers={comments.length || 0}
                  views={post.views || 0}
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

              {comments.map((comment) => (
                <>
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
                </>
              ))}
            </div>
          </div>
        </ContainerLayout>
      </PagesLayout>
    </>
  );
}
