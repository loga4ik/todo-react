import React, { useEffect } from "react";
import "./form.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../store";
import {
  registerUser,
  setDefaultError,
} from "../../../../Slices/userSlice/userSlice";
import { UserData } from "../../../../Slices/userSlice/userApi";
import { useThemeContext } from "../../../../Hooks/useThemeContext";

export const Register = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useThemeContext();

  useEffect(() => {
    if (currentUser) {
      dispatch(setDefaultError());
      navigate("/");
    }
  }, [currentUser, navigate, dispatch]);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
    //тут можно будет потом нарисовать какое-нибудь уведомление
  }, [currentUser, navigate]);

  const { register, handleSubmit } = useForm<UserData>({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const formOnSubmitHandler = (data: UserData) => {
    dispatch(registerUser(data));
  };

  return (
    <>
      <div className="form-page">
        <div className={`form-block ${theme === "dark" && "dark_in_big"}`}>
          <p className={`form-title ${theme === "dark" && "text_dark"}`}>регистриция</p>
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
