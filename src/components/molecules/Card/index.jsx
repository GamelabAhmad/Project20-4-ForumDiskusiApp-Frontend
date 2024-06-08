import HeadingText from "../../atoms/HeadingText/index.jsx";
import TypographyText from "../../atoms/TypographyText/index.jsx";

export default function Card({
  children,
  className,
  imagesSrc,
  imagesAlt,
  ...props
}) {
  return (
    <>
      <div className={`card ${className}`} {...props}>
        <div className="card-body">{children}</div>
      </div>
    </>
  );
}

const Images = ({
  imageSrc,
  imageAlt,
  widthImage,
  heightImage,
  className,
  ...props
}) => {
  return (
    <>
      <img
        src={imageSrc}
        className={`card-img-top img-fluid mb-3 rounded-3 ${className}`}
        alt={imageAlt}
        style={{ width: widthImage, height: heightImage }}
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
