import TypographyText from "../../atoms/TypographyText/index.jsx";
import Label from "../../atoms/Label/index.jsx";
import Input from "../../atoms/Input/index.jsx";
import ErrorMessages from "../../atoms/ErrorMessages/index.jsx";
import { useState } from "react";

export default function InputForm({
  htmlFor,
  id,
  name,
  label,
  type,
  placeholder,
  className,
  value,
  onChange,
  error,
  options,
  onOptionChange,
}) {
  const [selectedOption, setSelectedOption] = useState(value);

  const handleOptionChange = (option) => {
    setSelectedOption(option.name);
    onOptionChange(option);
  };

  return (
    <>
      <Label htmlFor={htmlFor} className="form-label mb-2">
        <TypographyText cssReset={true}>{label}</TypographyText>
      </Label>
      {options ? (
        <div className={`dropdown w-100 ${className}`}>
          <button
            className="btn btn-primary dropdown-toggle w-100"
            type="button"
            id={id}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedOption}
          </button>
          <ul className="dropdown-menu w-100" aria-labelledby={id}>
            {options.map((option) => (
              <li key={option.id}>
                <a
                  className="dropdown-item w-100"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOptionChange(option);
                  }}
                >
                  {option.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Input
          type={type}
          className={`form-control mb-2 rounded-3 px-2 py-1 ${className}`}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <ErrorMessages>{error}</ErrorMessages>}
    </>
  );
}
