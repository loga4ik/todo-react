import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import "./Layout.css";
import { setAllTodoDefault } from "../../../Slices/todoSlice/todoSlice";
import { setAllUserDefault } from "../../../Slices/userSlice/userSlice";
import { useThemeContext } from "../../../Hooks/useThemeContext";
import { ThemeSwitcher } from "../../UIKit/themeSwicher/ThemeSwitcher";
import { Input } from "../../UIKit/Input";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { ThemeContext } from "../../../Context/ThemeContext";

export const Layout = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { theme } = useContext(ThemeContext);

  const LogOut = () => {
    dispatch(setAllTodoDefault());
    dispatch(setAllUserDefault());
    navigate("/login");
  };

  return (
    <div
      className={`full-screen-wrapper p-3 ${
        theme === "dark" ? "bg_dark text_dark" : "text_light"
      }`}
    >
      <header className="header">
        <ThemeSwitcher />
        <p className={`header_login`}>
          {currentUser?.login && <span className="header_label">логин: </span>}
          {currentUser?.login}
        </p>
        {currentUser?.login && (
          <Input
            inputType="btn"
            className={"form_btn-redirect"}
            onClick={LogOut}
          >
            Выйти
          </Input>
        )}
        {location.pathname === "/register" && (
          <NavLink
            className={`form_btn-redirect ${
              theme === "dark" && "dark_out_small  text_dark"
            }`}
            to={"login"}
          >
            уже есть аккаунт
          </NavLink>
        )}
        {location.pathname === "/login" && (
          <NavLink
            className={`form_btn-redirect ${
              theme === "dark" && "dark_out_small text_dark"
            }`}
            to={"register"}
          >
            зарегистрироваться
          </NavLink>
        )}
      </header>
      <Outlet />
    </div>
  );
};
