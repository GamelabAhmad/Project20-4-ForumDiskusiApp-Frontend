import { useEffect, useState } from "react";
import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import { createQuestionsByForum } from "../../../api/questionApi";
import Toasts from "../../molecules/Toasts/index.jsx";
import { getTopics } from "../../../api/topicApi.js";
import { useNavigate } from "react-router-dom";

export default function DiscussionForm() {
  const selectedForum = localStorage.getItem("selectedForum");
  const [topics, setTopics] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailureToast, setShowFailureToast] = useState(false);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    title: "",
    body: "",
    image: "",
    topic: "",
    forum: selectedForum,
  });

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });

    if (event.target.name === "forum") {
      setFormValues({
        ...formValues,
        forum: selectedForum,
      });
    }
  };

  const handleTopicChange = (topic) => {
    setFormValues({
      ...formValues,
      topic: topic.name,
    });
  };

  useEffect(() => {
    const fetchTopics = async () => {
      const topicsData = await getTopics();
      setTopics(topicsData);
    };

    fetchTopics();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("image");
    const image = fileInput.files[0];
    const id = localStorage.getItem("selectedForumId");

    try {
      const discussionData = {
        title: formValues.title,
        body: formValues.body,
        image: image,
        forum: selectedForum,
        topic: formValues.topic,
      };

      const formData = await createQuestionsByForum(id, discussionData);
      console.log("Discussion created:", formData);
      localStorage.removeItem("selectedForum");
      localStorage.removeItem("selectedForumId");
      setShowSuccessToast(true);
      setTimeout(() => {
        setTimeout(() => {
          setShowSuccessToast(false);
        }, 1500);
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setShowFailureToast(true);
    }
  };

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      forum: selectedForum,
    }));

    console.log("Selected forum:", selectedForum);
  }, [selectedForum]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputForm
          htmlFor={"forum"}
          id={"forum"}
          name={"forum"}
          label={"Selected Forum"}
          type={"text"}
          placeholder={"Selected forum will appear here"}
          className={"text-body w-100 mb-3"}
          value={selectedForum}
          readOnly={true}
        />
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
          label={"Discussion Title"}
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
          description={"Discussion has been successfully posted."}
        />
      )}
      {showFailureToast && (
        <Toasts
          onClose={() => setShowFailureToast(false)}
          variant={"danger"}
          variantBody={"danger-subtle"}
          title={"Failure"}
          titleColor={"white"}
          description={
            "An error occurred while posting the discussion. Please try again."
          }
        />
      )}
    </>
  );
}
