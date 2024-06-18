import { useState, useEffect } from "react";
import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import { updateCommentById } from "../../../api/commentApi.js";
import Cookies from "js-cookie";
import Toasts from "../../molecules/Toasts/index.jsx";

export default function EditCommentForm({ onUpdateComment, editingComment }) {
  const token = Cookies.get("jwt");
  const user = Cookies.get("user");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailureToast, setShowFailureToast] = useState(false);

  const [formValues, setFormValues] = useState({
    body: "",
  });

  useEffect(() => {
    if (editingComment) {
      setFormValues({ body: editingComment.body });
    }
  }, [editingComment]);

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

      const updatedComment = await updateCommentById(editingComment.uuid, data);
      onUpdateComment(updatedComment);
      setFormValues({ body: "" });
      window.location.reload();
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } catch (error) {
      console.error("Error:", error);
      setShowFailureToast(true);
      setTimeout(() => setShowFailureToast(false), 3000);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="d-sm-flex mb-3 align-items-center"
      >
        <InputForm
          htmlFor={"body"}
          id={"body"}
          name={"body"}
          type={"text"}
          placeholder={`Your comment as ${user}`}
          value={formValues.body}
          onChange={handleChange}
          className="align-items-center d-flex m-0 py-2 text-body shadow-sm flex-grow-1 me-2 mt-2"
        />
        <Button
          variant={"primary"}
          type="submit"
          className="rounded-3 d-flex align-items-center m-0 flex-shrink-0 w-100 w-sm-auto justify-content-center justify-content-sm-start"
        >
          Update
        </Button>
      </form>
      {showSuccessToast && (
        <Toasts
          onClose={() => setShowSuccessToast(false)}
          variant={"success"}
          variantBody={"success-subtle"}
          title={"Success"}
          titleColor={"white"}
          description={"Comment has been successfully updated."}
        />
      )}
      {showFailureToast && (
        <Toasts
          onClose={() => setShowFailureToast(false)}
          variant={"danger"}
          variantBody={"danger-subtle"}
          title={"Failure"}
          titleColor={"white"}
          description={"You must be logged in to update a comment."}
        />
      )}
    </>
  );
}
