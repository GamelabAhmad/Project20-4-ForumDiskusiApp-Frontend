import { useState, useEffect } from "react";
import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import Toasts from "../../molecules/Toasts/index.jsx";
import { getTopicById, updateTopic } from "../../../api/topicApi";
import { useNavigate, useParams } from "react-router-dom";

export default function AuthEditTopicForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
  });

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
        titleColor: "white",
        description: "Topic updated successfully",
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
        description: "Failed to update topic. Please try again.",
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
          variant={"primary"}
          type={"submit"}
          children={"Submit"}
          className="mt-1 w-100 rounded-3 mb-4"
        />
      </form>
    </>
  );
}
