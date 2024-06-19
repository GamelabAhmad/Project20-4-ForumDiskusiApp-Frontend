import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeadingText from "../../atoms/HeadingText/index.jsx";
import ContainerLayout from "../../templates/ContainerLayout.jsx";
import Button from "../../atoms/Button/index.jsx";
import IconPlaceholder from "../../atoms/IconPlaceholder/index.jsx";
import Cookies from "js-cookie";
import SearchBarForm from "../SearchBarForm/index.jsx";

export default function Navbar() {
  const user = Cookies.get("user");
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) || false,
  );
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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-bs-theme");
    }
  }, [darkMode]);

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => {
      localStorage.setItem("darkMode", !prevMode);
      return !prevMode;
    });
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
              <div className="row my-2 col-lg-4 ms-auto">
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
                          <a
                            className="dropdown-item"
                            href={`/profile/${user}`}
                          >
                            Profile
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href={"/dashboard"}>
                            Dashboard
                          </a>
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
                        <a
                          href="/search"
                          className="text-white text-decoration-none d-flex gap-2"
                        >
                          <IconPlaceholder variant={"search"} />
                          Search
                        </a>
                      </Button>
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
