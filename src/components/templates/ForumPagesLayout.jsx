import Sidebar from "../molecules/Sidebar/index.jsx";
import Card from "../molecules/Card/index.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import PagesLayout from "./PagesLayout.jsx";
import CardHeader from "../organisms/CardHeader/index.jsx";
import Button from "../atoms/Button/index.jsx";
import { getForums } from "../../api/forumApi.js";
import { useState, useEffect } from "react";
import { joinForum, leaveForum, userMemberForum } from "../../api/memberApi.js";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Toasts from "../molecules/Toasts/index.jsx";
import IconPlaceholder from "../atoms/IconPlaceholder/index.jsx";

export default function ForumPagesLayout() {
  const [forums, setForums] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showJoinSuccessToast, setShowJoinSuccessToast] = useState(false);
  const [showLeaveSuccessToast, setShowLeaveSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const token = Cookies.get("jwt");

  useEffect(() => {
    async function fetchForum() {
      try {
        const forums = await getForums();
        const updatedForums = await Promise.all(
          forums.map(async (forum) => {
            let isMember = false;
            if (token) {
              const membership = await userMemberForum(forum.uuid);
              isMember = membership.isMember;
            }
            return { ...forum, isMember };
          }),
        );
        setForums(updatedForums);
      } catch (error) {
        console.error("Error fetching forum:", error);
      }
    }

    fetchForum();
  }, []);

  const handleJoinForum = async (uuid) => {
    if (!token) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    try {
      await joinForum(uuid);
      setForums(
        forums.map((forum) =>
          forum.uuid === uuid ? { ...forum, isMember: true } : forum,
        ),
      );
      setShowJoinSuccessToast(true);
      setTimeout(() => setShowJoinSuccessToast(false), 3000);
      console.log("Joined forum!");
    } catch (error) {
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
      console.error("Error joining forum:", error);
    }
  };

  const handleLeaveForum = async (uuid) => {
    if (!token) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    try {
      await leaveForum(uuid);
      setForums(
        forums.map((forum) =>
          forum.uuid === uuid ? { ...forum, isMember: false } : forum,
        ),
      );
      setShowLeaveSuccessToast(true);
      setTimeout(() => setShowLeaveSuccessToast(false), 3000);
      console.log("Left forum!");
    } catch (error) {
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
      console.error("Error leaving forum:", error);
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
              <CardHeader
                title={"Forums"}
                description={
                  "This is the list of forums that have been created by the community. Feel free to join any of them! If you have a forum, please talk to the admin to create one! We are here to help!"
                }
                showButton={false}
              />
            </div>
            <div className="col-12 col-lg-10 ms-auto mb-4">
              <Card className={`border-0`}>
                <div className="row">
                  {forums.map((forum) => (
                    <Card
                      key={forum.id}
                      className="col-12 col-lg-4 mb-3 shadow-sm mx-auto"
                    >
                      <Card.Title className="fw-semibold text-primary">
                        {forum.name}
                      </Card.Title>
                      <Card.Description>{forum.description}</Card.Description>
                      <div className="d-flex gap-2 w-100">
                        {forum.isMember ? (
                          <>
                            <div className="w-100 d-flex gap-2 mx-auto">
                              <Button
                                className="btn btn-outline-primary w-100"
                                onClick={() => handleLeaveForum(forum.uuid)}
                              >
                                <IconPlaceholder
                                  className="me-1"
                                  variant={"box-arrow-left"}
                                />
                                Leave
                              </Button>
                            </div>
                            <div className="w-100 mx-auto">
                              <Link
                                to={`/forum/${forum.uuid}`}
                                className="btn btn-primary w-100"
                                onClick={(e) => {
                                  if (!token) {
                                    e.preventDefault();
                                    setShowToast(true);
                                    setTimeout(() => setShowToast(false), 3000);
                                    return;
                                  }
                                }}
                              >
                                <IconPlaceholder
                                  className="me-1"
                                  variant={"eye"}
                                />
                                View Forum
                              </Link>
                            </div>
                          </>
                        ) : (
                          <div className="d-flex gap-2 mx-auto w-100">
                            <Button
                              className="btn btn-primary w-100"
                              onClick={() => handleJoinForum(forum.uuid)}
                            >
                              <IconPlaceholder variant={"box-arrow-right"} />{" "}
                              Join
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
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
          description={`You need to login to join a forum!`}
        />
      )}
      {showJoinSuccessToast && (
        <Toasts
          onClose={() => setShowJoinSuccessToast(false)}
          variant={"success"}
          variantBody={"success-subtle"}
          title={"Success"}
          titleColor={"white"}
          description={`You have successfully joined the forum!`}
        />
      )}
      {showLeaveSuccessToast && (
        <Toasts
          onClose={() => setShowLeaveSuccessToast(false)}
          variant={"success"}
          variantBody={"success-subtle"}
          title={"Success"}
          titleColor={"white"}
          description={`You have successfully left the forum!`}
        />
      )}
      {showErrorToast && (
        <Toasts
          onClose={() => setShowErrorToast(false)}
          variant={"danger"}
          variantBody={"danger-subtle"}
          title={"Error"}
          titleColor={"white"}
          description={`Failed to perform the action. Please try again.`}
        />
      )}
    </>
  );
}
