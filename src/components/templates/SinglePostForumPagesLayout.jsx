import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import { getForumById } from "../../api/forumApi.js";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../molecules/Card/index.jsx";
import Sidebar from "../molecules/Sidebar/index.jsx";
import Cookies from "js-cookie";
import Button from "../atoms/Button/index.jsx";
import Toasts from "../molecules/Toasts/index.jsx";
import { getQuestionsByForum } from "../../api/questionApi.js";
import CardPost from "../organisms/CardPost/index.jsx";
import { getCommentsByPostId } from "../../api/commentApi.js";

export default function SinglePostForumPagesLayout() {
  const [forum, setForum] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState({});
  const { id } = useParams();
  const token = Cookies.get("jwt");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchForum() {
      try {
        const forum = await getForumById(id);
        const questions = await getQuestionsByForum(id);
        const comments = {};
        for (let question of questions) {
          comments[question.uuid] = await getCommentsByPostId(question.uuid);
        }
        setForum(forum);
        setQuestions(questions);
        setComments(comments);
        console.log("Data:", questions);
      } catch (error) {
        console.error("Error fetching forum:", error);
      }
    }
    fetchForum();
  }, [id]);

  const handleForumClick = async (e) => {
    if (!token) {
      e.preventDefault();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }

    try {
      const getForum = await getForumById(id);
      localStorage.setItem("selectedForum", getForum.name);
      localStorage.setItem("selectedForumId", getForum.uuid);
      console.log("Forum created:", getForum.name + getForum.uuid);
      navigate("/dashboard/create-discussion/");
    } catch (error) {
      console.error("Error fetching forum:", error);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
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
            <div className="col-12 col-lg-10">
              {forum ? (
                <>
                  <Card className="shadow-sm p-3 mb-3">
                    <div className="d-flex justify-content-between mb-3">
                      <Card.Title className="fw-semibold text-primary">
                        {forum.name}
                      </Card.Title>
                      <Button
                        variant="primary"
                        onClick={handleForumClick}
                        className="rounded-3"
                      >
                        Create a Discussion
                      </Button>
                    </div>
                    <Card.Description className="lh-base">
                      {forum.description}
                    </Card.Description>
                  </Card>
                </>
              ) : (
                <p>Loading...</p>
              )}
              {questions.length > 0 ? (
                questions
                  .filter((question) => question.forum !== null)
                  .map((question) => (
                    <CardPost
                      key={question.id}
                      topic={question.topic?.name}
                      title={
                        <Link
                          to={`/question/${question.uuid}`}
                          className="text-decoration-none"
                        >
                          {question.title}
                        </Link>
                      }
                      description={question.body}
                      createdAt={new Date(question.createdAt).toLocaleString()}
                      username={question.createdBy.username}
                      avatarSrc={question.createdBy.avatar}
                      avatarAlt={question.createdBy.username}
                      answers={comments[question.uuid].length || 0}
                      showImage={false}
                      showButtons={false}
                      className={"mb-3"}
                    />
                  ))
              ) : (
                <Card className="mb-3">
                  <Card.Title className="d-flex align-items-center justify-content-center fw-semibold">
                    No Questions available
                  </Card.Title>
                </Card>
              )}
            </div>
          </div>
        </ContainerLayout>
      </PagesLayout>
      {showToast && (
        <Toasts
          onClose={handleCloseToast}
          variant={"danger"}
          variantBody={"danger-subtle"}
          title={"Warning"}
          titleColor={"white"}
          description={`You need to login to create Discussion.`}
        />
      )}
    </>
  );
}
