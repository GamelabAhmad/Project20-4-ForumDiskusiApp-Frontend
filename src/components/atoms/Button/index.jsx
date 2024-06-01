export default function Button({ className, type, children, ...props }) {
  return (
    <>
      <button className={`btn btn-primary ${className}`} type={type} {...props}>
        {children}
      </button>
    </>
  );
}
