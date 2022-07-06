import { useEffect, useState } from "react";

const useToken = (navigateRoute) => {
  const [token, setToken] = useState(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const loadToken = () => {
    const token = localStorage.getItem("issue-tracker-token");
    setToken(token);
    setTokenLoaded(true);
  };
  useEffect(() => {
    loadToken();
  }, [navigateRoute]);

  return { token, tokenLoaded };
};

export default useToken;
