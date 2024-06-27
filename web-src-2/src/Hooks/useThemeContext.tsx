import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

export const useThemeContext = () => {
  const { isLight, setIsLight } = useContext(ThemeContext);
  const changeTheme = () => {
    setIsLight(!isLight);
  };
  return { isLight, changeTheme };
};
