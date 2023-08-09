import { createContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "./hooks/useLocalStorage";

const defaultUser = "";
export const UserContext = createContext(defaultUser);

export const UserProvider = ({ children }) => {
  const [user, saveUser] = useLocalStorage("hackathon-user", defaultUser);

  useEffect(() => {
    if (!user || user === "") {
      console.log("Generating user id");
      saveUser(uuidv4());
    }
  }, [user, saveUser]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
