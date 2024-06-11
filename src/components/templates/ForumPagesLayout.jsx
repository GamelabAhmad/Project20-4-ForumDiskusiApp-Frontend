import Sidebar from "../molecules/Sidebar/index.jsx";
import Card from "../molecules/Card/index.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import PagesLayout from "./PagesLayout.jsx";
import CardHeader from "../organisms/CardHeader/index.jsx";
import Button from "../atoms/Button/index.jsx";
import { getForums } from "../../api/forumApi.js";
import { useState, useEffect } from "react";

export default function ForumPagesLayout() {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForum() {
      try {
        const forums = await getForums();
        setForums(forums);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching forum:", error);
        setLoading(false);
      }
    }

    fetchForum();
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
            <div className="col-12 col-lg-10">
              <CardHeader
                title={"Forums"}
                description={
                  "This is the list of forums that have been created by the community. Feel free to join any of them! If you have a forum, please talk to the admin to create one! We are here to help!"
                }
                buttonTitle={"Create a Discussion"}
                toastsMessage={"create a discussion"}
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
                      <Button variant="primary">Join</Button>
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
