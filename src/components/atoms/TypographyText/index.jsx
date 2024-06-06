import useCssReset from "../../../hooks/useCssReset.js";

export default function TypographyText({
  children,
  className,
  cssReset,
  ...props
}) {
const style = useCssReset(cssReset);

return (
    <>
      <p
        className={`fw-normal fs-6 lh-sm ${className}`}
        style={style}
        {...props}
      >
        {children}
      </p>
    </>
  );
}
