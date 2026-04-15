import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);

    return decoded.role === "admin"
      ? children
      : <h2>Access Denied ❌</h2>;
  } catch (error) {
    return <Navigate to="/" />;
  }
}

export default AdminRoute;
