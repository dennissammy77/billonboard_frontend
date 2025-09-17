// import { createContext, useContext, useEffect, useState } from 'react';
// import useFetchUserData from '../hooks/useFetchUserData.hook';

// export const UserContext = createContext(null);

// export function UserProvider({children}) {
//     const [user, set_user] = useState('');
//     const [user_handler, set_user_handler] = useState('');

//     useEffect(()=>{
//         FetchUser()
//     },[user_handler]);
//     const FetchUser=async()=>{
//         const data = await useFetchUserData();
//         set_user(data)
//     }
  
//     return (
//       <UserContext.Provider value={{ user,set_user_handler }}>
//         {children}
//       </UserContext.Provider>
//     );
// }
import { createContext, useContext, useState } from "react";
import useFetchUserData from "../hooks/useFetchUserData.hook";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user_handler, set_user_handler] = useState("");
  const userData = useFetchUserData(user_handler);

  return (
    <UserContext.Provider value={{ user: userData, set_user_handler }}>
      {children}
    </UserContext.Provider>
  );
}

// helper hook for consuming the context
export const useUser = () => useContext(UserContext);
