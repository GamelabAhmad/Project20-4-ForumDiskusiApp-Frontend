import AuthLayout from "../components/templates/AuthLayout.jsx";
import LoginForm from "../components/organisms/LoginForm/index.jsx";
import Card from "../components/molecules/Card/index.jsx";

export default function LoginPages() {
  const token = localStorage.getItem("token");
  if (token !== "null") {
    window.location.href = "/";
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <Card className="w-75 w-sm-75 w-md-50 w-lg-50 w-xl-50 w-xxl-25 p-4 rounded-4">
          <AuthLayout label="Login">
            <LoginForm />
          </AuthLayout>
        </Card>
      </div>
    </>
  );
}
