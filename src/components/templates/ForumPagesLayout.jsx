import Sidebar from "../molecules/Sidebar/index.jsx";
import Card from "../molecules/Card/index.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import PagesLayout from "./PagesLayout.jsx";
import CardHeader from "../organisms/CardHeader/index.jsx";
import Button from "../atoms/Button/index.jsx";
import { getForums } from "../../api/forumApi.js";
import { useState, useEffect } from "react";
import { joinForum, leaveForum } from "../../api/memberApi.js";

export default function ForumPagesLayout() {
  const [forums, setForums] = useState([]);

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
    try {
      await joinForum(uuid);
      console.log("Joined forum!");
    } catch (error) {
      console.error("Error joining forum:", error);
    }
  };

  const handleLeaveForum = async (uuid) => {
    try {
      await leaveForum(uuid);
      console.log("Left forum!");
    } catch (error) {
      console.error("Error leaving forum:", error);
    }
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
                      <Button
                        className="btn btn-primary"
                        onClick={() =>
                          (window.location.href = `/forum/${forum.uuid}`)
                        }
                      >
                        View Forum
                      </Button>
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
    </>
  );
}
