import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import Toasts from "../../molecules/Toasts/index.jsx";
import { useState } from "react";
import { createTopic } from "../../../api/topicApi";
import { useNavigate } from "react-router-dom";

export default function AuthCreateTopicForm() {
  const navigate = useNavigate();
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
        titleColor: "white",
        description: "Topic created successfully",
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
        description: "Failed to create topic. Please try again.",
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
          titleColor={toastContent.titleColor}
          description={toastContent.description}
          variant={toastContent.variant}
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
