import { Link } from "react-router-dom";
import SubheadingText from "../../atoms/SubheadingText/index.jsx";
import TypographyText from "../../atoms/TypographyText/index.jsx";
import Card from "../../molecules/Card/index.jsx";

export default function SearchResult({ result }) {
  return (
    <Card className="shadow-sm mb-3">
      <Card.Title>
        <Link to={`/question/${result.uuid}`} className="text-decoration-none">
          <SubheadingText cssReset={true}>{result.title}</SubheadingText>
        </Link>
      </Card.Title>
      <Card.Description>
        <TypographyText cssReset={true}>{result.body}</TypographyText>
      </Card.Description>
    </Card>
  );
}
