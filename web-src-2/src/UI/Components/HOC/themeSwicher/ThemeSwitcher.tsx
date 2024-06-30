import React from "react";
import { useThemeContext } from "../../../../Hooks/useThemeContext";
import "./ThemeSwitcher.css";
export const ThemeSwitcher = () => {
  const { isDark, changeTheme } = useThemeContext();

  return (
    <button
      className={`switch_btn ${isDark && "dark_out_smaill flex_reverse"}`}
      onClick={() => changeTheme()}
    >
      <p className={`switcher_text ${isDark && "text_dark"}`}>
        {isDark ? "Dark" : "Light"}
      </p>
      <span className={`switch_icon ${isDark ? "dark bg_dark" : "light"}`} />
    </button>
  );
};
