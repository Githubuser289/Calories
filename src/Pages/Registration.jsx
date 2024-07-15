import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Registration.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Registration successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  const goToLoginPage = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <ToastContainer />
      <p className="registertxt">REGISTRATION</p>
      <form className="registerform" onSubmit={handleRegister}>
        <div className="registerdiv">
          <div className="labelinput">
            <label htmlFor="name">Name *</label>
            <br />
            <input
              className="inputline"
              type="text"
              name="name"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="labelinput">
            <label htmlFor="email">Email *</label>
            <br />
            <input
              className="inputline"
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="buttonsdiv">
          <button className="normalbtn" type="submit">
            Register
          </button>
          <button className="reversebtn" type="button" onClick={goToLoginPage}>
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
