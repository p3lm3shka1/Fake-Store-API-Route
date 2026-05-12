import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearToken, getToken, loginUser, saveToken } from "../utils/api";

const AuthContext = createContext(null);

const USERNAME = "user";
const PASSWORD = "123";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const isAuth = !!token;

  useEffect(() => {
    const t = getToken();
    if (t) setToken(t);
  }, []);

  const login = async (username, password) => {
    if (username === USERNAME && password === PASSWORD) {
      const fakeToken = `custom-token-${Date.now()}`;
      saveToken(fakeToken);
      localStorage.setItem("fs_user", username);
      setUser(username);
      setToken(fakeToken);
      return fakeToken;
    }
  };

  const logout = () => {
    clearToken();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ token, isAuth, user, login, logout }),
    [token, isAuth, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
