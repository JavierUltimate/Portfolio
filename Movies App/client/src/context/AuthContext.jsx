import { createContext, useContext, useEffect, useState } from "react";
import {
  deleteUserRequest,
  getUsersRequest,
  loginRequest,
  registerRequest,
  verifyTokenRequest,
} from "../api/api";
import Cookies from "js-cookie";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Were is the Context?");
  }
  return context;
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => {
        setErr(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [err]);

  useEffect(() => {
    let isMounted = true;
    const checkLogin = async () => {
      try {
        const cookies = Cookies.get();
        if (!cookies.token) {
          if (isMounted) {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
          }
          return;
        }
        setLoading(true);
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data || !isMounted) {
          if (isMounted) {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
          }
          return;
        }
        if (isMounted) {
          setIsAuthenticated(true);
          setUser(res.data);
          setUsers(res.data);

          setLoading(false);
          if (res.data.roll === "Admin") {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
          setErr(error.message || "Token verification failed");
        }
      }
    };
    checkLogin();
    return () => {
      isMounted = false;
    };
  }, []);

  const signUp = async (values) => {
    try {
      const res = await registerRequest(values);
      setUser(res.data);
      setUsers(res.data);
      if (res.data.roll === "Admin") {
        setIsAdmin(true);
      }
      setIsAuthenticated(true);
      alert("User Added");
    } catch (error) {
      setErr(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };

  const signIn = async (values) => {
    try {
      const res = await loginRequest(values);
      setUser(res.data);
      if (res.data.roll === "Admin") {
        setIsAdmin(true);
      }

      setIsAuthenticated(true);
      alert("User loged");
    } catch (error) {
      setErr(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };

  const logout = async () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
  };

  const getUsersHere = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserContext = async (id) => {
    try {
      const rese = await deleteUserRequest(id);
      setUsers(users.filter((item) => item._id != id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        signUp,
        user,
        loading,
        isAuthenticated,
        err,
        users,
        signIn,
        logout,
        getUsersHere,
        isAdmin,
        deleteUserContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
