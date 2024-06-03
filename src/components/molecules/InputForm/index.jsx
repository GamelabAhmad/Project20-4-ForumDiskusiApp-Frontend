import Input from "../../atoms/Input";
import Label from "../../atoms/Label";
import TypographyText from "../../atoms/TypographyText"; 
export default function InputForm({htmlFor, children, type, name, placeholder}) {
    return (
        <>
        <Label htmlFor={htmlFor}><TypographyText>{children}</TypographyText></Label>
        <Input type={type} name={name} placeholder={placeholder}></Input>
        </>
    )
}