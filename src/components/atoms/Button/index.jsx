export default function Button({
  variant,
  className,
  type,
  children,
  ...props
}) {
  return (
    <>
      <button
        className={`btn btn-${variant} ${className}`}
        type={type}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
