import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import Toasts from "../../molecules/Toasts/index.jsx";
import { useState } from "react";
import { createTopic } from "../../../api/topicApi";

export default function AuthCreateTopicForm() {
  const [formValues, setFormValues] = useState({
    name: "",
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
      await createTopic(formValues);
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
          placeholder={"Your topic name"}
          className={"text-body"}
          value={formValues.name}
          onChange={handleChange}
        />
        <Button
          type={"submit"}
          variant={"primary"}
          className="rounded-3 mb-3 w-100"
        >
          Create Topic
        </Button>
      </form>
    </>
  );
}
