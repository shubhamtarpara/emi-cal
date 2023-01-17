import React, { useState } from 'react';
import './cal.css';
import { Table } from 'evergreen-ui';
// import 'rsuite/dist/rsuite.min.css';

const Cal = () => {
  //   const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [year, setYear] = useState(0);
  const [interest, setInterest] = useState(0);
  const [monthlyInterest, setMonthlyInterest] = useState(0);
  const [monthlyEmi, setMonthlyEmi] = useState(0);
  const [outStandingBalance, setoutStandingBalance] = useState(0);
  const [monthlyPrincipal, setMonthlyPrincipal] = useState(0);
  const [tableData, setTableData] = useState([]);

  const generateTableData = () => {
    const data = [];
    const times = year * 12;
    let amt = amount;
    let balance = outStandingBalance;
    for (let i = 1; i <= times; i++) {
      const values = calculate(amt);
      // console.log(amt, 'line 24 amt');
      const {
        monthlyInterest,
        monthlyPrincipalAmount,
        monthlyOutstandingBalance,
      } = values;
      const obj = {
        month: i,
        monthlyEmi,
        monthlyPrincipalAmount,
        monthlyInterest,
        monthlyOutstandingBalance,
      };
      data.push(obj);

      balance = monthlyOutstandingBalance;
      amt = balance;
    }

    setTableData(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  function calculate(amt) {
    const calculatedValue = {
      monthlyInterest: 0,
      monthlyPrincipalAmount: 0,
      monthlyOutstandingBalance: 0,
      // monthlyEmi: 0,
    };

    const r = interest / (12 * 100);
    const month = year * 12;
    const emi =
      (amount * r * Math.pow(1 + r, month)) / (Math.pow(1 + r, month) - 1);
    const monthlyEmi = emi.toFixed(0); // calculate monthly EMI
    // setMonthlyEmi(monthlyEmi);
    calculatedValue.monthlyEmi = monthlyEmi;
    // console.log(monthlyEmi, 'monthlyEmi1');

    const rate = interest * 0.01;
    const n = year * 12;
    const monthlyInterestPayment = (amt * rate) / n;
    const monthlyInterest = monthlyInterestPayment.toFixed(0); // calculate monthly INTEREST
    // setMonthlyInterest(monthlyInterest);
    calculatedValue.monthlyInterest = monthlyInterest;

    const principal = monthlyEmi - monthlyInterest;
    const monthlyPrincipalAmount = +principal.toFixed(0); // calculate monthly PRINCIPAL
    // setMonthlyPrincipal(monthlyPrincipalAmount);
    calculatedValue.monthlyPrincipalAmount = monthlyPrincipalAmount;
    // console.log(monthlyInterest, 'monthlyInterest');
    // console.log(monthlyEmi, 'monthlyEmi');

    const outStandingBalanceAmount = amt - monthlyPrincipalAmount;
    const monthlyOutstandingBalance = +outStandingBalanceAmount.toFixed(0); // calculate monthly OUTSTANDING BALANCE
    // setoutStandingBalance(monthlyOutstandingBalance);
    calculatedValue.monthlyOutstandingBalance = monthlyOutstandingBalance;

    return calculatedValue;
  }

  // useEffect(() => {});
  console.log(tableData);
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="main-container-lable">
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
        </div>

        <div className="result">
          <div className="d-flex">
            <div className="result-box">
              <p>Monthly Interest</p>
              <sup>&#8377;</sup>
              {monthlyInterest}
            </div>

            <div className="result-box">
              <p>Monthly EMI</p>
              <sup>&#8377;</sup>
              {monthlyEmi}
            </div>

            <div className="result-box">
              <p>Monthly Principal Paid</p>
              <sup>&#8377;</sup>
              {monthlyPrincipal}
            </div>
            <div className="result-box">
              <p>Outstanding Balance</p>
              <sup>&#8377;</sup>
              {outStandingBalance}
            </div>
          </div>
        </div>
      </form>
      <button
        className="button"
        onClick={() => {
          const values = calculate(amount);
          // console.log(amount);
          const {
            monthlyInterest,
            monthlyPrincipalAmount,
            monthlyOutstandingBalance,
            monthlyEmi,
          } = values;
          // console.log(values);
          generateTableData();
          setMonthlyInterest(monthlyInterest);
          setMonthlyPrincipal(monthlyPrincipalAmount);
          setoutStandingBalance(monthlyOutstandingBalance);
          setMonthlyEmi(monthlyEmi);
        }}
      >
        Calculate
      </button>
      <Table className="table-data">
        <Table.Head>
          <Table.TextHeaderCell>Month</Table.TextHeaderCell>
          {/* <Table.TextHeaderCell>Previous</Table.TextHeaderCell> */}
          <Table.TextHeaderCell>EMI </Table.TextHeaderCell>
          <Table.TextHeaderCell>Principal</Table.TextHeaderCell>
          <Table.TextHeaderCell>Monthly Interest</Table.TextHeaderCell>
          <Table.TextHeaderCell>Outstanding Balance</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {tableData.map((item, index) => {
            return (
              <Table.Row key={index}>
                <Table.TextCell>{index + 1}</Table.TextCell>
                {/* <Table.TextCell>{prev}</Table.TextCell> */}
                <Table.TextCell>{item.monthlyEmi}</Table.TextCell>
                <Table.TextCell>{item.monthlyPrincipalAmount}</Table.TextCell>
                <Table.TextCell>{item.monthlyInterest}</Table.TextCell>
                <Table.TextCell>
                  {item.monthlyOutstandingBalance}
                </Table.TextCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default Cal;
