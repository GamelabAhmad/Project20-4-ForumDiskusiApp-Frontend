export default function Input({
  className,
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  children,
  ...props
}) {
  return (
    <>
      <input
        className={`form-control text-dark d-grid ${className}`}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      ></input>
    </>
  );
}
