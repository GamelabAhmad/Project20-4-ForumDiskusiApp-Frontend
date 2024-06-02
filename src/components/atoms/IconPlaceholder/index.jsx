export default function IconPlaceholder({ variant, className, ...props }) {
  return (
    <>
      <i className={`bi bi-${variant} ${className}`} {...props}></i>
    </>
  );
}
