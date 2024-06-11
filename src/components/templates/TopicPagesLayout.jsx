import Sidebar from "../molecules/Sidebar/index.jsx";
import Card from "../molecules/Card/index.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import PagesLayout from "./PagesLayout.jsx";
import CardHeader from "../organisms/CardHeader/index.jsx";
import Button from "../atoms/Button/index.jsx";
import { getTopics } from "../../api/topicApi.js";
import { useState, useEffect } from "react";

export default function TopicPagesLayout() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const topics = await getTopics();
        setTopics(topics);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching topics:", error);
        setLoading(false);
      }
    }

    fetchTopics();
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
                title={"Topics"}
                description={
                  "This is the list of topics that have been created by the community. Feel free to join any of them! If you have a topic, please talk to the admin to create one! We are here to help!"
                }
                buttonTitle={"Create a Discussion"}
                toastsMessage={"ask a question with related topic"}
              />
            </div>
            <div className="col-12 col-lg-10 ms-auto mb-4">
              <Card className={`border-0`}>
                <div className="row">
                  {topics.map((topic) => (
                    <Card
                      key={topic.id}
                      className="col-12 col-lg-4 mb-3 shadow-sm mx-auto"
                    >
                      <Card.Title className="fw-semibold text-primary">
                        {topic.name}
                      </Card.Title>
                      <Button variant="primary">View</Button>
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
