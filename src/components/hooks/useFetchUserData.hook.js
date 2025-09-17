// import useFetchToken from "./useFetchToken.hook";
// import FetchUser from "@/api/auth/client/user/route";

// const useFetchUserData = async() =>{
//     const retrived_token = useFetchToken();
//     let data = null;
//     if (retrived_token === null || !retrived_token){
//         return null;
//     }
//     const email = retrived_token?.email;
//     const result = await FetchUser(email);
//     return result.data;
// }
// export default useFetchUserData;

import { useState, useEffect } from "react";
import useFetchToken from "./useFetchToken.hook";
import FetchUser from "@/api/auth/client/user/route";

const useFetchUserData = (user_handler) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const retrievedToken = useFetchToken();

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, [retrievedToken,user_handler]);

  return userData;
};

export default useFetchUserData;
