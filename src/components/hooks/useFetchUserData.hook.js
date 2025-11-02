
import { useState, useEffect, useCallback } from "react";
import useFetchToken from "./useFetchToken.hook";
import FetchUser from "@/api/auth/client/user/route";
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";

const useFetchUserData = (user_handler) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let retrievedToken = null;
  const cookies = new Cookies();
  const token = cookies.get('user_token1');
  if (token){
    const decoded_token = jwtDecode(token);
    retrievedToken = decoded_token;
  }

  const fetchData = useCallback(async () => {
    if (!retrievedToken) {
      setUserData(null);
      setLoading(false);
      return;
    }

    try {
      const email = retrievedToken.email;
      const result = await FetchUser(email);
      setUserData(result.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  },[token]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return userData;
};

export default useFetchUserData;
