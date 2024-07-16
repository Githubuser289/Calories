import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import React, { Suspense, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import UserContext from "../../context/UserContext";
import "./Layout.css";
import logoImg from "../../images/logo.png";
import leavesDesktop from "../../images/leaves-d.png";
import leavesTablet from "../../images/leaves-t.png";
import greyshapeDesktop from "../../images/greyshape-d.png";
import greyshapeTablet from "../../images/greyshape-t.png";
import bananaDesktop from "../../images/banana-d.png";
import bananaTablet from "../../images/banana-t.png";
import strawberryImg from "../../images/strawberry.png";

export function Layout() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  let leavesImg, greyshapeImg, bananaImg;
  let isMobile = true;
  let isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  let isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  let navClass;

  if (isTablet) {
    isMobile = false;
    leavesImg = leavesTablet;
    greyshapeImg = greyshapeTablet;
    bananaImg = bananaTablet;
  }
  if (isDesktop) {
    isTablet = false;
    leavesImg = leavesDesktop;
    greyshapeImg = greyshapeDesktop;
    bananaImg = bananaDesktop;
  }

  if (isDesktop && user.isLoggedIn) {
    navClass = "logged";
  } else {
    navClass = "notlogged";
  }

  async function handleLogout() {
    try {
      const response = await fetch("/api/users/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        setUser({ email: "", isLoggedIn: false });
        navigate("/login");
        toast.success("Logout successful");
      } else {
        const data = await response.json();
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred during logout");
    }
  }

  return (
    <div className="layout">
      <nav className={navClass}>
        <div className="leftdiv">
          <NavLink to="/">
            <img className="logo" src={logoImg} alt="logo" />
          </NavLink>
          {(isTablet || isDesktop) && (
            <NavLink className="slimmom" to="/">
              <span className="slimtxt">Slim</span>
              <span className="momtxt">Mom</span>
            </NavLink>
          )}
        </div>
        {isDesktop && !user.isLoggedIn && (
          <div className="verticalseparator"></div>
        )}
        {user.isLoggedIn ? (
          <div className="rightdiv">
            <div className="user">{user.email}</div>
            <div className="verticalseparator"></div>
            <NavLink className="exit" to="/" onClick={handleLogout}>
              Exit
            </NavLink>
          </div>
        ) : (
          <div className="rightdiv">
            <NavLink to="/login">LOG IN</NavLink>
            <NavLink to="/registration">REGISTRATION</NavLink>
          </div>
        )}
      </nav>
      {!user.isLoggedIn && (
        <div className="background">
          <img className="leaves" src={leavesImg} alt="leaves" />
          <img className="greyshape" src={greyshapeImg} alt="greyshape" />
          <img className="banana" src={bananaImg} alt="banana" />
          <img className="strawberry" src={strawberryImg} alt="strawberry" />
        </div>
      )}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
