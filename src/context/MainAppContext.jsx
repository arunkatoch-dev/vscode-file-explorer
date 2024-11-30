import { createContext, useReducer } from "react";
import { mainReducer } from "../reducers/mainReducer";
import { mainState } from "../initialStates/mainState";
export const AppContext = createContext(null);

export const MainAppContextProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(mainReducer, mainState);
  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
