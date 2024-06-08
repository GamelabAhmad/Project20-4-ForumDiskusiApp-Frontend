import React, { useState } from "react";
import InputForm from "../../molecules/InputForm/index.jsx";
import { signUp } from "../../../api/authApi.js";
import Button from "../../atoms/Button/index.jsx";
import { registerValidationSchema } from "../../../utils/authValidation";
import * as yup from "yup";

export default function RegisterForm() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await registerValidationSchema.validate(formValues, {
        abortEarly: false,
      });
      const data = await signUp(
        formValues.username,
        formValues.email,
        formValues.password,
      );
      console.log(data);
      window.location.href = "/login";
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorMessages = {};
        error.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        setErrors(errorMessages);
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputForm
          htmlFor={"username"}
          id={"username"}
          name={"username"}
          label={"Username"}
          type={"text"}
          placeholder={"Your username"}
          value={formValues.username}
          onChange={handleChange}
          error={errors.username}
        />
        <InputForm
          htmlFor={"email"}
          id={"email"}
          name={"email"}
          label={"E-mail"}
          type={"email"}
          placeholder={"Your e-mail address"}
          value={formValues.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputForm
          htmlFor={"password"}
          id={"password"}
          name={"password"}
          label={"Password"}
          type={"password"}
          placeholder={"Your password"}
          className={"mb-3"}
          value={formValues.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button
          variant={"primary"}
          type={"submit"}
          children={"Register"}
          className="mt-1 w-100 rounded-3"
        />
      </form>
    </>
  );
}
