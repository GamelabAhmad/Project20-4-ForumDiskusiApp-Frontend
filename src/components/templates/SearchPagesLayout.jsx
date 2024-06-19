import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import { useState } from "react";
import SearchResultsList from "../organisms/SearchResultsList/index.jsx";
import SearchBarForm from "../organisms/SearchBarForm/index.jsx";
import HeadingText from "../atoms/HeadingText/index.jsx";
import Card from "../molecules/Card/index.jsx";

export default function SearchPagesLayout() {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (results, value) => {
    setResults(results);
    setInputValue(value);
    setHasSearched(true);
  };

  return (
    <PagesLayout>
      <ContainerLayout>
        <div className="d-flex justify-content-center align-items-center">
          <div className="w-100 d-flex flex-column align-items-center row">
            <HeadingText
              cssReset={true}
              className="text-center fw-semibold text-primary"
            >
              Search
            </HeadingText>
            <div className="my-3 col-12">
              <SearchBarForm setResults={handleSearch} />
            </div>
            {hasSearched && (
              <SearchResultsList results={results} inputValue={inputValue} />
            )}
          </div>
        </div>
      </ContainerLayout>
    </PagesLayout>
  );
}
