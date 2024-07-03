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
import { Wrapper } from "../../../UIKit/Wrapper";
import { Input } from "../../../UIKit/Input";

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
        <Wrapper className="form-block">
          <p className="form-title">регистриция</p>
          <form
            className="form-block_form"
            onSubmit={handleSubmit(formOnSubmitHandler)}
          >
            <Input
              className={"form_input"}
              inputType="text"
              placeholder="login"
              register={{ ...register("login") }}
            />
            <Input
              className={"form_input password_input"}
              inputType="password"
              placeholder="password"
              register={{ ...register("password") }}
            />
            <Input
              inputType="btn"
              className={"form_submit_btn"}
              onClick={handleSubmit(formOnSubmitHandler)}
            >
              отправить
            </Input>
          </form>
        </Wrapper>
      </div>
    </>
  );
};

// type Props = {
//   input: {
//    name?: string
//    onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
//    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
//    type?: InputProps['type']
//    value: string
//   }
//   className?: string
//   label?: string
//   maxLength?: number
//   meta?: { error?: string; touched?: boolean }
//   number?: boolean
//   placeholder?: string
//   readOnly?: boolean
//   required?: boolean
//  }

//  export default function TextInput({
//   input,
//   className,
//   label,
//   placeholder = '',
//   readOnly = false,
//   required,
//   maxLength,
//   meta,
//   number = false,
//  }: Props) {
//   const length = input.value?.length
//   const title = maxLength && length && !readOnly ? `${length}/${maxLength}` : ''
//   const type = number ? 'number' : input.type

//   return (
//    <FormGroup {...meta} className={className} label={label} required={required}>
//     {type === 'textarea' ? (
//      <TextareaAutosize
//       {...input}
//       value={input.value ?? ''}
//       aria-label={label}
//       autoComplete="new-password"
//       className="col"
//       placeholder={placeholder}
//       readOnly={readOnly}
//       title={title}
//      />
//     ) : (
//      <Input
//       {...input}
//       value={input.value ?? ''}
//       aria-label={label}
//       autoComplete="new-password"
//       className="col"
//       placeholder={placeholder}
//       readOnly={readOnly}
//       title={title}
//       type={type}
//      />
//     )}
//    </FormGroup>
//   )
//  }
