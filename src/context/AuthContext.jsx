import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getToken as getTokenFromStorage,
  setToken as setTokenToStorage,
  removeToken as removeTokenFromStorage,
} from "../utils/tokenService";
import { setOnUnauthorized } from "../utils/config";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getTokenFromStorage());
  const navigate = useNavigate();

  const setToken = (newToken) => {
    if (newToken) {
      setTokenToStorage(newToken);
      setTokenState(newToken);
    } else {
      removeTokenFromStorage();
      setTokenState(null);
    }
  };

  useEffect(() => {
    const onStorage = () => setTokenState(getTokenFromStorage());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    setOnUnauthorized(() => {
      setToken(null);
      navigate("/auth", { replace: true });
    });
  }, [navigate]);

  const value = useMemo(() => ({ token, setToken }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
