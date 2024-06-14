import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import Toasts from "../../molecules/Toasts/index.jsx";
import { useState } from "react";
import { updateUser } from "../../../api/userApi.js";

export default function UserUpdateProfileForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    bio: "",
    image: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState({});

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser(formValues);
      setToastContent({
        title: "Success",
        description: "Profile updated successfully",
        variant: "success",
      });
      setShowToast(true);
      window.location.href = `/profile/${formValues.name}`;
    } catch (error) {
      console.error("Error:", error);
      setToastContent({
        title: "Error",
        description: "Failed to update profile",
        variant: "danger",
      });
      setShowToast(true);
    }
  };

  return (
    <>
      {showToast && (
        <Toasts
          title={toastContent.title}
          description={toastContent.description}
          variant={toastContent.variant}
          onClose={() => setShowToast(false)}
        />
      )}
      <form onSubmit={handleSubmit}>
        <InputForm
          htmlFor={"name"}
          id={"name"}
          name={"name"}
          label={"Update your name"}
          type={"text"}
          placeholder={"You can leave it empty to keep the current"}
          className={"text-body"}
          value={formValues.name}
          onChange={handleChange}
        />
        <InputForm
          htmlFor={"bio"}
          id={"bio"}
          name={"bio"}
          label={"Biography"}
          type={"text"}
          placeholder={"Describe yourself"}
          value={formValues.bio}
          onChange={handleChange}
          className={"text-body"}
        />
        <InputForm
          htmlFor={"image"}
          id={"image"}
          name={"image"}
          label={"Image URL"}
          type={"file"}
          placeholder={"Your image URL"}
          value={formValues.image}
          onChange={handleChange}
          className={"mb-3 text-body"}
        />
        <Button
          type={"submit"}
          variant={"primary"}
          className="rounded-3 w-100 mb-3"
        >
          Create Forum
        </Button>
      </form>
    </>
  );
}
