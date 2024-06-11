import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import Toasts from "../../molecules/Toasts/index.jsx";
import { useState } from "react";
import { createTopic } from "../../../api/topicApi";

export default function AuthTopicForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    body: "",
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
          value={formValues.name}
          onChange={handleChange}
        />
        <InputForm
          htmlFor={"body"}
          id={"body"}
          name={"body"}
          label={"Body"}
          type={"text"}
          placeholder={"Your body text"}
          value={formValues.body}
          onChange={handleChange}
          className={"mb-3"}
        />
        <Button type={"submit"} variant={"primary"}>
          Create Topic
        </Button>
      </form>
    </>
  );
}
