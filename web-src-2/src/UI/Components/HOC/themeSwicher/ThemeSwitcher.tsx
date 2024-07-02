import React from "react";
import { useThemeContext } from "../../../../Hooks/useThemeContext";
import "./ThemeSwitcher.css";
export const ThemeSwitcher = () => {
  const { theme, changeTheme } = useThemeContext();

  return (
    <button
      className={`switch_btn ${theme === 'dark' && "dark_out_small flex_reverse"}`}
      onClick={() => changeTheme()}
    >
      <p className={`switcher_text ${theme === 'dark' && "text_dark"}`}>
        {theme === 'dark'  ? "Dark" : "Light"}
      </p>
      <span className={`switch_icon ${theme === 'dark'  ? "dark bg_dark" : "light"}`} />
    </button>
  );
};
