import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearToken, getToken, loginUser, saveToken } from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const isAuth = !!token;

  useEffect(() => {
    const t = getToken();
    if (t) setToken(t);
  }, []);

  const login = async (username, password) => {
    const data = await loginUser(username, password);
    if (!data?.token) throw new Error("No token returned");
    saveToken(data.token);
    setToken(data.token);
    return data.token;
  };

  const logout = () => {
    clearToken();
    setToken(null);
  };

  const value = useMemo(
    () => ({ token, isAuth, login, logout }),
    [token, isAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
