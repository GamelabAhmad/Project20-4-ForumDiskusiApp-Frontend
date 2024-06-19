import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { getUserByUsername, getUserProfile } from "../../api/userApi.js";
import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import AvatarPlaceHolder from "../atoms/AvatarPlaceholder/index.jsx";
import { getQuestionByUser } from "../../api/questionApi.js";
import Card from "../molecules/Card/index.jsx";
import CardPost from "../organisms/CardPost/index.jsx";
import Button from "../atoms/Button/index.jsx";
import {
  followUser,
  getFollowersUser,
  getFollowingUser,
  unfollowUser,
  isUserFollowed,
} from "../../api/followApi.js";
import Toasts from "../molecules/Toasts/index.jsx";
import Cookies from "js-cookie";
import { getVotes } from "../../api/voteApi.js";
import { getCommentsByPostId } from "../../api/commentApi.js";
import IconPlaceholder from "../atoms/IconPlaceholder/index.jsx";
import NavTabs from "../molecules/NavTabs/index.jsx";

export default function UserProfilePagesLayout() {
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState({});
  const [follow, setFollow] = useState([]);
  const [getFollowers, setGetFollowers] = useState([]);
  const [getFollowing, setGetFollowing] = useState([]);
  const [showFollowSuccessToast, setShowFollowSuccessToast] = useState(false);
  const [showUnfollowSuccessToast, setShowUnfollowSuccessToast] =
    useState(false);
  const [showGuestToast, setShowGuestToast] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false); // New state for follow status
  const { id } = useParams();
  const [votesData, setVotesData] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const fetchDataRef = useRef(false);
  const loggedInUser = Cookies.get("user");
  const isSameUser = loggedInUser === id;
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("latest");
  const [sortedQuestions, setSortedQuestions] = useState([]);

  const fetchUserProfile = async () => {
    try {
      const profile = await getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleEditProfileClick = () => {
    fetchUserProfile();
  };

  useEffect(() => {
    if (!fetchDataRef.current) {
      async function fetchData() {
        try {
          setIsLoading(true);
          const fetchedUser = await getUserByUsername(id);
          const getFollowers = await getFollowersUser(fetchedUser.uuid);
          const getFollowing = await getFollowingUser(fetchedUser.uuid);
          const votesData = {};

          if (fetchedUser) {
            const fetchedQuestions = await getQuestionByUser(fetchedUser.uuid);
            for (let question of fetchedQuestions) {
              comments[question.uuid] = await getCommentsByPostId(
                question.uuid,
              );
              let votes = await getVotes(question.uuid);
              let upVotes = votes.filter((vote) => vote.role === "VOTE");
              let downVotes = votes.filter((vote) => vote.role === "DOWNVOTE");

              votesData[question.uuid] = {
                votes: upVotes.length,
                downVotes: downVotes.length,
              };
            }
            setQuestions(fetchedQuestions);
          }
          console.log(
            "Votes data for user",
            fetchedUser.username,
            ":",
            votesData,
          );
          setVotesData(votesData);
          setFollow(follow);
          setComments(comments);
          setGetFollowers(getFollowers);
          setGetFollowing(getFollowing);
          setUser(fetchedUser);

          const followed = await isUserFollowed(fetchedUser.uuid);
          setIsFollowed(followed);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setIsLoading(false);
      }

      fetchData();
      fetchDataRef.current = true;
    }
  }, [id]);

  const handleFollow = async () => {
    const token = Cookies.get("jwt");
    if (!token) {
      setShowGuestToast(true);
      return;
    }
    if (isSameUser) {
      console.error("You cannot follow yourself.");
      return;
    }
    try {
      await followUser(user.uuid);
      const updatedFollowers = await getFollowersUser(user.uuid);
      setGetFollowers(updatedFollowers);
      setShowFollowSuccessToast(true);
      setTimeout(() => {
        setShowFollowSuccessToast(false);
      }, 3000);
      setIsFollowed(true);
      console.log("Followed user" + user.username);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    const token = Cookies.get("jwt");
    if (!token) {
      setShowGuestToast(true);
      return;
    }
    if (isSameUser) {
      console.error("You cannot unfollow yourself.");
      return;
    }
    try {
      await unfollowUser(user.uuid);
      const updatedFollowers = await getFollowersUser(user.uuid);
      setGetFollowers(updatedFollowers);
      setShowUnfollowSuccessToast(true);
      setTimeout(() => {
        setShowUnfollowSuccessToast(false);
      }, 3000);
      setIsFollowed(false);
      console.log("Unfollowed user" + user.username);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
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
    (question) => question.forum === null,
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
          {isLoading ? (
            <div>Loading...</div>
          ) : user ? (
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
                        {user.name ? user.name : "-"}
                      </Card.Description>
                      <div className="d-flex align-items-center mt-3 mb-3 gap-3 justify-content-center">
                        <Button
                          variant={`primary`}
                          className="rounded-3 pe-none btn-sm"
                        >
                          {getFollowers.count || 0} followers
                        </Button>
                        <Button
                          variant={`primary`}
                          className="rounded-3 pe-none btn-sm"
                        >
                          {getFollowing.count || 0} following
                        </Button>
                      </div>
                      <Card.Description className="fw-lighter mb-3 mb-md-0">
                        {user.bio ? user.bio : "No bio available"}
                      </Card.Description>
                    </div>
                  </div>
                  {!isSameUser && (
                    <>
                      <div className="">
                        {isFollowed ? (
                          <Button
                            variant={"outline-primary"}
                            className="w-100 w-md-auto"
                            onClick={handleUnfollow}
                          >
                            Unfollow
                          </Button>
                        ) : (
                          <Button
                            variant={"primary"}
                            className="w-100 w-md-auto"
                            onClick={handleFollow}
                          >
                            Follow
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                  {isSameUser && (
                    <div className="">
                      <NavLink
                        to={`/profile/edit`}
                        className="text-decoration-none"
                      >
                        <Button
                          className="btn btn-primary w-100 w-md-auto btn-sm rounded-3 d-flex gap-2"
                          onClick={handleEditProfileClick}
                        >
                          <span className="text-center mx-auto d-flex gap-2">
                            <IconPlaceholder variant={"pencil"} />
                            Edit Profile
                          </span>
                        </Button>
                      </NavLink>
                    </div>
                  )}
                </div>
                <div className="mt-3 w-100 w-lg-25 ms-auto">
                  <NavTabs onTabClick={handleSortOrderChange} />
                </div>
              </Card>
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
                      createdAt={new Date(question.createdAt).toLocaleString()}
                      username={question.createdBy.username}
                      avatarSrc={question.createdBy.avatar}
                      avatarAlt={question.createdBy.username}
                      votes={votesData[question.uuid]?.votes || 0}
                      downvotes={votesData[question.uuid]?.downVotes || 0}
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
                <Card>
                  <Card.Title className="d-flex align-items-center justify-content-center fw-semibold">
                    No posts available
                  </Card.Title>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <Card.Title className="d-flex align-items-center justify-content-center fw-semibold">
                User not found
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
        </ContainerLayout>
      </PagesLayout>
      {showFollowSuccessToast && (
        <Toasts
          onClose={() => setShowFollowSuccessToast(false)}
          variant={"success"}
          variantBody={"success-subtle"}
          title={"Success"}
          titleColor={"white"}
          description={"Follow successful."}
        />
      )}
      {showUnfollowSuccessToast && (
        <Toasts
          onClose={() => setShowUnfollowSuccessToast(false)}
          variant={"warning"}
          variantBody={"warning-subtle"}
          title={"Success"}
          titleColor={"white"}
          description={"Unfollow successful."}
        />
      )}
      {showGuestToast && (
        <Toasts
          onClose={() => setShowGuestToast(false)}
          variant={"danger"}
          variantBody={"danger-subtle"}
          title={"Failure"}
          titleColor={"white"}
          description={"Please log in to follow or unfollow."}
        />
      )}
    </>
  );
}
