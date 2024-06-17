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

export default function SinglePostTopicPagesLayout() {
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState({});
  const [topic, setTopic] = useState(null);
  const [votesData, setVotesData] = useState({});
  const { id } = useParams();
  const fetchDataRef = useRef(false);

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
                      <TypographyText>
                        Total questions: {questions.length}
                      </TypographyText>
                      <TypographyText>
                        Oldest question:{" "}
                        {questions.length > 0
                          ? questions[0].title
                          : "No questions found"}
                      </TypographyText>
                      <TypographyText>
                        Newest question:{" "}
                        {questions.length > 0
                          ? questions[questions.length - 1].title
                          : "No questions found"}
                      </TypographyText>
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
                  {questions.length > 0 ? (
                    questions
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
            </div>
          </div>
        </ContainerLayout>
      </PagesLayout>
    </>
  );
}
