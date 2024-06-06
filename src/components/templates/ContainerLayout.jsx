export default function ContainerLayout({ children, className, ...props }) {
  return (
    <>
      <div className={`container mx-auto ${className}`} {...props}>
        {children}
      </div>
    </>
  );
}
