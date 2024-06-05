import Input from "../../atoms/Input";
import Label from "../../atoms/Label";
import TypographyText from "../../atoms/TypographyText";

export default function InputForm({
  htmlFor,
  type,
  name,
  id,
  label,
  placeholder,
}) {
  return (
    <>
      <Label htmlFor={htmlFor}>
        <TypographyText>{label}</TypographyText>
      </Label>
      <Input type={type} name={name} id={id} placeholder={placeholder} />
    </>
  );
}
