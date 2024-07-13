import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";

import "./App.css";

const HomePage = lazy(() => import("./Pages/Home"));
const RegistrationPage = lazy(() => import("./Pages/Registration"));
const LoginPage = lazy(() => import("./Pages/Login"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
