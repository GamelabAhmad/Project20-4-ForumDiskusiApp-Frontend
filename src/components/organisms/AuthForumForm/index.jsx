import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import Toasts from "../../molecules/Toasts/index.jsx";
import { useState } from "react";
import { createForum } from "../../../api/forumApi";

export default function AuthForumForm() {
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
        description: "Topic created successfully",
        variant: "success",
      });
      setShowToast(true);
    } catch (error) {
      console.error("Error:", error);
      setToastContent({
        title: "Error",
        description: "Failed to create topic",
        variant: "danger",
      });
      setShowToast(true);
    }
  };

  return (
    <>
      {showToast && (
        <Toasts
          title={toastContent.title}
          description={toastContent.description}
          variant={toastContent.variant}
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
          className={"mb-3"}
        />
        <Button type={"submit"} variant={"primary"}>
          Create Forum
        </Button>
      </form>
    </>
  );
}
