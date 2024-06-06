import TypographyText from "../../atoms/TypographyText/index.jsx";
import Label from "../../atoms/Label/index.jsx";
import Input from "../../atoms/Input/index.jsx";
import ErrorMessages from "../../atoms/ErrorMessages/index.jsx";

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
}) {
  return (
    <>
      <Label htmlFor={htmlFor} className="form-label mb-2">
        <TypographyText cssReset={true}>{label}</TypographyText>
      </Label>
      <Input
        type={type}
        className={`form-control mb-2 rounded-3 px-2 py-1 ${className}`}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <ErrorMessages>{error}</ErrorMessages>}
    </>
  );
}
