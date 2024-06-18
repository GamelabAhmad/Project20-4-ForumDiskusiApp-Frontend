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
import NavTabs from "../molecules/NavTabs/index.jsx";

export default function SinglePostForumPagesLayout() {
  const [forum, setForum] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState({});
  const { id } = useParams();
  const token = Cookies.get("jwt");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("latest");
  const [sortedQuestions, setSortedQuestions] = useState([]);

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

  useEffect(() => {
    const newSortedQuestions = [...questions];
    newSortedQuestions.sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    setSortedQuestions(newSortedQuestions);
  }, [sortOrder, questions]);

  const filteredQuestions = sortedQuestions.filter(
    (question) => question.forum !== null,
  );
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion,
  );
  const maxPageNumbersToShow = 5;
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  let startPage = Math.max(
    currentPage - Math.floor(maxPageNumbersToShow / 2),
    1,
  );
  let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);
  if (endPage - startPage + 1 < maxPageNumbersToShow && startPage > 1) {
    startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
  }

  const handleSortOrderChange = (tabId, event) => {
    event.preventDefault();
    if (tabId === "tab1") {
      setSortOrder("oldest");
    } else if (tabId === "tab2") {
      setSortOrder("latest");
    }
    setCurrentPage(1);
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
                    <NavTabs onTabClick={handleSortOrderChange} />
                  </Card>
                </>
              ) : (
                <p>Loading...</p>
              )}
              {currentQuestions.length > 0 ? (
                currentQuestions
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
              <div className="justify-content-center d-flex">
                <ul className="pagination">
                  <li className="page-item">
                    <a
                      role="button"
                      className="page-link"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
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
                            setCurrentPage(index + startPage);
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
                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                      disabled={currentPage === totalPages}
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
