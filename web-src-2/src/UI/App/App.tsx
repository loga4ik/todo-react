import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "../Components/Pages/Main/Main";
import { Register } from "../Components/Pages/User/Register";
import { Login } from "../Components/Pages/User/Login";
import { AimForm } from "../Components/Pages/CreateAim/AimForm";
import { Layout } from "../Components/HOC/Layout";

function App() {
//тут получу тему из localStorage
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/todo" element={<TodoList />} /> */}
          <Route path="/create-aim" element={<AimForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
