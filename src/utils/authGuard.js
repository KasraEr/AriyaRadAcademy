import { useAuth } from "../context/AuthContext.jsx";
import { jwtDecode } from "jwt-decode";

export function useIsAdmin() {
  const { token } = useAuth();
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded.role === "Administrator";
  } catch {
    return false;
  }
}
