import useCssReset from "../../../hooks/useCssReset.js";

export default function Label({
  htmlFor,
  cssReset,
  className,
  children,
  ...props
}) {
  const style = useCssReset(cssReset);

  return (
    <>
      <label
        className={`fs-5 d-grid fw-light ${className}`}
        style={style}
        htmlFor={htmlFor}
        {...props}
      >
        {children}
      </label>
    </>
  );
}
