export default function ContainerLayout({ children, className, ...props }) {
  return (
    <>
      <div className={`container ${className}`} {...props}>
        {children}
      </div>
    </>
  );
}
