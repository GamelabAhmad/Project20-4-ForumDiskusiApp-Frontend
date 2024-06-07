import Card from "../../molecules/Card/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import { Link } from "react-router-dom";

export default function CardHeader({ title, description }) {
  return (
    <>
      <Card className="shadow-sm p-3">
        <div className="d-flex justify-content-between mb-3 mb-lg-0">
          <Card.Title className="fw-semibold text-primary">{title}</Card.Title>
          <Link to={"/dashboard"}>
            <Button variant={"primary"}>Ask Question</Button>
          </Link>
        </div>
        <Card.Description className="mb-5">{description}</Card.Description>
      </Card>
    </>
  );
}
