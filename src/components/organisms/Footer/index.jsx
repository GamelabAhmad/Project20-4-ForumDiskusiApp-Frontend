import TypographyText from "../../atoms/TypographyText";
import ContainerLayout from "../../templates/ContainerLayout.jsx";
import IconPlaceholder from "../../atoms/IconPlaceholder/index.jsx";
import SubheadingText from "../../atoms/SubheadingText/index.jsx";

export default function Footer() {
  const footerList = [
    {
      id: 1,
      href: "/",
      variant: "house",
      text: "Home",
    },
    {
      id: 2,
      href: "/question",
      variant: "question-circle",
      text: "Question",
    },
    {
      id: 3,
      href: "/forum",
      variant: "globe",
      text: "Forum",
    },
    {
      id: 4,
      href: "/topic",
      variant: "chat-quote",
      text: "Topic",
    },
  ];

  const footerSupportList = [
    {
      id: 1,
      href: "/",
      variant: "question-circle",
      text: "FAQ",
    },
    {
      id: 2,
      href: "/",
      variant: "shield",
      text: "Privacy Policy",
    },
    {
      id: 3,
      href: "/",
      variant: "archive",
      text: "Terms of Service",
    },
  ];

  return (
    <>
      <div className="border-top shadow-sm">
        <ContainerLayout className="pt-3 pt-sm-5 mb-3">
          <div className="row p-4">
            <div className="col-12 col-md-8 mb-4">
              <div className="d-flex gap-2">
                <div className="align-content-center">
                  <SubheadingText
                    cssReset={true}
                    className="text-primary mt-2 fw-semibold"
                  >
                    Twenties
                  </SubheadingText>
                </div>
              </div>
              <div>
                <TypographyText className="py-3 lh-lg me-5 me-sm-0">
                  Twenties is a platform for forum discussion. We're a team of
                  experienced developers, seeking to provide a platform for
                  people to discuss and share their thoughts.
                </TypographyText>
              </div>
            </div>
            <div className="col-6 col-md-2 text-dark">
              <TypographyText cssReset={true} className="fw-bold text-primary">
                Menu
              </TypographyText>
              <ul className="list-unstyled d-grid gap-2 py-2">
                {footerList.map((footer) => (
                  <>
                    <li key={footer.id}>
                      <a
                        href={footer.href}
                        className="d-flex gap-2 align-items-center text-decoration-none text-body"
                      >
                        <IconPlaceholder variant={footer.variant} />
                        <TypographyText cssReset={true}>
                          {footer.text}
                        </TypographyText>
                      </a>
                    </li>
                  </>
                ))}
              </ul>
            </div>
            <div className="col-6 col-sm-6 col-md-2 text-dark">
              <TypographyText cssReset={true} className="fw-bold text-primary">
                Support
              </TypographyText>
              <ul className="list-unstyled d-grid gap-2 py-2">
                {footerSupportList.map((footer) => (
                  <li key={footer.id}>
                    <a
                      href={footer.href}
                      className="d-flex gap-2 align-items-center text-decoration-none text-body"
                    >
                      <IconPlaceholder variant={footer.variant} />
                      <TypographyText cssReset={true}>
                        {footer.text}
                      </TypographyText>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ContainerLayout>
        <TypographyText
          cssReset={true}
          className="bg-primary text-white py-3 text-center"
        >
          Copyright &copy; 2024 by Twenties
        </TypographyText>
      </div>
    </>
  );
}
