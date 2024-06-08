import { Link } from "react-router-dom";
import HeadingText from "../../atoms/HeadingText/index.jsx";
import ContainerLayout from "../../templates/ContainerLayout.jsx";
import Button from "../../atoms/Button/index.jsx";
import InputForm from "../../molecules/InputForm/index.jsx";
import IconPlaceholder from "../../atoms/IconPlaceholder/index.jsx";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    if (token !== "null") {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  return (
    <ContainerLayout>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid my-3">
          <Link to="/" className="navbar-brand text-primary">
            <HeadingText cssReset={true} className="d-inline-block fw-semibold">
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
            <div className="offcanvas-body d-xl-flex justify-content-between">
              <div className="row col-lg-8">
                <div className="col-lg-12 mt-1 ms-xl-4">
                  <InputForm
                    type="search"
                    name="search"
                    id="search"
                    placeholder=" Search..."
                    className="d-flex p-1 rounded-2 me-lg-5 w-100"
                  />
                </div>
              </div>
              <div className="row my-2 col-lg-4">
                <div className="col-lg-12 d-flex justify-content-center justify-content-lg-end">
                  {token && token !== "null" && (
                    <div className="dropdown me-2">
                      <Button
                        variant="primary"
                        className="rounded-5 dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <IconPlaceholder variant={"person-circle"} />
                      </Button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to={"/profile"}>
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to={"/dashboard"}>
                            Dashboard
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                  {token && token !== "null" ? (
                    <Button
                      variant="primary"
                      className="rounded-5 me-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Button variant="primary" className="rounded-5 me-2">
                        <Link
                          to="/login"
                          className="text-white text-decoration-none p-1 px-3 "
                        >
                          Login
                        </Link>
                      </Button>
                      <Button variant="primary" className="rounded-5">
                        <Link
                          to="/register"
                          className="text-white text-decoration-none p-1 px-3"
                        >
                          Register
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </ContainerLayout>
  );
}
