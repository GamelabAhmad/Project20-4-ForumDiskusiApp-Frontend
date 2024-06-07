import TypographyText from "../../atoms/TypographyText/index.jsx";

export default function UserPostSummary({ votes, answers, views }) {
  const postSummary = [
    {
      id: 1,
      title: "Votes",
      value: votes,
    },
    {
      id: 2,
      title: "Answers",
      value: answers,
    },
    {
      id: 3,
      title: "Views",
      value: views,
    },
  ];

  return (
    <>
      {postSummary.map((summary) => (
        <TypographyText key={summary.id} cssReset={true} className="lh-lg">
          {summary.value} {summary.title}
        </TypographyText>
      ))}
    </>
  );
}
