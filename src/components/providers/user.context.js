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
