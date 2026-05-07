import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getMeRequest, loginRequest, registerRequest } from "../api/authApi";
import { storage } from "../utils/storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storage.getUser());
  const [token, setToken] = useState(storage.getToken());
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      const savedToken = storage.getToken();

      if (!savedToken) {
        setAuthLoading(false);
        return;
      }

      try {
        const me = await getMeRequest(savedToken);
        setUser(me);
        setToken(savedToken);
      } catch (error) {
        storage.clearAuth();
        setUser(null);
        setToken(null);
      } finally {
        setAuthLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  const register = async (payload) => {
    const data = await registerRequest(payload);
    storage.setToken(data.token);
    storage.setUser(data.user);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const login = async (payload) => {
    const data = await loginRequest(payload);
    storage.setToken(data.token);
    storage.setUser(data.user);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    storage.clearAuth();
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      authLoading,
      register,
      login,
      logout,
    }),
    [user, token, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);