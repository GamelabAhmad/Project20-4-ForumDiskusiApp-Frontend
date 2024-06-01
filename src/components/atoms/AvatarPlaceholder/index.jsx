export default function AvatarPlaceHolder({ image, alt, className, children, ...props }) {
  return (
    <>
      <img style={{ width: "40px", height: "40px" }} className={`rounded-circle w-sm ${className}`} src={image} alt="laptop" {...props}>
        {children}
      </img>
    </>
  );
}
