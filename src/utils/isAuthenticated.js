export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.setItem("token", "null");
  }
};
