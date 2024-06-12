import { useEffect, useState } from "react";
import { deleteTopic, getTopics } from "../../../api/topicApi.js";
import ContainerLayout from "../../templates/ContainerLayout.jsx";
import IconPlaceholder from "../../atoms/IconPlaceholder/index.jsx";
import SubheadingText from "../../atoms/SubheadingText/index.jsx";
import { Link } from "react-router-dom";
import Button from "../../atoms/Button/index.jsx";
import Toasts from "../../molecules/Toasts/index.jsx";

export default function AuthTableAdminTopic() {
  const [topics, setTopics] = useState([]);
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  const handleDeleteClick = async (uuid) => {
    if (uuid) {
      try {
        await deleteTopic(uuid);
        setTopics(topics.filter((topic) => topic.uuid !== uuid));
        setShowDeleteToast(true);
        setTimeout(() => setShowDeleteToast(false), 3000);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Error: uuid is undefined");
    }
  };

  useEffect(() => {
    const fetchTopics = async () => {
      const fetchedTopics = await getTopics();
      setTopics(fetchedTopics);
    };

    fetchTopics();
  }, []);

  return (
    <>
      <ContainerLayout>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SubheadingText cssReset={true} className="fw-semibold ">
            Topic Management
          </SubheadingText>
          <Link
            to={"/dashboard/admin/create-topic"}
            className="text-decoration-none"
          >
            <Button
              variant={"primary"}
              className="btn-sm d-flex gap-2 rounded-3"
            >
              <IconPlaceholder variant={"plus"} />
              Add Topic
            </Button>
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Topic</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic, index) => (
                <tr key={topic.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{topic.name}</td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Link
                        to={`/topic/${topic.uuid}`}
                        className="text-decoration-none"
                      >
                        <Button
                          variant={"success"}
                          className="btn-sm d-flex gap-2 rounded-3"
                        >
                          <IconPlaceholder variant={"eye"} />
                          View
                        </Button>
                      </Link>
                      <Link
                        to={`/dashboard/admin/edit-topic/${topic.uuid}`}
                        className="text-decoration-none"
                      >
                        <Button
                          variant={"warning"}
                          className="btn-sm d-flex gap-2 rounded-3"
                        >
                          <IconPlaceholder variant={"pencil"} />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant={"danger"}
                        className="btn-sm d-flex gap-2 rounded-3"
                        onClick={() => handleDeleteClick(topic.uuid)}
                      >
                        <IconPlaceholder variant={"trash"} />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showDeleteToast && (
          <Toasts
            onClose={() => setShowDeleteToast(false)}
            variant={"success"}
            variantBody={"success-subtle"}
            title={"Success"}
            titleColor={"white"}
            description={"Forum has been successfully deleted."}
          />
        )}
      </ContainerLayout>
    </>
  );
}
