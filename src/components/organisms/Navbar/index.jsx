import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeadingText from "../../atoms/HeadingText/index.jsx";
import ContainerLayout from "../../templates/ContainerLayout.jsx";
import Button from "../../atoms/Button/index.jsx";
import InputForm from "../../molecules/InputForm/index.jsx";
import IconPlaceholder from "../../atoms/IconPlaceholder/index.jsx";
import Cookies from "js-cookie";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState(Cookies.get("jwt"));

  useEffect(() => {
    const checkToken = () => {
      const jwt = Cookies.get("jwt");
      setToken(jwt);
    };
    checkToken();
    const intervalId = setInterval(checkToken, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwt", { sameSite: "Strict" });
    Cookies.remove("user", { sameSite: "Strict" });
    window.location.href = "/";
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-bs-theme");
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
                    className="d-flex p-1 rounded-3 me-lg-5 w-100"
                  />
                </div>
              </div>
              <div className="row my-2 col-lg-4">
                <div className="col-lg-12 d-flex justify-content-center justify-content-lg-end gap-2">
                  {token && (
                    <div className="dropdown">
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
                  {token ? (
                    <Button
                      variant="primary"
                      className="rounded-5"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Button variant="primary" className="rounded-5">
                        <Link
                          to="/login"
                          className="text-white text-decoration-none"
                        >
                          Login
                        </Link>
                      </Button>
                      <Button variant="primary" className="rounded-5">
                        <Link
                          to="/register"
                          className="text-white text-decoration-none"
                        >
                          Register
                        </Link>
                      </Button>
                    </>
                  )}
                  <Button
                    variant="primary"
                    className="rounded-5"
                    onClick={handleDarkModeToggle}
                  >
                    <IconPlaceholder variant={darkMode ? "moon" : "sun"} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </ContainerLayout>
  );
}
