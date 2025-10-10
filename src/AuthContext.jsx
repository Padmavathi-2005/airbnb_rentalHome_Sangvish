import React, { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, setAuthToken } from "./Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // read from localStorage initially so auth survives reload
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bnb_user")) || null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("bnb_token") || null);
  const [loading, setLoading] = useState(false);

  // ensure axios has the token header when app initializes or token changes
  useEffect(() => {
    if (token) setAuthToken(token);
    else setAuthToken(null);
  }, [token]);

  // login(email, password) — used by LoginPage
  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await apiLogin({ email, password }); // { status, message, token, user }
      if (data?.status && data.token) {
        setToken(data.token);
        setUser(data.user);
        // persist
        localStorage.setItem("bnb_token", data.token);
        localStorage.setItem("bnb_user", JSON.stringify(data.user));
        setAuthToken(data.token);
      }
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      // rethrow so caller can show message
      throw err;
    }
  };

  const register = async (formData) => {
  setLoading(true);
  try {
    // Replace with your actual API call
    const data = await apiRegister(formData); 
    // expected response: { status: true/false, message, user, token }

    if (data?.status && data.token) {
      setToken(data.token);
      setUser(data.user);

      // persist token & user in localStorage
      localStorage.setItem("bnb_token", data.token);
      localStorage.setItem("bnb_user", JSON.stringify(data.user));
      setAuthToken(data.token);
    }

    setLoading(false);
    return data;
  } catch (err) {
    setLoading(false);
    throw err; // allow SignupPage to handle errors
  }
};


  // logout — client side (call server logout if available)
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("bnb_token");
    localStorage.removeItem("bnb_user");
    setAuthToken(null);
  };

  // updateUser — updates user object and persists to localStorage
  const updateUser = (updatedUser) => {
    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    localStorage.setItem("bnb_user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook for convenience
export const useAuth = () => useContext(AuthContext);