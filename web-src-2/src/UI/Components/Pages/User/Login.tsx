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
  const { currentUser, error } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (error) {
  //     console.log("error");
  //   }
  //   //тут можно будет потом нарисовать какое-нибудь уведомление
  // }, [error]);

  useEffect(() => {
    if (currentUser) {
      dispatch(setDefaultError());
      navigate("/");
    } else {
      dispatch(getCookie());
    }
  }, [currentUser, navigate, dispatch]);

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
    dispatch(loginUser(data));
  };

  return (
    <>
      {error}
      <div className="form-page">
        <button className="form_btn-redirect" onClick={redirectOnClick}>
          создать новый аккаунт
        </button>
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
              className="form_input"
              type="text"
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
      new login/password
    </>
  );
};
