import React, { useEffect, useState } from "react";
import { getQuestions } from "../../api/questionApi.js";
import { getCommentsByPostId } from "../../api/commentApi.js";
import Sidebar from "../molecules/Sidebar/index.jsx";
import Card from "../molecules/Card/index.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import PagesLayout from "./PagesLayout.jsx";
import CardHeader from "../organisms/CardHeader/index.jsx";
import CardPost from "../organisms/CardPost/index.jsx";
import SkeletonPlaceholder from "../atoms/SkeletonPlaceholder/index.jsx";
import { Link } from "react-router-dom";

export default function QuestionPagesLayout() {
  const [userPosts, setUserPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestionsAndComments() {
      try {
        const questions = await getQuestions();
        setUserPosts(questions);
        const comments = {};
        for (let question of questions) {
          comments[question.uuid] = await getCommentsByPostId(question.uuid);
        }
        setComments(comments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions and comments:", error);
        setLoading(false);
      }
    }

    fetchQuestionsAndComments();
  }, []);

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
            <div className="col-12 col-lg-10 mb-3">
              <CardHeader
                title={"Questions"}
                description={
                  "This is the list of questions that have been asked by the community. Feel free to answer any of them! If you have a question, feel free to ask! We are here to help!"
                }
                buttonTitle={"Ask a Question"}
                toastsMessage={"ask a question"}
              />
            </div>
            <div className="col-12 col-lg-10 ms-auto mb-4">
              {loading ? (
                <>
                  <CardPost
                    title={
                      <SkeletonPlaceholder
                        variant={"secondary"}
                        className={"col-12"}
                      />
                    }
                    description={
                      <>
                        <SkeletonPlaceholder
                          variant={"body-tertiary"}
                          className={"col-12"}
                        />
                        <SkeletonPlaceholder
                          variant={"secondary"}
                          className={"col-12"}
                        />
                        <SkeletonPlaceholder
                          variant={"body-tertiary"}
                          className={"col-12"}
                        />
                      </>
                    }
                    showImage={false}
                    showButtons={false}
                    votes={
                      <>
                        <SkeletonPlaceholder
                          variant={"secondary"}
                          className={"col-12 col-lg-4"}
                        />
                      </>
                    }
                    answers={
                      <>
                        <SkeletonPlaceholder
                          variant={"body-tertiary"}
                          className={"col-12 col-lg-4"}
                        />
                      </>
                    }
                    views={
                      <>
                        <SkeletonPlaceholder
                          variant={"secondary"}
                          className={"col-12 col-lg-4"}
                        />
                      </>
                    }
                    className={"placeholder-glow mb-3"}
                  />
                </>
              ) : userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <CardPost
                    key={post.uuid}
                    title={
                      <Link
                        to={`/question/${post.uuid}`}
                        className="text-decoration-none"
                      >
                        {post.title}
                      </Link>
                    }
                    description={post.body}
                    createdAt={new Date(post.createdAt).toLocaleString()}
                    username={post.createdBy.username}
                    avatarSrc={post.createdBy.avatar}
                    avatarAlt={post.createdBy.username}
                    votes={post.votes || 0}
                    answers={comments[post.uuid].length || 0}
                    views={post.views || 0}
                    showImage={false}
                    showButtons={false}
                    className={"mb-3"}
                  />
                ))
              ) : (
                <Card>
                  <Card.Title className="d-flex align-items-center justify-content-center fw-semibold">
                    No posts available
                  </Card.Title>
                </Card>
              )}
            </div>
          </div>
        </ContainerLayout>
      </PagesLayout>
    </>
  );
}
