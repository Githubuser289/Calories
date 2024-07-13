import { Helmet } from "react-helmet";
import "./Registration.css";

export default function Register() {
  return (
    <div>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <p className="registertxt">REGISTRATION</p>
      <form className="registerform" action="">
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
            Register
          </button>
          <button className="reversebtn">Log in</button>
        </div>
      </form>
    </div>
  );
}
