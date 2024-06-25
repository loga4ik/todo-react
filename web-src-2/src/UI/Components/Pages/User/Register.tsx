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

export const Register = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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
        <div className="form-block">
          <div className="form-title">регистриция</div>
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
    </>
  );
};
