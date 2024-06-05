export default function SubheadingText({ children, className, ...props }) {
  return (
    <>
      <p
        className={`fw-normal fs-3 lh-sm text-start text-black d-flex align-items-center m-0 ${className}`}
        {...props}
      >
        {children}
      </p>
    </>
  );
}
