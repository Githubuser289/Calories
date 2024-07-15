import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

const Modal = ({ show, handleClose, children }) => {
  const navigate = useNavigate();
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [calories, setCalories] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (show) {
      setLoading(true);
      getDataFromServer();
    }
  }, [show]);

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

  const getDataFromServer = async () => {
    try {
      const { height, age, weight, dweight, bloodType } = children;
      const response = await fetch("http://localhost:3000/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          height,
          age,
          currentWeight: weight,
          desiredWeight: dweight,
          bloodType,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCalories(Math.round(data.dailyCalIntake)); // Rotunjirea valorii
      setFoods(data.foodNotRcmnded);
      setLoading(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setLoading(false);
    }
  };

  return (
    <div className={showHideClassName} onClick={handleOutsideClick}>
      {loading && <p>Calculating...</p>}
      {!loading && (
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
          <p className="calorieIntake">{calories} cal</p>
          <p className="title3">Foods you should not eat</p>
          <ol className="foodsList">
            {foods.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ol>
          <button className="start" type="submit" onClick={handleRedirect}>
            Start losing weight
          </button>
        </section>
      )}
    </div>
  );
};

export default Modal;
