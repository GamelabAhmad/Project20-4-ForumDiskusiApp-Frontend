export default function AvatarPlaceHolder({
  src,
  alt,
  widthAvatar,
  heightAvatar,
  className,
  children,
  ...props
}) {
  return (
    <>
      <img
        className={`rounded-5 ${className}`}
        src={src}
        alt={alt}
        style={{ width: widthAvatar, height: heightAvatar }}
        {...props}
      >
        {children}
      </img>
    </>
  );
}
