import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userSlice from "./Slices/userSlice/userSlice";
import todoSlice from "./Slices/todoSlice/todoSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    todo: todoSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
