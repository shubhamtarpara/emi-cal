import React, { useState } from 'react';
import './cal.css';
import 'rsuite/dist/rsuite.min.css';

const Cal = () => {
  //   const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [year, setYear] = useState(0);
  const [interest, setInterest] = useState(0);
  const [time, setTime] = useState('');
  const [monthlyInterest, setMonthlyInterest] = useState();
  const [monthlyEmi, setMonthlyEmi] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
  };
  function calculateEMI() {
    const r = interest / (12 * 100);
    const month = year * 12;
    const emi =
      (amount * r * Math.pow(1 + r, month)) / (Math.pow(1 + r, month) - 1);
    let monthlyEmi = emi.toFixed(0);
    setMonthlyEmi(monthlyEmi);
    // console.log(monthlyEmi);
  }

  const calculateMonthlyInterest = () => {
    const rate = interest * 0.1;
    const n = year * 12;
    const monthlyInterestPayment = (amount * rate) / n;
    let monthlyInterest = monthlyInterestPayment.toFixed(0);
    setMonthlyInterest(monthlyInterest);
    // console.log(n);
  };
  const principal = monthlyEmi - monthlyInterest;
  const monthlyPrincipal = +principal.toFixed(0);

  const outstadingBalance = amount - monthlyPrincipal;
  const monthlyOutstandingBalance = +outstadingBalance.toFixed(0);

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="slider-container">
          <div className="input-label">Loan Amount</div>
          <input
            className="input"
            placeholder="What is the principal?"
            variant="outlined"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="slider-container">
          <div className="input-label">Tenure (Years)</div>
          <input
            className="input"
            placeholder="How many years?"
            variant="outlined"
            type="number"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="slider-container m-b">
          <div className="input-label">Interest Rate (% P.A.)</div>
          <input
            className="input"
            placeholder="Annual Interest rate?"
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
          <div className="d-flex">
            <div className="result-box">{monthlyInterest} </div> Monthly
            Interest <br />
            <div className="result-box"> {monthlyEmi} </div>
            Monthly EMI
            <br />
            <div className="result-box"> {monthlyPrincipal}</div>
            Monthly Principal Paid
            <div className="result-box">{monthlyOutstandingBalance} </div>
            Outstanding Balance
          </div>
        </div>
      </form>
      <table>
        <tbody></tbody>
      </table>
    </>
  );
};

export default Cal;
