import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

const Modal = ({ show, handleClose, children }) => {
  const navigate = useNavigate();
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (show) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [show, handleClose]);

  const handleOutsideClick = (event) => {
    if (
      typeof event.target.className === "string" &&
      event.target.className.includes("modal display-block")
    ) {
      handleClose();
    }
  };

  const handleRedirect = () => {
    navigate("/registration");
  };

  return (
    <div className={showHideClassName} onClick={handleOutsideClick}>
      <section className="modal-main">
        <button className="close-button" onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <line
              x1="1"
              y1="1"
              x2="23"
              y2="23"
              stroke="black"
              strokeWidth="2"
            />
            <line
              x1="23"
              y1="1"
              x2="1"
              y2="23"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        </button>
        <p className="title2"> Your recommended daily calorie intake is</p>
        <p className="calorieIntake">{children.calories} cal</p>
        <p className="title3">Foods you should not eat</p>
        <ol className="foodsList">
          {children.foods.map((food, index) => (
            <li key={index}>{food}</li>
          ))}
        </ol>
        <button className="start" type="submit" onClick={handleRedirect}>
          Start losing weight
        </button>
      </section>
    </div>
  );
};

export default Modal;
