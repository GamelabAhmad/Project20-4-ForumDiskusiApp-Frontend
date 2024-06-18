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
    image: null,
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
          image: response.image,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchUserProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image" && files.length > 0) {
      setFormValues({
        ...formValues,
        image: files[0],
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("image");
    const image = fileInput.files[0];

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("bio", formValues.bio);
    if (formValues.image) {
      formData.append("image", formValues.image);
    }

    try {
      await updateUser(username, formData);
      setToastContent({
        title: "Success",
        titleColor: "white",
        description: "Profile updated successfully",
        variant: "success",
        variantBody: "success-subtle",
      });
      setShowToast(true);
      setTimeout(() => {
        window.location.href = `/profile/${username}`;
      }, 500);
    } catch (error) {
      console.error("Error:", error);
      setToastContent({
        title: "Error",
        titleColor: "white",
        description: "Failed to update profile",
        variant: "danger",
        variantBody: "danger-subtle",
      });
      setShowToast(true);
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
          label={"Avatar URL"}
          type={"file"}
          placeholder={"Upload your avatar"}
          className={"mb-3 text-body"}
          onChange={handleChange}
        />
        {formValues.image && (
          <>
            <TypographyText cssReset={true}>Avatar Preview</TypographyText>
            <img
              src={URL.createObjectURL(formValues.image)}
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
