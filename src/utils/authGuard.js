import { jwtDecode } from "jwt-decode";
import { getToken } from "./tokenService";

export const isAdmin = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.role === "Adminstrator";
  } catch (err) {
    console.error("توکن نامعتبره:", err);
    return false;
  }
};
