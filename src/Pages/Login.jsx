import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext"; // Importăm useAuth
import UserContext from "../context/UserContext";
import "./Login.css";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { login } = useAuth(); // Utilizăm hook-ul useAuth

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // Trimitem datele la server
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      login(); // Setăm utilizatorul ca autentificat
      setUser({ email, isLoggedIn: true });
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error(data.message || "Login failed!");
    }
  };

  const goToRegistrationPage = (e) => {
    e.preventDefault();
    navigate("/registration");
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <p className="logintxt">LOG IN</p>
      <form className="loginform" onSubmit={handleSubmit}>
        <div className="logindiv">
          <div className="labelinput">
            <label htmlFor="email">Email *</label>
            <br />
            <input
              className="inputline"
              type="email"
              name="email"
              id="email"
              required
            />
          </div>
          <div className="labelinput">
            <label htmlFor="password">Password *</label>
            <br />
            <input
              className="inputline"
              type="password"
              name="password"
              id="password"
              required
            />
          </div>
        </div>
        <div className="buttonsdiv">
          <button className="normalbtn" type="submit">
            Log in
          </button>
          <button
            className="reversebtn"
            type="button"
            onClick={goToRegistrationPage}
          >
            Register
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
