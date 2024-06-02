export default function AvatarPlaceHolder({
  image,
  alt,
  className,
  children,
  ...props
}) {
  return (
    <>
      <img
        className={`rounded-5 ${className}`}
        src={image}
        alt={alt}
        {...props}
      >
        {children}
      </img>
    </>
  );
}
