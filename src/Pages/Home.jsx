import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import "./Home.css";
import Modal from "../Components/Layout/Modal";

export default function Home() {
  const [show, setShowModal] = useState(true);
  // const [modalContent, setModalContent] = useState("");
  const [modalContent, setModalContent] = useState({
    calories: 0,
    foods: ["ala", "bala", "portocala", "lim", "pom", "plici"],
  });
  const [bloodType, setBloodType] = useState(null);

  const heightRef = useRef();
  const ageRef = useRef();
  const weightRef = useRef();
  const dweightRef = useRef();

  const showModal = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const handleBloodTypeChange = (event) => {
    setBloodType(event.target.value);
  };

  const submitDataAndShowModal = async (event) => {
    event.preventDefault();

    const height = heightRef.current.value;
    const age = ageRef.current.value;
    const weight = weightRef.current.value;
    const dweight = dweightRef.current.value;

    console.log("Height:", height);
    console.log("Age:", age);
    console.log("Current weight:", weight);
    console.log("Desirable weight:", dweight);
    console.log("Blood type:", bloodType);

    // ****************************
    // Trimiterea datelor la server
    // try {
    // const response = await fetch("URL_SERVER", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     height,
    //     age,
    //     weight,
    //     dweight,
    //     bloodType,
    //   }),
    // });

    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }

    // const data = await response.json();
    // setModalContent(`Calories per day: ${data.calories}`);
    // setModalContent({
    //   calories: 0,
    //   foods: ["ala", "bala", "portocala"],
    // });
    showModal();

    // Resetează valorile inputurilor
    heightRef.current.value = "";
    ageRef.current.value = "";
    weightRef.current.value = "";
    dweightRef.current.value = "";
    setBloodType(null);
    // } catch (error) {
    //   console.error("There was a problem with the fetch operation:", error);
    // }
  };

  return (
    <div className="homediv">
      <Helmet>
        <title>SlimMom</title>
      </Helmet>
      <div className="textdiv">
        <p className="title1">Calculate your daily calorie intake right now</p>
        <form className="homeform" onSubmit={submitDataAndShowModal}>
          <div className="bigdiv">
            <div className="labelinput">
              <label htmlFor="height">Height *</label>
              <br />
              <input
                className="inputline"
                type="number"
                name="height"
                id="height"
                min="120"
                max="220"
                ref={heightRef}
                required
              />
            </div>
            <div className="labelinput">
              <label htmlFor="age">Age *</label>
              <br />
              <input
                className="inputline"
                type="number"
                name="age"
                id="age"
                min="18"
                max="80"
                ref={ageRef}
                required
              />
            </div>
            <div className="labelinput">
              <label htmlFor="weight">Current weight *</label>
              <br />
              <input
                className="inputline"
                type="number"
                name="weight"
                id="weight"
                min="50"
                max="180"
                ref={weightRef}
                required
              />
            </div>
            <div className="labelinput">
              <label htmlFor="dweight">Desirable weight *</label>
              <br />
              <input
                className="inputline"
                type="number"
                name="dweight"
                id="dweight"
                min="40"
                max="170"
                ref={dweightRef}
                required
              />
            </div>
            <div>
              <label>Blood type *</label>
              <br />
              <div className="radiodiv">
                <input
                  type="radio"
                  id="bt1"
                  name="btype"
                  value="1"
                  onChange={handleBloodTypeChange}
                  checked={bloodType === "1"}
                />
                <label htmlFor="bt1"> 1</label>
                <input
                  type="radio"
                  id="bt2"
                  name="btype"
                  value="2"
                  onChange={handleBloodTypeChange}
                  checked={bloodType === "2"}
                />
                <label htmlFor="bt2"> 2</label>
                <input
                  type="radio"
                  id="bt3"
                  name="btype"
                  value="3"
                  onChange={handleBloodTypeChange}
                  checked={bloodType === "3"}
                />
                <label htmlFor="bt3"> 3</label>
                <input
                  type="radio"
                  id="bt4"
                  name="btype"
                  value="4"
                  onChange={handleBloodTypeChange}
                  checked={bloodType === "4"}
                />
                <label htmlFor="bt4"> 4</label>
              </div>
            </div>
          </div>
          <button className="start" type="submit">
            Start losing weight
          </button>
        </form>
      </div>
      <Modal show={show} handleClose={hideModal}>
        {{ calories: modalContent.calories, foods: modalContent.foods }}
      </Modal>
    </div>
  );
}
