import useCssReset from "../../../hooks/useCssReset";

export default function HeadingText({
  children,
  className,
  cssReset,
  ...props
}) {
  const style = useCssReset(cssReset);

  return (
    <>
      <p
        className={`fw-normal fs-2 lh-sm ${className}`}
        style={style}
        {...props}
      >
        {children}
      </p>
    </>
  );
}
