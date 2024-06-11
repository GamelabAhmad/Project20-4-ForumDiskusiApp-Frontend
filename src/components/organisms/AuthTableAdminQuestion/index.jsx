import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { deleteQuestion, getQuestions } from "../../../api/questionApi.js";
import ContainerLayout from "../../templates/ContainerLayout.jsx";
import TypographyText from "../../atoms/TypographyText/index.jsx";
import IconPlaceholder from "../../atoms/IconPlaceholder/index.jsx";
import SubheadingText from "../../atoms/SubheadingText/index.jsx";
import { Link } from "react-router-dom";
import Button from "../../atoms/Button/index.jsx";
import Modal from "../../molecules/Modal/index.jsx";
import Toasts from "../../molecules/Toasts/index.jsx";

export default function AuthTableAdminQuestion() {
  const user = Cookies.get("user");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const handleViewClick = (question) => {
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (uuid) => {
    if (uuid) {
      try {
        await deleteQuestion(uuid);
        setQuestions(questions.filter((question) => question.uuid !== uuid));
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
    const fetchQuestions = async () => {
      const userQuestions = await getQuestions();
      const urls = userQuestions.map((question) => question.imageUrl);
      setImageUrls(urls);
      setQuestions(userQuestions);
    };

    fetchQuestions();
  }, [user]);

  return (
    <>
      <ContainerLayout>
        <div className="py-3">
          <TypographyText
            cssReset={true}
            className="text-center alert alert-primary"
            role="alert"
          >
            <IconPlaceholder variant={"info-circle"} className="me-2" />
            Welcome to your dashboard{" "}
            <span className="text-primary">{user}</span>! Here you can view your
            recent activities.
          </TypographyText>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SubheadingText cssReset={true} className="fw-semibold ">
            Question Management
          </SubheadingText>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Questions</th>
                <th scope="col">Topic</th>
                <th scope="col">Image</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={question.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{question.title}</td>
                  <td>{question.topicsID}</td>
                  <td>
                    <Button
                      variant={"info"}
                      className="btn-sm d-flex gap-2 rounded-3"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => handleViewClick(question)}
                    >
                      <IconPlaceholder variant={"eye"} />
                      View Images
                    </Button>
                    {isModalOpen && (
                      <div className="modal-backdrop fade show"></div>
                    )}
                    <Modal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      title={
                        currentQuestion
                          ? `Images for question ${currentQuestion.title}`
                          : "Images"
                      }
                    >
                      {currentQuestion && (
                        <>
                          <img
                            src={currentQuestion.imageUrl}
                            alt="Question"
                            className="object-fit-contain w-100"
                          />
                        </>
                      )}
                    </Modal>
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Link
                        to={`/question/${question.uuid}`}
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
                      <Button
                        variant={"warning"}
                        className="btn-sm d-flex gap-2 rounded-3"
                      >
                        <IconPlaceholder variant={"pencil"} />
                        Edit
                      </Button>
                      <Button
                        variant={"danger"}
                        className="btn-sm d-flex gap-2 rounded-3"
                        onClick={() => handleDeleteClick(question.uuid)}
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
            description={"Question has been successfully deleted."}
          />
        )}
      </ContainerLayout>
    </>
  );
}
