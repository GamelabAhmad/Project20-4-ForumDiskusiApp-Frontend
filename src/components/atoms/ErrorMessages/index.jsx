import useCssReset from "../../../hooks/useCssReset.js";

export default function ErrorMessages({ children, className, cssReset }) {
  const resetStyle = useCssReset(cssReset);
  const customStyle = { fontSize: "0.8rem" };

  const style = { ...resetStyle, ...customStyle };
  return (
    <>
      <p className={`text-danger ${className}`} style={style}>
        {children}
      </p>
    </>
  );
}
