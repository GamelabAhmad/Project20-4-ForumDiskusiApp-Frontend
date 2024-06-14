import HeadingText from "../atoms/HeadingText/index.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import { Link } from "react-router-dom";

export default function AuthLayout({ label, children }) {
  return (
    <>
      <ContainerLayout>
        <div className="text-center mb-3">
          <HeadingText cssReset={true} className="fw-semibold text-primary">
            {label}
          </HeadingText>
        </div>
        <div>{children}</div>
        <div className="text-center mt-3">
          {label === "Register" ? (
            <p>
              Sudah punya akun?{" "}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
            </p>
          ) : (
            <p>
              Belum punya akun?{" "}
              <Link to="/register" className="text-decoration-none">
                Register
              </Link>
            </p>
          )}
        </div>
      </ContainerLayout>
    </>
  );
}
