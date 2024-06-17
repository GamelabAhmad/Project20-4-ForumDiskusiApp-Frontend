import { useState, useEffect } from "react";
import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import Toasts from "../../molecules/Toasts/index.jsx";
import { getForumById, updateForum } from "../../../api/forumApi";
import { useNavigate, useParams } from "react-router-dom";

export default function AuthEditForumForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    async function fetchForum() {
      try {
        const forumData = await getForumById(id);
        setFormValues({
          name: forumData.name,
          description: forumData.description,
        });
      } catch (error) {
        console.error("Error fetching forum:", error);
      }
    }

    fetchForum();
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
      const forumData = {
        name: formValues.name,
        description: formValues.description,
      };

      const formData = await updateForum(id, forumData);
      console.log("Forum updated:", formData);
      setToastContent({
        title: "Success",
        titleColor: "white",
        description: "Forum updated successfully",
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
        description: "Failed to update forum. Please try again.",
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
          label={"Forum Name"}
          type={"text"}
          placeholder={"Your forum name"}
          className={"text-body"}
          value={formValues.name}
          onChange={handleChange}
        />
        <InputForm
          htmlFor={"description"}
          id={"description"}
          name={"description"}
          label={"Description"}
          type={"text"}
          placeholder={"Your description text"}
          className={"text-body"}
          value={formValues.description}
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
