import { getTopicById } from "../../api/topicApi.js";
import HeadingText from "../atoms/HeadingText/index.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";

export default function SinglePostTopicPagesLayout() {
  const [topic, setTopic] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchTopic() {
      try {
        const topic = await getTopicById(id);
        setTopic(topic);
      } catch (error) {
        console.error("Error fetching topic:", error);
      }
    }
    fetchTopic();
  }, [id]);

  return (
    <>
      <PagesLayout>
        <ContainerLayout>
          {topic ? (
            <>
              <HeadingText>{topic.name}</HeadingText>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </ContainerLayout>
      </PagesLayout>
    </>
  );
}
