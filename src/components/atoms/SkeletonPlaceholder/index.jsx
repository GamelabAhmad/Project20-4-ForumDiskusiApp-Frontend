export default function SkeletonPlaceholder({
  breakpoint,
  variant,
  className,
  ...props
}) {
  return (
    <>
      <div
        className={`placeholder rounded text-${variant} ${className}`}
        {...props}
      ></div>
    </>
  );
}
