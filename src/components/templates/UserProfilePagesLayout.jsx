import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserByUsername } from "../../api/userApi.js";
import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import HeadingText from "../atoms/HeadingText/index.jsx";
import AvatarPlaceHolder from "../atoms/AvatarPlaceholder/index.jsx";
import { getQuestionByUser } from "../../api/questionApi.js";
import Card from "../molecules/Card/index.jsx";
import CardPost from "../organisms/CardPost/index.jsx";
import Button from "../atoms/Button/index.jsx";
import { getCommentsByPostId } from "../../api/commentApi.js";
import { getFollowers, getFollowing } from "../../api/followApi.js";

export default function UserProfilePagesLayout() {
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUser = await getUserByUsername(id);
        const comments = {};
        const follower = await getFollowers(fetchedUser.uuid);
        const following = await getFollowing(fetchedUser.uuid);
        for (let question of questions) {
          comments[question.uuid] = await getCommentsByPostId(question.uuid);
        }
        setFollowers(follower);
        setFollowing(following);
        setComments(comments);
        setUser(fetchedUser);
        if (fetchedUser) {
          const fetchedQuestions = await getQuestionByUser(fetchedUser.uuid);
          setQuestions(fetchedQuestions);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id, questions]);

  return (
    <PagesLayout>
      <ContainerLayout>
        {user ? (
          <>
            <Card key={user.uuid} className="p-3 mb-3">
              <div className="d-md-flex justify-content-between">
                <div className="d-grid d-md-flex gap-4 text-center text-md-start">
                  <AvatarPlaceHolder
                    src={user.avatar}
                    alt={user.username}
                    heightAvatar={150}
                    widthAvatar={150}
                    className="border border-2 rounded-circle border-primary img-fluid mx-auto mx-md-0"
                  />
                  <div>
                    <Card.Title className="fw-semibold text-primary mb-2">
                      {user.username}
                    </Card.Title>
                    <Card.Description className="fw-lighter mb-3 mb-md-0">
                      {user.name ? user.name : "(No name)"}
                    </Card.Description>
                    <div className="d-flex align-items-center mt-3 mb-3 gap-3 justify-content-center">
                      <Button
                        variant={`primary`}
                        className="rounded-3 pe-none btn-sm"
                      >
                        {followers.count || 0} followers
                      </Button>
                      <Button
                        variant={`primary`}
                        className="rounded-3 pe-none btn-sm"
                      >
                        {following.count || 0} following
                      </Button>
                    </div>
                    <Card.Description className="fw-lighter mb-3 mb-md-0">
                      {user.bio ? user.bio : "No bio available"}
                    </Card.Description>
                  </div>
                </div>
                <div className="">
                  <Button variant={"primary"} className="w-100 w-md-auto">
                    Follow
                  </Button>
                </div>
              </div>
            </Card>
            {questions.length > 0 ? (
              questions.map((question) => (
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
                  createdAt={new Date(question.createdAt).toLocaleString()}
                  username={question.createdBy.username}
                  avatarSrc={question.createdBy.avatar}
                  avatarAlt={question.createdBy.username}
                  votes={question.QuestionVotes.length}
                  answers={
                    comments[question.uuid] ? comments[question.uuid].length : 0
                  }
                  views={question.views || 0}
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
          </>
        ) : (
          <HeadingText>User not found</HeadingText>
        )}
      </ContainerLayout>
    </PagesLayout>
  );
}
