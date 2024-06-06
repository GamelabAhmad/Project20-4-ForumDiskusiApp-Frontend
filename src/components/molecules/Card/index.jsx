import HeadingText from "../../atoms/HeadingText/index.jsx";
import TypographyText from "../../atoms/TypographyText/index.jsx";

export default function Card({ children, className, src, alt, ...props }) {
  return (
    <>
      <div className={`card ${className}`} {...props}>
        <Card.Images src={src} alt={alt} />
        <div className="card-body">{children}</div>
      </div>
    </>
  );
}

const Images = ({ src, alt, className, ...props }) => {
  return (
    <>
      <img
        src={src}
        className={`card-img-top ${className}`}
        alt={alt}
        {...props}
      />
    </>
  );
};

const Title = ({ children, className, ...props }) => {
  return (
    <>
      <HeadingText className={`card-title ${className}`} {...props}>
        {children}
      </HeadingText>
    </>
  );
};

const Description = ({ children, className, ...props }) => {
  return (
    <>
      <TypographyText className={`card-text ${className}`} {...props}>
        {children}
      </TypographyText>
    </>
  );
};

Card.Images = Images;
Card.Title = Title;
Card.Description = Description;
