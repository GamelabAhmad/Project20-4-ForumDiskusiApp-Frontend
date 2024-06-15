import { useEffect, useState } from "react";
import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import { createQuestion } from "../../../api/questionApi";
import { getTopics } from "../../../api/topicApi.js";
import Toasts from "../../molecules/Toasts/index.jsx";

export default function QuestionForm() {
  const [topics, setTopics] = useState([]);

  const [formValues, setFormValues] = useState({
    title: "",
    body: "",
    image: "",
    topic: "",
  });

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailureToast, setShowFailureToast] = useState(false);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleTopicChange = (topic) => {
    setFormValues({
      ...formValues,
      topic: topic.name,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("image");
    const image = fileInput.files[0];

    try {
      const questionData = {
        title: formValues.title,
        body: formValues.body,
        image: image,
        topic: formValues.topic,
      };

      const formData = await createQuestion(questionData);
      console.log("Question created:", formData);
      setShowSuccessToast(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setShowFailureToast(true);
    }
  };

  useEffect(() => {
    const fetchTopics = async () => {
      const topicsData = await getTopics();
      setTopics(topicsData);
    };

    fetchTopics();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputForm
          htmlFor={"topicDropdown"}
          id={"topicDropdown"}
          name={"topicDropdown"}
          label={"Topics"}
          type={"text"}
          placeholder={"Select a topic"}
          className={"text-body w-100 mb-2"}
          options={topics}
          onOptionChange={handleTopicChange}
        />
        <InputForm
          htmlFor={"topic"}
          id={"topic"}
          name={"topic"}
          label={"Selected Topic"}
          type={"text"}
          placeholder={"Selected topic will appear here"}
          className={"text-body w-100 mb-3"}
          value={formValues.topic}
          readOnly={true}
        />
        <InputForm
          htmlFor={"title"}
          id={"title"}
          name={"title"}
          label={"Question Title"}
          type={"text"}
          placeholder={"Your question title"}
          className={"text-body"}
          value={formValues.title}
          onChange={handleChange}
        />
        <InputForm
          htmlFor={"body"}
          id={"body"}
          name={"body"}
          label={"Description"}
          type={"text"}
          placeholder={"Your description"}
          className={"text-body"}
          value={formValues.body}
          onChange={handleChange}
        />
        <InputForm
          htmlFor={"image"}
          id={"image"}
          name={"image"}
          label={"Image"}
          type={"file"}
          placeholder={"Upload your image"}
          className={"text-body"}
          value={formValues.image}
          onChange={handleChange}
        />
        <Button
          variant={"primary"}
          type={"submit"}
          children={"Submit"}
          className="mt-1 w-100 rounded-3 mb-4"
        />
      </form>
      {showSuccessToast && (
        <Toasts
          onClose={() => setShowSuccessToast(false)}
          variant={"success"}
          variantBody={"success-subtle"}
          title={"Success"}
          titleColor={"white"}
          description={"Question has been successfully posted."}
        />
      )}
      {showFailureToast && (
        <Toasts
          onClose={() => setShowFailureToast(false)}
          variant={"danger"}
          variantBody={"danger-subtle"}
          title={"Failure"}
          titleColor={"white"}
          description={"You must be logged in to post a question."}
        />
      )}
    </>
  );
}
