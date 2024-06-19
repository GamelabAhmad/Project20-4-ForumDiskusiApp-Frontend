import Sidebar from "../molecules/Sidebar/index.jsx";
import Card from "../molecules/Card/index.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import PagesLayout from "./PagesLayout.jsx";
import CardHeader from "../organisms/CardHeader/index.jsx";
import CardPost from "../organisms/CardPost/index.jsx";
import { useEffect, useState } from "react";
import { getQuestions } from "../../api/questionApi.js";
import { getCommentsByPostId } from "../../api/commentApi.js";
import { getVotes } from "../../api/voteApi.js";
import { Link } from "react-router-dom";

export default function MainPagesLayout() {
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState({});
  const [votesData, setVotesData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestionsAndComments() {
      try {
        let questions = await getQuestions();
        const comments = {};
        const votesData = {};
        questions = questions.filter(
          (question) =>
            question.createdBy.uuid === "clxbwkys80001jp9e005w5gwz" ||
            question.createdBy.username.toLowerCase() === "twenties",
        );

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
        setQuestions(questions);
        setComments(comments);
        setVotesData(votesData);
        setLoading(false);
        console.log("Votes data:", votesData);
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
                title={"Welcome to Twenties!"}
                description={
                  "Twenties is are a website of Forum Discussion App where you can ask questions and share your knowledge with others. You can also follow other users, like their questions and answers, and comment on them."
                }
                buttonTitle={"Ask a Question"}
                toastsMessage={"ask a question"}
              />
            </div>
            <div className="col-12 col-lg-10 ms-auto mb-3">
              {questions.map((question) => (
                <CardPost
                  key={question.uuid}
                  topic={question.topic?.name}
                  title={
                    <Link
                      to={`/question/${question.uuid}`}
                      className="text-decoration-none"
                    >
                      {question.title}
                    </Link>
                  }
                  showImage={false}
                  showButtons={false}
                  description={question.body}
                  createdAt={new Date(question.createdAt).toLocaleString()}
                  username={question.createdBy.username}
                  avatarSrc={question.createdBy.avatar}
                  avatarAlt={question.createdBy.username}
                  votes={votesData[question.uuid]?.votes || 0}
                  downvotes={votesData[question.uuid]?.downVotes || 0}
                  answers={comments[question.uuid]?.length || 0}
                  className={"mb-3"}
                />
              ))}
            </div>
          </div>
        </ContainerLayout>
      </PagesLayout>
    </>
  );
}
