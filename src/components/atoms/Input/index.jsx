export default function Input({ className, type, children, name, placeholder, ...props }) {
  return (
    <>
      <input className={`text-dark ${className}`} type={type} placeholder={placeholder} name={name} {...props}></input>
    </>
  );
}
