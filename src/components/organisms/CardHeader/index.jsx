import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../molecules/Card/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import Toasts from "../../molecules/Toasts/index.jsx";

export default function CardHeader({
  title,
  description,
  buttonTitle,
  toastsMessage,
}) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleAskQuestionClick = (e) => {
    if (token === "null" || !token) {
      e.preventDefault();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 10000);
    } else {
      navigate("/dashboard");
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <Card className="shadow-sm p-3">
      <div className="d-flex justify-content-between mb-3">
        <Card.Title className="fw-semibold text-primary">{title}</Card.Title>
        <Button
          variant="primary"
          onClick={handleAskQuestionClick}
          className="rounded-3"
        >
          {buttonTitle}
        </Button>
      </div>
      <Card.Description className="mb-5 lh-base">
        {description}
      </Card.Description>

      {showToast && (
        <Toasts
          onClose={handleCloseToast}
          variant={"danger"}
          variantBody={"danger-subtle"}
          title={"Warning"}
          titleColor={"white"}
          description={`You need to login to ${toastsMessage}.`}
        />
      )}
    </Card>
  );
}
