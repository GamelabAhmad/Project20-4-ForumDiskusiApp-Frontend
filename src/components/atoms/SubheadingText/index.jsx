export default function SubheadingText({ children, className, ...props }) {
  return (
    <>
      <p className={`fw-normal fs-3 lh-sm text-black ${className}`} {...props}>
        {children}
      </p>
    </>
  );
}
