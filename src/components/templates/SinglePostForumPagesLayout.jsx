import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import { getForumById } from "../../api/forumApi.js";
import HeadingText from "../atoms/HeadingText/index.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TypographyText from "../atoms/TypographyText/index.jsx";

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
          {forum ? (
            <>
              <HeadingText>{forum.name}</HeadingText>
              <TypographyText>{forum.description}</TypographyText>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </ContainerLayout>
      </PagesLayout>
    </>
  );
}
