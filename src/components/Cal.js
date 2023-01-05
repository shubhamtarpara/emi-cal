import React, { useState } from "react";
import "./cal.css";
import "rsuite/dist/rsuite.min.css";

const Cal = () => {
  //   const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [year, setYear] = useState(0);
  const [interest, setInterest] = useState(0);
  const [time, setTime] = useState("");
  const [monthlyInterest, setMonthlyInterest] = useState();
  const [result, setResult] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
  };
  function calculateEMI() {
    const r = interest / (12 * 100);
    const month = year * 12;
    const emi =
      (amount * r * Math.pow(1 + r, month)) / (Math.pow(1 + r, month) - 1);
    const result = emi.toFixed(0);
    setResult(result);
    console.log(result);
  }

  const calculateMonthlyInterest = () => {
    const rate = interest * 0.1;
    const n = year * 12;
    const monthlyInterest = (amount * rate) / n;
    const monthlyPayment = monthlyInterest.toFixed(0);
    setMonthlyInterest(monthlyPayment);
    console.log(n);
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="slider-container">
          <div>Loan Amount</div>
          <input
            label="What is the principal?"
            variant="outlined"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="slider-container">
          <div>Tenure (Years)</div>
          <input
            label="How many years?"
            variant="outlined"
            type="number"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="slider-container m-b">
          <div>Interest Rate (% P.A.)</div>
          <input
            label="Annual Interest rate?"
            variant="outlined"
            type="number"
            onChange={(e) => setInterest(e.target.value)}
          />
        </div>
        <div className="result ">
          <button
            variant="contained"
            className="button"
            onClick={() => {
              calculateEMI();
              calculateMonthlyInterest();
            }}
          >
            Calculate
          </button>
          <div>Loan EMI</div>
          <div style={{ fontSize: "30px" }} className="d-flex">
            {monthlyInterest} Interest <br />
            {result} RS
          </div>
        </div>
      </form>
    </>
  );
};

export default Cal;
