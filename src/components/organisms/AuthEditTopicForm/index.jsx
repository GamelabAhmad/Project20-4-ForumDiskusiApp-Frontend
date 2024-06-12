import { useState, useEffect } from "react";
import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import Toasts from "../../molecules/Toasts/index.jsx";
import { getTopicById, updateTopic } from "../../../api/topicApi";
import { useParams } from "react-router-dom";

export default function AuthEditTopicForm() {
  const { id } = useParams();

  const [formValues, setFormValues] = useState({
    name: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState({});

  useEffect(() => {
    async function fetchTopic() {
      try {
        const topicData = await getTopicById(id);
        setFormValues({
          name: topicData.name,
        });
      } catch (error) {
        console.error("Error fetching topic:", error);
      }
    }

    fetchTopic();
  }, [id]);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const topicData = {
        name: formValues.name,
      };

      const formData = await updateTopic(id, topicData);
      console.log("Topic updated:", formData);
      setToastContent({
        title: "Success",
        description: "Topic updated successfully",
        variant: "success",
      });
      setShowToast(true);
      window.location.href = `/dashboard/admin`;
    } catch (error) {
      console.error("Error:", error);
      setToastContent({
        title: "Error",
        description: "Failed to update topic",
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
          variant={"primary"}
          type={"submit"}
          children={"Submit"}
          className="mt-1 w-100 rounded-3 mb-4"
        />
      </form>
    </>
  );
}
