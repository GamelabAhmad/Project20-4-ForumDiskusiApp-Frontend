import React, { useState } from "react";
import InputForm from "../../molecules/InputForm/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import { signIn } from "../../../api/authApi.js";
import { loginValidationSchema } from "../../../utils/authValidation";
import * as yup from "yup";

export default function LoginForm() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await loginValidationSchema.validate(formValues, { abortEarly: false });
      await signIn(formValues.username, formValues.password);
      window.location.href = "/";
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorMessages = {};
        error.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        setErrors(errorMessages);
      } else {
        setErrorMessage("Invalid username or password.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <InputForm
          htmlFor={"username"}
          id={"username"}
          name={"username"}
          label={"Username"}
          type={"text"}
          placeholder={"Username"}
          className={"w-100 text-body"}
          value={formValues.username}
          onChange={handleChange}
          error={errors.username}
        />
        <InputForm
          htmlFor={"password"}
          id={"password"}
          name={"password"}
          label={"Password"}
          type={"password"}
          placeholder={"Password"}
          className={"w-100 text-body mb-3"}
          value={formValues.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button
          variant={"primary"}
          type={"submit"}
          children={"Login"}
          className="w-100 mt-1 rounded-3"
        />
      </form>
    </>
  );
}
