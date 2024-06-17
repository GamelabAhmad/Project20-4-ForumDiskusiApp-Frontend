import Sidebar from "../molecules/Sidebar/index.jsx";
import Card from "../molecules/Card/index.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import PagesLayout from "./PagesLayout.jsx";
import CardHeader from "../organisms/CardHeader/index.jsx";
import Button from "../atoms/Button/index.jsx";
import { getForums } from "../../api/forumApi.js";
import { useState, useEffect } from "react";
import { joinForum, leaveForum } from "../../api/memberApi.js";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Toasts from "../molecules/Toasts/index.jsx";

export default function ForumPagesLayout() {
  const [forums, setForums] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const token = Cookies.get("jwt");

  useEffect(() => {
    async function fetchForum() {
      try {
        const forums = await getForums();
        setForums(forums);
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
      console.log("Joined forum!");
    } catch (error) {
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
      console.log("Left forum!");
    } catch (error) {
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
                      <Button
                        className="btn btn-primary"
                        onClick={() => handleLeaveForum(forum.uuid)}
                      >
                        Leave
                      </Button>
                      <Link
                        to={`/forum/${forum.uuid}`}
                        className="btn btn-primary"
                        onClick={(e) => {
                          if (!token) {
                            e.preventDefault();
                            setShowToast(true);
                            setTimeout(() => setShowToast(false), 3000);
                            return;
                          }
                        }}
                      >
                        View Forum
                      </Link>
                      <Button
                        className="btn btn-primary"
                        onClick={() => handleJoinForum(forum.uuid)}
                      >
                        Join
                      </Button>
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
    </>
  );
}
