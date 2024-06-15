import { useEffect, useState } from "react";
import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import Toasts from "../../molecules/Toasts/index.jsx";
import { getUserProfile, updateUser } from "../../../api/userApi.js";
import Cookies from "js-cookie";
import TypographyText from "../../atoms/TypographyText/index.jsx";

export default function UserUpdateProfileForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    bio: "",
    avatar: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState({});
  const username = Cookies.get("user");

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await getUserProfile();
        setFormValues({
          name: response.name,
          bio: response.bio,
          avatar: response.avatar,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchUserProfile();
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "avatar") {
      setFormValues({
        ...formValues,
        [event.target.name]: URL.createObjectURL(event.target.files[0]),
      });
    } else {
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser(username, formValues);
      setToastContent({
        title: "Success",
        description: "Profile updated successfully",
        variant: "success",
      });
      setShowToast(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
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
          htmlFor={"avatar"}
          id={"avatar"}
          name={"avatar"}
          label={"Avatar URL"}
          type={"file"}
          placeholder={"Your avatar URL"}
          className={"mb-3 text-body"}
          onChange={handleChange}
        />
        {formValues.avatar && (
          <>
            <TypographyText cssReset={true}>Avatar Preview</TypographyText>
            <img
              src={formValues.avatar}
              alt="Avatar Preview"
              className="img-fluid py-3"
              height={200}
              width={200}
            />
          </>
        )}
        <Button
          type={"submit"}
          variant={"primary"}
          className="rounded-3 w-100 mb-3"
        >
          Update Profile
        </Button>
      </form>
    </>
  );
}
