import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

export const useThemeContext = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const changeTheme = () => {
    setIsDark(!isDark);
  };
  return { isDark, changeTheme };
};
