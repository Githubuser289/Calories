import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import "./Dashboard.css";
import Modal from "../Components/Modal";
import axios from "axios";

export default function DashboardPage() {
  const [show, setShowModal] = useState(false);
  const [modalContent, setModalData] = useState({});
  const [bloodType, setBloodType] = useState(null);
  const [foods, setFoods] = useState(["Your diet will be displayed here"]);
  const [activeButton, setActiveButton] = useState("button1");
  const [dayList, setDayList] = useState([
    { name: "Amaranth", cal: 371 },
    { name: "Green buckwheat", cal: 295 },
    { name: "Muesli Bon", cal: 333 },
  ]);

  const heightRef = useRef();
  const ageRef = useRef();
  const weightRef = useRef();
  const dweightRef = useRef();

  let leftVal = 0;
  let consumedVal = 0;
  let dailyVal = 0;
  let percentVal = 0;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    const fetchConsumedProducts = async (date) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/day/${date}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("response ", response.data);
        let worklist = response.data.data;
        worklist.forEach((obj) => {
          obj.cal = generateRandomNumber();
        });
        setDayList(response.data.data || []);
      } catch (error) {
        console.error("Error fetching consumed products:", error);
        setDayList([]);
      }
    };
    console.log("useff selectedDate");
    fetchConsumedProducts(formatDate(selectedDate));
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}-${year}`;
  };

  const formatDate2 = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
  };

  const handleBloodTypeChange = (event) => {
    setBloodType(event.target.value);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const showModal = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const submitDataAndShowModal = async (event) => {
    event.preventDefault();

    const height = heightRef.current.value;
    const age = ageRef.current.value;
    const weight = weightRef.current.value;
    const dweight = dweightRef.current.value;
    setModalData({ height, age, weight, dweight, bloodType });

    try {
      const response = await axios.get("/api/day", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          height,
          age,
          currentWeight: weight,
          desiredWeight: dweight,
          bloodType,
        },
      });

      setFoods(response.data.foodNotRcmnded);
      dailyVal = response.data.dailyCalIntake;
    } catch (error) {
      console.error("Error fetching daily intake:", error);
    }

    heightRef.current.value = "";
    ageRef.current.value = "";
    weightRef.current.value = "";
    dweightRef.current.value = "";
    setBloodType(null);
    showModal();
  };

  const submitQuery = (event) => {
    event.preventDefault();
    console.log("query submitted");
  };

  function generateRandomNumber(min = 150, max = 500) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const calculateValues = () => {
    consumedVal = dayList.reduce((sum, product) => sum + product.amount, 0);
    leftVal = dailyVal - consumedVal;
    percentVal = (consumedVal / dailyVal) * 100;
  };

  // calculateValues();

  return (
    <>
      <div className="buttons">
        <div className="verticalseparator"></div>
        <button
          className={activeButton === "button1" ? "active" : ""}
          onClick={() => handleButtonClick("button1")}
        >
          DIARY
        </button>
        <button
          className={activeButton === "button2" ? "active" : ""}
          onClick={() => handleButtonClick("button2")}
        >
          CALCULATOR
        </button>
      </div>
      <div className="greybackground"></div>
      {activeButton === "button2" && (
        <div className="calculator">
          <p className="title5">
            Calculate your daily calorie intake right now
          </p>
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
      )}
      {activeButton === "button1" && (
        <div>
          <div className="date-picker-button">
            <span className="title4">{formatDate2(selectedDate)}</span>
            <button
              className="calndbtn"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <FaCalendarAlt />
            </button>
            {showDatePicker && (
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                onClickOutside={() => setShowDatePicker(false)}
                inline
              />
            )}
          </div>
          <form className="productinput" onSubmit={submitQuery}>
            <div className="labelinput">
              <label htmlFor="prname">Enter product name</label>
              <br />
              <input
                className="inputline"
                type="text"
                name="prname"
                id="prname"
                required
              />
            </div>
            <div className="labelinput2">
              <label htmlFor="grams">Grams</label>
              <br />
              <input
                className="inputline2"
                type="number"
                name="grams"
                id="grams"
                required
              />
            </div>
            <button className="round-button">+</button>
          </form>

          <div className="food-list">
            {dayList.map((food, index) => (
              <div key={index} className="food-item">
                <div className="food-name">{food.name}</div>
                <div className="food-amount">{food.amount} g</div>
                <div className="food-cal">{food.cal} kcal</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="summary">
        <div>
          <p className="stitle">Summary for {formatDate2(selectedDate)}</p>
          <div className="line">
            <p>Left</p>
            <p>{leftVal} kcal</p>
          </div>
          <div className="line">
            <p>Consumed</p>
            <p>{consumedVal} kcal</p>
          </div>
          <div className="line">
            <p>Daily rate</p>
            <p>{dailyVal} kcal</p>
          </div>
          <div className="line">
            <p>n% of normal</p>
            <p>{percentVal} kcal</p>
          </div>
        </div>

        <div className="space"></div>
        <div>
          <p className="stitle">Food not recommended</p>
          <ul className="foods">
            {foods.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        </div>
      </div>

      <Modal show={show} handleClose={hideModal}>
        {modalContent}
      </Modal>
    </>
  );
}
