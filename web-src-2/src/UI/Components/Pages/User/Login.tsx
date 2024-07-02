import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from "../../../../store";
import {
  getCookie,
  loginUser,
  setDefaultError,
} from "../../../../Slices/userSlice/userSlice";
import { UserData } from "../../../../Slices/userSlice/userApi";
import { useThemeContext } from "../../../../Hooks/useThemeContext";

export const Login = () => {
  const { error } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  const redirectOnClick = () => {
    navigate("/register");
  };

  const { register, handleSubmit } = useForm<UserData>({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const formOnSubmitHandler = (data: UserData) => {
    (async () => {
      const query = await dispatch(loginUser(data));
      query.meta.requestStatus === "fulfilled" && navigate("/");
    })();
  };

  return (
    <>
      {error}
      <div className="form-page">
        <div className={`form-block ${theme === "dark" && "dark_in_big"}`}>
          <p className={`form-title ${theme === "dark" && "text_dark"}`}>войти</p>
          <form
            className="form-block_form"
            onSubmit={handleSubmit(formOnSubmitHandler)}
          >
            <input
              className={`form_input ${theme === "dark" && "dark_out_small text_dark"}`}
              type="text"
              placeholder="login"
              {...register("login")}
            />
            <input
              className={`form_input password_input ${theme === "dark" && "dark_out_small text_dark"}`}
              type="password"
              placeholder="password"
              {...register("password")}
            />
            <button
              className={`form_submit_btn ${theme === "dark" && "dark_out_small text_dark"}`}
              onClick={handleSubmit(formOnSubmitHandler)}
            >
              отправить
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
