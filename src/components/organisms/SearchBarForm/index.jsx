import InputForm from "../../molecules/InputForm/index.jsx";
import { useState } from "react";
import { getQuestions } from "../../../api/questionApi.js";

export default function SearchBarForm({ setResults }) {
  const [input, setInput] = useState("");

  const fetchData = async (value) => {
    const questions = await getQuestions();
    const results = questions.filter(
      (question) =>
        question.title.toLowerCase().includes(value.toLowerCase()) ||
        question.body.toLowerCase().includes(value.toLowerCase()),
    );
    setResults(results, value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim() !== "") {
      fetchData(value);
    } else {
      setResults([], value);
    }
  };

  return (
    <InputForm
      htmlFor={"search"}
      id={"search"}
      name={"search"}
      type={"search"}
      placeholder={"Search..."}
      className={"form-control shadow-sm"}
      value={input}
      onChange={handleChange}
    />
  );
}
