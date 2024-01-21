import { useState } from "react";
import { setCookie } from "nookies";
import dotenv from "dotenv";
import { useDispatch } from "react-redux";
import { signIn as sign_in } from "root/store/userSlice";
import axios from "axios";
dotenv.config();

export const useSignIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const dispatch = useDispatch();

  const signIn = async (email, password) => {
    setIsLoading(true);
    setError(false);

    try {
      const response = await axios.post(
        `/user/signIn`,
        { email, password },
        { headers: { "Content-type": "application/json" } }
      );

      const json = response.data;
      localStorage.setItem("user", json);
      dispatch(sign_in(json));
      setCookie(null, "auth-token", json.token, {
        path: "/",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60, // expires in 3 days
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };

  return { signIn, isLoading, error };
};
