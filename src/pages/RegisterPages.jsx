import AuthLayout from "../components/templates/AuthLayout.jsx";
import RegisterForm from "../components/organisms/RegisterForm/index.jsx";
import Card from "../components/molecules/Card/index.jsx";
import Cookies from "js-cookie";

export default function RegisterPages() {
  const token = Cookies.get("jwt");

  if (token) {
    window.location.href = "/";
    return null;
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-center min-vh-100 p-4 p-sm-0">
        <Card className="w-100 w-sm-75 w-xl-50 w-xxl-25 p-2 p-sm-4 rounded-4">
          <AuthLayout label="Register">
            <RegisterForm />
          </AuthLayout>
        </Card>
      </div>
    </>
  );
}
