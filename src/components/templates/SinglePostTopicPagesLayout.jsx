import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getTopicById } from "../../api/topicApi.js";
import { getQuestionsByTopic } from "../../api/questionApi.js";
import { getVotes } from "../../api/voteApi.js";
import { getCommentsByPostId } from "../../api/commentApi.js";
import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import CardPost from "../organisms/CardPost/index.jsx";
import Card from "../molecules/Card/index.jsx";
import Sidebar from "../molecules/Sidebar/index.jsx";
import CardHeader from "../organisms/CardHeader/index.jsx";
import TypographyText from "../atoms/TypographyText/index.jsx";
import NavTabs from "../molecules/NavTabs/index.jsx";

export default function SinglePostTopicPagesLayout() {
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState({});
  const [topic, setTopic] = useState(null);
  const [votesData, setVotesData] = useState({});
  const { id } = useParams();
  const fetchDataRef = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("latest");
  const [sortedQuestions, setSortedQuestions] = useState([]);

  useEffect(() => {
    if (!fetchDataRef.current) {
      async function fetchTopic() {
        try {
          const topic = await getTopicById(id);
          setTopic(topic);
          const questions = await getQuestionsByTopic(id);
          setQuestions(questions);
          const comments = {};
          const votesData = {};

          for (let question of questions) {
            comments[question.uuid] = await getCommentsByPostId(question.uuid);
            let votes = await getVotes(question.uuid);
            let upVotes = votes.filter((vote) => vote.role === "VOTE");
            let downVotes = votes.filter((vote) => vote.role === "DOWNVOTE");

            votesData[question.uuid] = {
              votes: upVotes.length,
              downVotes: downVotes.length,
            };
          }
          setComments(comments);
          setVotesData(votesData);
          console.log("votesData", votesData);
        } catch (error) {
          console.error("Error fetching topic:", error);
        }
      }
      fetchTopic();
      fetchDataRef.current = true;
    }
  }, [id]);

  const filteredQuestions = sortedQuestions.filter(
    (question) => question.forumID === null,
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
              {topic && (
                <CardHeader
                  title={topic.name}
                  description={
                    <>
                      <div className="">
                        <TypographyText>
                          Total questions:{" "}
                          {
                            questions.filter(
                              (question) => question.forumID === null,
                            ).length
                          }
                        </TypographyText>
                        <TypographyText>
                          Oldest question:{" "}
                          {questions.filter(
                            (question) => question.forumID === null,
                          ).length > 0
                            ? questions.filter(
                                (question) => question.forumID === null,
                              )[0].title
                            : "No questions found"}
                        </TypographyText>
                        <TypographyText>
                          Newest question:{" "}
                          {questions.filter(
                            (question) => question.forumID === null,
                          ).length > 0
                            ? questions.filter(
                                (question) => question.forumID === null,
                              )[
                                questions.filter(
                                  (question) => question.forumID === null,
                                ).length - 1
                              ].title
                            : "No questions found"}
                        </TypographyText>
                        <NavTabs onTabClick={handleSortOrderChange} />
                      </div>
                    </>
                  }
                  buttonTitle={"Ask a Question"}
                  toastsMessage={"ask a question"}
                />
              )}
            </div>
            <div className="col-12 col-lg-10 ms-auto mb-4">
              {topic ? (
                <>
                  {currentQuestions.length > 0 ? (
                    currentQuestions
                      .filter((question) => question.forumID === null)
                      .map((question) => (
                        <CardPost
                          key={question.uuid}
                          title={
                            <Link
                              to={`/question/${question.uuid}`}
                              className="text-decoration-none"
                            >
                              {question.title}
                            </Link>
                          }
                          topic={question.topic?.name}
                          description={question.body}
                          createdAt={new Date(
                            question.createdAt,
                          ).toLocaleString()}
                          username={question.createdBy.username}
                          avatarSrc={question.createdBy.avatar}
                          avatarAlt={question.createdBy.username}
                          votes={votesData[question.uuid]?.votes || 0}
                          downVotes={votesData[question.uuid]?.downVotes || 0}
                          answers={
                            comments[question.uuid]
                              ? comments[question.uuid].length
                              : 0
                          }
                          views={question.views || 0}
                          showImage={false}
                          showButtons={false}
                          className={"mb-3"}
                        />
                      ))
                  ) : (
                    <Card className="shadow-sm">
                      <Card.Description className="text-center">
                        No questions found for this topic
                      </Card.Description>
                    </Card>
                  )}
                </>
              ) : (
                <p>Loading...</p>
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
    </>
  );
}
