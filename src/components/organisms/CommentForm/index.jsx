import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import { useState } from "react";
import { createCommentById } from "../../../api/commentApi.js";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Toasts from "../../molecules/Toasts/index.jsx";

export default function CommentForm({ onNewComment }) {
  const token = Cookies.get("jwt");
  const user = Cookies.get("user");

  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    body: "",
  });

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailureToast, setShowFailureToast] = useState(false);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token || !user) {
      setShowFailureToast(true);
      setTimeout(() => setShowFailureToast(false), 3000);
      return;
    }

    try {
      const data = {
        body: formValues.body,
      };

      let newComment = await createCommentById(id, data);
      console.log(newComment);

      newComment = {
        ...newComment,
        commentedAt: new Date().toISOString(),
        commentedBy: { username: user },
        body: formValues.body,
      };

      onNewComment(newComment);
      setFormValues({ body: "" });

      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mb-3 d-flex align-items-center m-0"
      >
        <InputForm
          htmlFor={"body"}
          id={"body"}
          name={"body"}
          type={"text"}
          placeholder={`Your comment as ${user}`}
          value={formValues.body}
          onChange={handleChange}
          className="align-items-center d-flex m-0 py-2 text-body"
        />
        <Button
          variant={"primary"}
          type="submit"
          className="rounded-3 d-flex align-items-center m-0"
        >
          Comment
        </Button>
      </form>
      {showSuccessToast && (
        <Toasts
          onClose={() => setShowSuccessToast(false)}
          variant={"success"}
          variantBody={"success-subtle"}
          title={"Success"}
          titleColor={"white"}
          description={"Comment has been successfully posted."}
        />
      )}
      {showFailureToast && (
        <Toasts
          onClose={() => setShowFailureToast(false)}
          variant={"danger"}
          variantBody={"danger-subtle"}
          title={"Failure"}
          titleColor={"white"}
          description={"You must be logged in to post a comment."}
        />
      )}
    </>
  );
}
