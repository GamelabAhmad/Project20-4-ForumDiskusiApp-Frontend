import Card from "../../molecules/Card/index.jsx";
import SubheadingText from "../../atoms/SubheadingText/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import IconPlaceholder from "../../atoms/IconPlaceholder/index.jsx";
import UserPostDate from "../../molecules/UserPostDate/index.jsx";
import UserPostSummary from "../../molecules/UserPostSummary/index.jsx";
import { useParams } from "react-router-dom";
import { getVotes, voteQuestion } from "../../../api/voteApi.js";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Toasts from "../../molecules/Toasts/index.jsx";

export default function CardPost({
  votes: initialVotes,
  topic,
  answers,
  title,
  description,
  imageSrc,
  imageAlt,
  username,
  avatarSrc,
  avatarAlt,
  createdAt,
  showButtons = true,
  showImage = true,
  className,
  ...props
}) {
  const { id } = useParams();
  const [upvoteSuccessful, setUpvoteSuccessful] = useState(false);
  const [votes, setVotes] = useState(initialVotes);
  const user = Cookies.get("user");

  const [showUpvoteSuccessToast, setShowUpvoteSuccessToast] = useState(false);
  const [showUpvoteFailureToast, setShowUpvoteFailureToast] = useState(false);

  useEffect(() => {
    async function checkVoteStatus() {
      try {
        const response = await getVotes(id);
        const userVote = response.find(
          (vote) => vote.user.username === user && vote.role === "VOTE",
        );
        if (userVote) {
          setUpvoteSuccessful(true);
        } else {
          setUpvoteSuccessful(false);
        }
      } catch (error) {
        console.error("Error checking vote status:", error);
      }
    }

    checkVoteStatus();
  }, [id, user]);

  const handleUpvote = async () => {
    try {
      const response = await voteQuestion(id);
      console.log("Upvoted question:", response);
      if (response.role === "VOTE") {
        setUpvoteSuccessful(true);
        setVotes(votes + 1);
        setShowUpvoteSuccessToast(true);
        setTimeout(() => setShowUpvoteSuccessToast(false), 3000);
      } else if (response.message === "VOTE removed") {
        setUpvoteSuccessful(false);
        setVotes(votes - 1);
        setShowUpvoteSuccessToast(true);
        setTimeout(() => setShowUpvoteSuccessToast(false), 3000);
      }
    } catch (error) {
      console.error("Error upvoting question:", error);
      setShowUpvoteFailureToast(true);
      setTimeout(() => setShowUpvoteFailureToast(false), 3000);
    }
  };

  return (
    <>
      <Card className={`shadow-sm p-3 ${className}`} {...props}>
        <div className="row">
          <div className="col-sm-12 col-lg-2 text-start text-lg-end d-flex d-lg-block gap-3 gap-lg-0 mb-3 mb-lg-0">
            <UserPostSummary votes={votes} answers={answers} />
          </div>
          <div className="col-12 col-lg-10">
            <div className="">
              <Button
                variant={"primary"}
                className="rounded-3 pe-none btn-sm mb-1"
              >
                #{topic}
              </Button>
            </div>
            <Card.Title className="text-primary">
              <SubheadingText cssReset={true} className="fw-semibold">
                {title}
              </SubheadingText>
            </Card.Title>
            <Card.Description className="lh-base mb-3">
              {description}
            </Card.Description>
            {showImage && (
              <Card.Images
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                widthImage={"1000px"}
                heightImage={"500px"}
                className={"object-fit-contain w-100"}
              />
            )}
            <div className="d-flex justify-content-between row">
              {showButtons ? (
                <>
                  <div className={`d-flex gap-3 col-12 col-md-6 mb-3 mb-md-0`}>
                    <Button
                      variant={upvoteSuccessful ? "success" : "primary"}
                      className={"w-100 w-md-auto rounded-3"}
                      onClick={handleUpvote}
                    >
                      <IconPlaceholder variant={"arrow-up"} />
                      Upvote
                    </Button>
                    <Button
                      variant={"primary"}
                      className="w-100 w-md-auto rounded-3"
                    >
                      <IconPlaceholder variant={"arrow-down"} />
                      Downvote
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`d-flex gap-3 col-12 col-md-6 mb-3 mb-md-0`}
                  ></div>
                </>
              )}
              <div className="col-12 col-md-6">
                <UserPostDate
                  className={"d-md-flex justify-content-md-end"}
                  username={username}
                  avatarSrc={avatarSrc}
                  avatarAlt={avatarAlt}
                  createdAt={createdAt}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
      {showUpvoteSuccessToast && (
        <Toasts
          onClose={() => setShowUpvoteSuccessToast(false)}
          variant={"success"}
          variantBody={"success-subtle"}
          title={"Success"}
          titleColor={"white"}
          description={"Upvote successful."}
        />
      )}
      {showUpvoteFailureToast && (
        <Toasts
          onClose={() => setShowUpvoteFailureToast(false)}
          variant={"danger"}
          variantBody={"danger-subtle"}
          title={"Failure"}
          titleColor={"white"}
          description={"Failed to upvote. Please log in to upvote."}
        />
      )}
    </>
  );
}
