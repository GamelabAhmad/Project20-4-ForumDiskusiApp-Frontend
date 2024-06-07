import useCssReset from "../../../hooks/useCssReset.js";

export default function SubheadingText({
  cssReset,
  children,
  className,
  ...props
}) {
  const style = useCssReset(cssReset);

  return (
    <>
      <p
        className={`fw-normal fs-3 lh-sm ${className}`}
        style={style}
        {...props}
      >
        {children}
      </p>
    </>
  );
}
