import React from "react";
import { Button1 } from "react-bootstrap";

const Button = (props) => {
  const { children, classname = "bg-black" } = props;
  return (
    <Button1 className={`h-10 px-7 font-bold rounded-md mt-6 ${classname} text-white`} type="submit">
      {children}
    </Button1>
  );
};

export default Button;
