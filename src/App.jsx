import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./Components/PrivateRoute"; // Importăm PrivateRoute

import "./App.css";

const HomePage = lazy(() => import("./Pages/Home"));
const RegistrationPage = lazy(() => import("./Pages/Registration"));
const LoginPage = lazy(() => import("./Pages/Login"));
const DashboardPage = lazy(() => import("./Pages/Dashboard"));

function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="registration" element={<RegistrationPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route
                path="dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </UserProvider>
  );
}

export default App;
