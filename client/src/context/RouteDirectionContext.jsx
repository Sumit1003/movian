import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Context
const RouteDirectionContext = createContext();

export const RouteDirectionProvider = ({ children }) => {
  const location = useLocation();
  const navigationType = useNavigationType(); // "PUSH", "POP", or "REPLACE"

  const historyStack = useRef([]);
  const [direction, setDirection] = useState("forward"); // "forward" | "backward"

  useEffect(() => {
    const currentPath = location.pathname;

    if (navigationType === "PUSH") {
      // Add new route to stack
      historyStack.current.push(currentPath);
      setDirection("forward");
    } else if (navigationType === "POP") {
      // Back navigation
      const lastPath = historyStack.current[historyStack.current.length - 2];
      if (lastPath === currentPath) {
        historyStack.current.pop();
      }
      setDirection("backward");
    }
  }, [location.pathname, navigationType]);

  return (
    <RouteDirectionContext.Provider value={{ direction }}>
      {children}
    </RouteDirectionContext.Provider>
  );
};

export const useRouteDirection = () => useContext(RouteDirectionContext);
