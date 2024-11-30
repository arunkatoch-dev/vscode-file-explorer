import { useContext } from "react";
import { AppContext } from "../context/MainAppContext";

export const useMainContext = () => {
  const mainAppContext = useContext(AppContext);
  return mainAppContext;
};
