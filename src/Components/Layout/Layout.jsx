import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import "./Layout.css";
import logoImg from "../../images/logo.png";
import leavesDesktop from "../../images/leaves-d.png";
import leavesTablet from "../../images/leaves-t.png";
import greyshapeDesktop from "../../images/greyshape-d.png";
import greyshapeTablet from "../../images/greyshape-t.png";
import bananaDesktop from "../../images/banana-d.png";
import bananaTablet from "../../images/banana-t.png";
import strawberryImg from "../../images/strawberry.png";
// import { useDispatch, useSelector } from "react-redux";
// import { selectIsLoggedIn, selectUser } from "../redux/selectors";
// import { logOut } from "../redux/operations";

export function Layout() {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const user = useSelector(selectUser);
  //   const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggedIn = false;
  let leavesImg, greyshapeImg, bananaImg;
  let isMobile = true;
  let isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  let isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  // const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  // const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
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

  function handleLogout() {
    // dispatch(logOut());
    // navigate("/");
    console.log("logout");
  }

  return (
    <div className="layout">
      <nav>
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
        {isDesktop && <div className="verticalseparator"></div>}
        {isLoggedIn ? (
          <div className="rightdiv">
            <div>{user.email}</div>
            <NavLink onClick={handleLogout}>Exit</NavLink>
          </div>
        ) : (
          <div className="rightdiv">
            <NavLink to="/login">LOG IN</NavLink>{" "}
            <NavLink to="/registration">REGISTRATION</NavLink>
          </div>
        )}
      </nav>
      <div className="background">
        <img className="leaves" src={leavesImg} alt="leaves" />
        <img className="greyshape" src={greyshapeImg} alt="greyshape" />
        <img className="banana" src={bananaImg} alt="banana" />
        <img className="strawberry" src={strawberryImg} alt="strawberry" />
        {/* <div className="whiteborder"></div> */}
      </div>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
