export default function Input({
  className,
  type,
  id,
  name,
  placeholder,
  children,
  ...props
}) {
  return (
    <>
      <input
        className={`text-dark d-grid ${className}`}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        {...props}
      ></input>
    </>
  );
}
