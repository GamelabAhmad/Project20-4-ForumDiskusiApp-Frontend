import TypographyText from "../../atoms/TypographyText/index.jsx";

export default function UserPostSummary({ votes, answers, downvotes }) {
  const postSummary = [
    {
      id: 1,
      title: "Votes",
      value: votes,
    },
    {
      id: 2,
      title: "Downvotes",
      value: downvotes,
    },
    {
      id: 3,
      title: "Answers",
      value: answers,
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
