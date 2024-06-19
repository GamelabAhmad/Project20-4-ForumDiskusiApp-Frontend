import SearchResult from "../SearchResult/index.jsx";
import Card from "../../molecules/Card/index.jsx";

export default function SearchResultsList({ results, inputValue }) {
  return (
    <div className="w-100 d-flex flex-column rounded overflow-auto">
      {results && results.length > 0 ? (
        results.map((result) => (
          <SearchResult result={result} key={result.uuid} />
        ))
      ) : inputValue.trim() !== "" ? (
        <Card className="mb-3">No results found</Card>
      ) : null}
    </div>
  );
}
