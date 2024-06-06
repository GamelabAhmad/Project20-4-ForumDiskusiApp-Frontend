import { Link } from "react-router-dom";
import HeadingText from "../../atoms/HeadingText/index.jsx";
import ContainerLayout from "../../templates/ContainerLayout.jsx";
import Button from "../../atoms/Button/index.jsx";
import InputForm from "../../molecules/InputForm/index.jsx";
import IconPlaceholder from "../../atoms/IconPlaceholder/index.jsx";

export default function Navbar() {
  return (
    <header>
      <ContainerLayout>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid my-4">
            <Link to="/" className="navbar-brand text-primary">
              <HeadingText
                cssReset={true}
                className="d-inline-block fw-semibold"
              >
                Twenties
              </HeadingText>
            </Link>
            <button
              className="navbar-toggler custom-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header m-3">
                <button
                  type="button"
                  className="btn-close btn-close-dark"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div className="row">
                  <div className="col-lg-12">
                    <InputForm
                      type="search"
                      name="search"
                      id="search"
                      placeholder=" Search..."
                      className="d-flex flex-grow-1 p-1 rounded-2 me-lg-5 w-100"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-12 d-flex justify-content-center">
                    <div className="dropdown me-2">
                      <Button
                        variant="primary"
                        className="rounded-5 dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <IconPlaceholder variant={"envelope"} />
                      </Button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </div>
                    <Button variant="primary" className="rounded-5 me-2">
                      <Link
                        to="/login"
                        className="text-white text-decoration-none p-2 px-3"
                      >
                        Login
                      </Link>
                    </Button>
                    <Button variant="primary" className="rounded-5">
                      <Link
                        to="/register"
                        className="text-white text-decoration-none p-2 px-3"
                      >
                        Register
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </ContainerLayout>
    </header>
  );
}
