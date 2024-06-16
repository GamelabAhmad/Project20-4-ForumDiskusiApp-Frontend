import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import { getForumById } from "../../api/forumApi.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../molecules/Card/index.jsx";
import Sidebar from "../molecules/Sidebar/index.jsx";
import CardHeader from "../organisms/CardHeader/index.jsx";

export default function SinglePostForumPagesLayout() {
  const [forum, setForum] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchForum() {
      try {
        const forum = await getForumById(id);
        setForum(forum);
      } catch (error) {
        console.error("Error fetching forum:", error);
      }
    }
    fetchForum();
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
            <div className="col-12 col-lg-10">
              {forum ? (
                <CardHeader
                  title={forum.name}
                  description={forum.description}
                  buttonTitle={"Create a Discussion"}
                  toastsMessage={"create a discussion"}
                />
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
