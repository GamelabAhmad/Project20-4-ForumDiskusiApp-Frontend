import { useEffect, useState } from "react";
import { deleteForum, getForums } from "../../../api/forumApi.js";
import ContainerLayout from "../../templates/ContainerLayout.jsx";
import IconPlaceholder from "../../atoms/IconPlaceholder/index.jsx";
import SubheadingText from "../../atoms/SubheadingText/index.jsx";
import { Link } from "react-router-dom";
import Button from "../../atoms/Button/index.jsx";
import Toasts from "../../molecules/Toasts/index.jsx";

export default function AuthTableAdminForum() {
  const [forums, setForums] = useState([]);
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  const handleDeleteClick = async (uuid) => {
    if (uuid) {
      try {
        await deleteForum(uuid);
        setForums(forums.filter((forum) => forum.uuid !== uuid));
        setShowDeleteToast(true);
        setTimeout(() => setShowDeleteToast(false), 3000);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Error: id is undefined");
    }
  };

  useEffect(() => {
    const fetchForums = async () => {
      const fetchedForums = await getForums();
      setForums(fetchedForums);
    };

    fetchForums();
  }, []);

  return (
    <>
      <ContainerLayout>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SubheadingText cssReset={true} className="fw-semibold ">
            Forum Management
          </SubheadingText>
          <Link
            to={"/dashboard/admin/create-forum"}
            className="text-decoration-none"
          >
            <Button
              variant={"primary"}
              className="btn-sm d-flex gap-2 rounded-3"
            >
              <IconPlaceholder variant={"plus"} />
              Add Forum
            </Button>
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Forum</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {forums.map((forum, index) => (
                <tr key={forum.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{forum.name}</td>
                  <td>{forum.description}</td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Link
                        to={`/forum/${forum.uuid}`}
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
                        to={`/dashboard/admin/edit-forum/${forum.uuid}`}
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
                        onClick={() => handleDeleteClick(forum.uuid)}
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
