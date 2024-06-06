import React from "react";
import TypographyText from "../../atoms/TypographyText";

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

  return (
    <>
      <footer>
        <section>
          <div className="container">
            <div className="container-fluid fw-lighter">
              <div className="pt-5 mb-3">
                <div className="row border-bottom border-top border-dark py-4">
                  <div className="col-12 col-sm-12 col-md-6 mb-4">
                    <div className="d-flex gap-2">
                      <img src="https://toppng.com/uploads/preview/illustration-of-flag-of-indonesia-indonesia-flag-logo-11562943954zddevcowom.png" alt="" width="80" height="50" className="img-fluid" />
                      <div className="align-content-center">
                        <h4 className="text-dark mt-2 fst-italic">Twenties</h4>
                      </div>
                    </div>
                    <div>
                      <p className="text-white py-3">We're a team of experienced designers, developers, and marketers, passionate about delivering exceptional digital solutions.</p>
                      <a href="mailto:twenties@gmail.com">twenties@gmail.com</a>
                    </div>
                  </div>
                  <div className="col-6 col-sm-6 col-md-2 text-dark">
                    <h6 className="fw-bold">Menu</h6>
                    <ul className="list-unstyled d-grid gap-2 py-2">
                      {footerList.map((footer) => (
                        <>
                          <li key={footer.id}>
                            <a href={footer.href} className="d-flex gap-2 align-items-center text-decoration-none text-dark">
                              <TypographyText className="d-flex align-items-center m-0">{footer.text}</TypographyText>
                            </a>
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                  <div className="col-6 col-sm-6 col-md-2 text-dark">
                    <h6 className="fw-bold">Support</h6>
                    <ul className="list-unstyled d-grid gap-2 py-2">
                      <li>FAQ</li>
                      <li>Privacy Policy</li>
                      <li>Terms of Service</li>
                    </ul>
                  </div>
                </div>
              </div>
              <p className="text-dark py-2 text-center">Copyright © 2024 by twenties.</p>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}
