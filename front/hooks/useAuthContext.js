import { AuthContext } from "root/context/authContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("context used outside of context provider");
  }

  return context;
};
