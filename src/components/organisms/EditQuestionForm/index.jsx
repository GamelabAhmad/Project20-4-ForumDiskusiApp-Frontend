import { useState, useEffect } from "react";
import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import { getQuestionById, updateQuestion } from "../../../api/questionApi";
import { useParams } from "react-router-dom";
import { getTopics } from "../../../api/topicApi.js";

export default function EditQuestionForm() {
  const { id } = useParams();
  const [topics, setTopics] = useState([]);
  const [questionImage, setQuestionImage] = useState(null);
  const [keepCurrentImage, setKeepCurrentImage] = useState(false);
  const handleCheckboxChange = (event) => {
    setKeepCurrentImage(event.target.checked);
  };

  const [formValues, setFormValues] = useState({
    title: "",
    body: "",
    image: "",
    topic: "",
  });

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

  useEffect(() => {
    async function fetchQuestionAndTopics() {
      try {
        const questionData = await getQuestionById(id);
        const topicsData = await getTopics();
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          title: questionData.title,
          body: questionData.body,
          image: questionData.image || prevFormValues.image,
          topic: questionData.topic?.name,
        }));
        setTopics(topicsData);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    }

    fetchQuestionAndTopics();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("image");
    const image = !keepCurrentImage ? fileInput.files[0] : undefined;

    try {
      const questionData = {
        title: formValues.title,
        body: formValues.body,
        topic: formValues.topic,
      };

      if (image) {
        questionData.image = image;
      }

      const formData = await updateQuestion(id, questionData);
      console.log("Question updated:", formData);
      window.location.href = `/dashboard`;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchImages() {
      try {
        const questionImage = await getQuestionById(id);
        setQuestionImage(questionImage);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, [id]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Current Image:</label>
        <div className="d-lg-flex">
          <div className="mb-3 w-100 w-lg-25">
            {questionImage && (
              <img
                src={questionImage.imageUrl}
                alt="Question"
                className="img-fluid py-3"
                height={200}
                width={200}
              />
            )}
            <div>
              <label className="d-flex gap-2 align-items-center m-0">
                <input
                  type="checkbox"
                  checked={keepCurrentImage}
                  onChange={handleCheckboxChange}
                />
                Keep current image
              </label>
            </div>
          </div>
          <div className="w-100">
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
              onChange={handleChange}
            />
            <Button
              variant={"primary"}
              type={"submit"}
              children={"Submit"}
              className="mt-1 w-100 rounded-3 mb-4"
            />
          </div>
        </div>
      </form>
    </>
  );
}
