export default function HeadingText({ children, className, ...props }) {
  return (
    <>
      <p
        className={`fw-semibold fs-2 lh-sm text-uppercase text-start text-black px-2 py-2 ${className}`}
        {...props}
      >
        {children}
      </p>
    </>
  );
}
