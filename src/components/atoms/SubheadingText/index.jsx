export default function SubheadingText({ children, className, ...props }) {
  return (
    <>
      <p
        className={`fw-semibold fs-3 lh-sm text-uppercase text-start text-black mx-2 py-5 ${className}`}
        {...props}
      >
        {children}
      </p>
    </>
  );
}
