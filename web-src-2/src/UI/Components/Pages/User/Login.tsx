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

export const Login = () => {
  const { error } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
        <div className="form-block">
          <div className="form-title">войти</div>
          <form
            className="form-block_form"
            onSubmit={handleSubmit(formOnSubmitHandler)}
          >
            <input
              className="form_input"
              type="text"
              placeholder="login"
              {...register("login")}
            />
            <input
              className="form_input password_input"
              type="password"
              placeholder="password"
              {...register("password")}
            />
            <button
              className="form_submit_btn"
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
