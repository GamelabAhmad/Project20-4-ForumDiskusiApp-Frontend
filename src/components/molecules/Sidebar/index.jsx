import React from "react";
import { Container } from "react-bootstrap";
import TypographyText from "../../atoms/TypographyText";
import IconPlaceholder from "../../atoms/IconPlaceholder";

const Sidebar = () => {
  return (
    <div>
      <Container className="col-sm-3  border border-dark rounded p-2">
        <ul className="pt-2 ps-4 list-unstyled ">
          <li className="mb-2">
            <IconPlaceholder className="ps-2  text-dark bi bi-house-door" />
            <TypographyText className="d-inline ps-4 ms-4 ">HOME</TypographyText>
          </li>
          <li className="mb-2">
            <IconPlaceholder className="ps-2  text-dark bi bi-globe2" />
            <TypographyText className="d-inline  ps-3 ms-4 ">QUESTION</TypographyText>
          </li>
          <li className="mb-2">
            <IconPlaceholder className="ps-2  text-dark bi bi-people" />
            <TypographyText className="d-inline  ps-4 ms-4 ">FORUM</TypographyText>
          </li>
          <li className="mb-2">
            <IconPlaceholder className="ps-2  text-dark bi bi-journals" />
            <TypographyText className="d-inline ps-4 ms-4 ">TOPIC</TypographyText>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Sidebar;
