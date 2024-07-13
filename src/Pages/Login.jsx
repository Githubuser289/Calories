import { Helmet } from "react-helmet";
import "./Login.css";

export default function Login() {
  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <p className="logintxt">LOG IN</p>
      <form className="loginform" action="">
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
          <button className="reversebtn">Register</button>
        </div>
      </form>
    </div>
  );
}
