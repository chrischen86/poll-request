import { useEffect, useState } from "react";

const useDetectDarkMode = () => {
  const [mode, setMode] = useState(
    window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches
  );
  
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        setMode(event.matches);
      });
  }, []);

  return mode;
};

export default useDetectDarkMode;
