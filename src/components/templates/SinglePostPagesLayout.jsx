import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById } from "../../api/questionApi.js";
import Sidebar from "../molecules/Sidebar/index.jsx";
import Card from "../molecules/Card/index.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import PagesLayout from "./PagesLayout.jsx";
import CardPost from "../organisms/CardPost/index.jsx";
import SkeletonPlaceholder from "../atoms/SkeletonPlaceholder/index.jsx";

export default function SinglePostPagesLayout() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const question = await getQuestionById(id);
        setPost(question);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching question:", error);
        setLoading(false);
      }
    }

    fetchQuestion();
  }, [id]);

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
            <div className="col-12 col-lg-10 mb-3 mb-lg-0">
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
                  answers={post.answers || 0}
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
          </div>
        </ContainerLayout>
      </PagesLayout>
    </>
  );
}
