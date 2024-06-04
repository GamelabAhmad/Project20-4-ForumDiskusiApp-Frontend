export default function Label({ htmlFor, className, children, ...props }) {
  return (
    <>
      <label
        className={`fs-2 d-grid fw-light ${className}`}
        htmlFor={htmlFor}
        {...props}
      >
        {children}
      </label>
    </>
  );
}
