import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import "./Layout.css";
import { setAllTodoDefault } from "../../../Slices/todoSlice/todoSlice";
import { setAllUserDefault } from "../../../Slices/userSlice/userSlice";
import { ThemeContext } from "../../../Context/ThemeContext";
import { useThemeContext } from "../../../Hooks/useThemeContext";

export const Layout = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLight, changeTheme } = useThemeContext();

  const LogOut = () => {
    dispatch(setAllTodoDefault());
    dispatch(setAllUserDefault());
    navigate("/login");
  };

  return (
    <div className="full-screen-wrapper p-3">
      <header className="header">
        <button onClick={() => changeTheme()}>
          сменить тему оформления {`${isLight}`}
        </button>
        <p className="header_login">
          {currentUser?.login && <span className="header_label">логин: </span>}
          {currentUser?.login}
        </p>
        {currentUser?.login && (
          <button className="form_btn-redirect" onClick={LogOut}>
            Выйти
          </button>
        )}
        {location.pathname === "/register" && (
          <NavLink className="form_btn-redirect" to={"login"}>
            уже есть аккаунт
          </NavLink>
        )}
        {location.pathname === "/login" && (
          <NavLink className="form_btn-redirect" to={"register"}>
            зарегистрироваться
          </NavLink>
        )}
      </header>
      <Outlet />
    </div>
  );
};
