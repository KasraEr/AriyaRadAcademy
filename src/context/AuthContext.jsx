// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import {
//   getToken as getTokenFromStorage,
//   setToken as setTokenToStorage,
// } from "../utils/tokenService";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [token, setTokenState] = useState(() => getTokenFromStorage());

//   const setToken = (newToken) => {
//     if (newToken) {
//       setTokenToStorage(newToken);
//       setTokenState(newToken);
//     } else {
//       setTokenToStorage(null);
//       setTokenState(null);
//     }
//   };

//   useEffect(() => {
//     const onStorage = () => setTokenState(getTokenFromStorage());
//     window.addEventListener("storage", onStorage);
//     return () => window.removeEventListener("storage", onStorage);
//   }, []);

//   const value = useMemo(() => ({ token, setToken }), [token]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// }

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getToken as getTokenFromStorage,
  setToken as setTokenToStorage,
  removeToken as removeTokenFromStorage,
} from "../utils/tokenService";
import { setOnUnauthorized } from "../utils/config"; // از api.js ایمپورت می‌کنیم
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getTokenFromStorage());
  const navigate = useNavigate();

  // متدی برای ست کردن یا پاک کردن توکن
  const setToken = (newToken) => {
    if (newToken) {
      setTokenToStorage(newToken);
      setTokenState(newToken);
    } else {
      removeTokenFromStorage();
      setTokenState(null);
    }
  };

  // همگام‌سازی بین تب‌ها
  useEffect(() => {
    const onStorage = () => setTokenState(getTokenFromStorage());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // هندل کردن 401 از سمت api.js
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
