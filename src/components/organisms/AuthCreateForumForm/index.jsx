import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import Toasts from "../../molecules/Toasts/index.jsx";
import { useState } from "react";
import { createForum } from "../../../api/forumApi";
import { useNavigate } from "react-router-dom";

export default function AuthCreateForumForm() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState({});

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createForum(formValues);
      setToastContent({
        title: "Success",
        titleColor: "white",
        description: "Forum created successfully",
        variant: "success",
        variantBody: "success-subtle",
      });
      setTimeout(() => {
        setShowToast(true);
      }, 1500);
      setTimeout(() => {
        navigate("/dashboard/admin");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setToastContent({
        title: "Error",
        titleColor: "white",
        description: "Failed to create forum. Please try again.",
        variant: "danger",
        variantBody: "danger-subtle",
      });
      setTimeout(() => {
        setShowToast(true);
      }, 1500);
    }
  };

  return (
    <>
      {showToast && (
        <Toasts
          title={toastContent.title}
          description={toastContent.description}
          variant={toastContent.variant}
          titleColor={toastContent.titleColor}
          variantBody={toastContent.variantBody}
          onClose={() => setShowToast(false)}
        />
      )}
      <form onSubmit={handleSubmit}>
        <InputForm
          htmlFor={"name"}
          id={"name"}
          name={"name"}
          label={"Topic Name"}
          type={"text"}
          placeholder={"Your forum name"}
          className={"text-body"}
          value={formValues.name}
          onChange={handleChange}
        />
        <InputForm
          htmlFor={"description"}
          id={"description"}
          name={"description"}
          label={"Description"}
          type={"text"}
          placeholder={"Your description text"}
          value={formValues.description}
          onChange={handleChange}
          className={"mb-3 text-body"}
        />
        <Button
          type={"submit"}
          variant={"primary"}
          className="rounded-3 w-100 mb-3"
        >
          Create Forum
        </Button>
      </form>
    </>
  );
}
