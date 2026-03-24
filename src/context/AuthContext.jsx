import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await api.get("/profile");
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/login", { email, password });
    setUser(response.data.user);
    return response.data;
  };

  const signup = async (email, password, name) => {
    const response = await api.post("/signup", { email, password, name });
    return response.data;
  };

  const confirmSignup = async (email, code) => {
    const response = await api.post("/confirmsignup", { email, code });
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.warn("Logout API failed or session already dead:", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, confirmSignup, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
