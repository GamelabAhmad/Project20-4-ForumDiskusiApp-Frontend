import { useState } from "react";
import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import { createQuestion } from "../../../api/questionApi";

export default function QuestionForm() {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const questionData = {
        title: formValues.title,
        body: formValues.body,
        image: formValues.image,
        topic: formValues.topic,
      };

      const formData = await createQuestion(questionData);
      console.log(formData);
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
          value={formValues.title}
          onChange={handleChange}
        />
        <InputForm
          htmlFor={"body"}
          id={"body"}
          name={"body"}
          label={"Description"}
          type={"body"}
          placeholder={"Your description"}
          value={formValues.body}
          onChange={handleChange}
        />
        <InputForm
          htmlFor={"image"}
          id={"image"}
          name={"image"}
          label={"image"}
          type={"file"}
          placeholder={"Image"}
          value={formValues.image}
          onChange={handleChange}
        />
        <InputForm
          htmlFor={"topic"}
          id={"topic"}
          name={"topic"}
          label={"Topics"}
          type={"topic"}
          placeholder={"Topics"}
          className={"mb-3"}
          value={formValues.topic}
          onChange={handleChange}
        />
        <Button
          variant={"primary"}
          type={"submit"}
          children={"Submit"}
          className="mt-1 w-100 rounded-3"
        />
      </form>
    </>
  );
}
