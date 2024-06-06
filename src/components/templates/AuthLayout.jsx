import HeadingText from "../atoms/HeadingText/index.jsx";
import ContainerLayout from "./ContainerLayout.jsx";

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
              <a href="/login" className="text-decoration-none">
                Login
              </a>
            </p>
          ) : (
            <p>
              Belum punya akun?{" "}
              <a href="/register" className="text-decoration-none">
                Register
              </a>
            </p>
          )}
        </div>
      </ContainerLayout>
    </>
  );
}
