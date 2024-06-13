import { useState, useEffect } from "react";
import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import { getQuestionById, updateQuestion } from "../../../api/questionApi";
import { useParams } from "react-router-dom";

export default function EditQuestionForm() {
  const { id } = useParams();

  const [formValues, setFormValues] = useState({
    title: "",
    body: "",
    image: "",
    topic: "",
  });

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const questionData = await getQuestionById(id);
        setFormValues({
          title: questionData.title,
          body: questionData.body,
          image: questionData.image,
          topic: questionData.topic.name,
        });
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    }

    fetchQuestion();
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
      const questionData = {
        title: formValues.title,
        body: formValues.body,
        image: formValues.image,
        topic: formValues.topic,
      };

      const formData = await updateQuestion(id, questionData);
      console.log("Question updated:", formData);
      window.location.href = `/dashboard`;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <InputForm
          htmlFor={"topic"}
          id={"topic"}
          name={"topic"}
          label={"Topics"}
          type={"select"}
          placeholder={"Topics"}
          className={"mb-3 text-body"}
          value={formValues.topic}
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
