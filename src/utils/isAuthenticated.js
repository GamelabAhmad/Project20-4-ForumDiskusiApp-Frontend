export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token) {
    localStorage.setItem("token", "null");
  }

  if (!user) {
    localStorage.setItem("user", "null");
  }
};
