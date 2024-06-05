export default function TypographyText({ children, className, ...props }) {   
  return (
    <>
      <p
        className={`fw-normal fs-6 lh-sm text-start text-black d-flex align-items-center m-0 ${className}`}
        {...props}
      >
        {children}
      </p>
    </>
  );
}
