import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useToken from "../hooks/useToken";
import { axiosInstance } from "../utils/axiosAPI";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  const { token, tokenLoaded } = useToken();
  async function loadUser() {
    try {
      const res = await axiosInstance.get("users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const info = res.data;
      setUser({
        id: info.id,
        username: info.username,
        email: info.email,
      });
    } catch (err) {
      toast.error("please login before taking action");
    } finally {
      setUserLoaded(true);
    }
  }

  const removeAuthInfo = () => {
    setUser(null);
    //remove token from localStorage
    localStorage.removeItem("issue-tracker-token");
  };

  useEffect(() => {
    if (tokenLoaded) {
      if (token) {
        loadUser();
      } else {
        setUserLoaded(true);
      }
    }
  }, [tokenLoaded, token]);
  const saveAuthInfo = (info) => {
    //save token into localStorage
    localStorage.setItem("issue-tracker-token", info.jwt);
    //save user info into state
    setUser({
      id: info.user.id,
      username: info.user.username,
      email: info.user.email,
    });
  };

  const value = {
    saveAuthInfo,
    userLoaded,
    removeAuthInfo,
    user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
