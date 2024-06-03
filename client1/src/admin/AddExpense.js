import React, { useState } from "react";
import Layout from "../core/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const AddExpense = () => {
  // const [name, setName] = useState("");
  // const [department, setDepartment] = useState("");
  // const [amount, setAmount] = useState(0);
  // const [description, setDescription] = useState("");
  // const [date, setDate] = useState(new Date());
  // const [to, setTo] = useState(new Date());
  // const [paid, setPaid] = useState("Un-paid");
  // const[pays,setPays] = useState ("");

  // // Mock data for departments and pay status
  // const departments = [
  //   { _id: "1", name: "Administration" },
  //   { _id: "2", name: "Sales" },
  //   { _id: "3", name: "IT" },
  // ];

  

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   // dispatch(
  //   //   createExpenses({
  //   //     name,
  //   //     department,
  //   //     amount,
  //   //     description,
  //   //     fromDate,
  //   //     to,
  //   //     paid,
  //   //   })
  //   // );
  // };

  const [PatientName, setPatientName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [Paid, setPaid] = useState('');
  const [Balance, setBalance] = useState('');
  const [patientId, setPatientId] = useState('');

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const expenseData = {
      PatientName,
      totalAmount: totalAmount,
      date: formatDate(date),
      description,
      Paid,
      Balance,
      patientId
    };

    axios.post('https://us-central1-hospital-management-23dbf.cloudfunctions.net/api/add-expense', expenseData)
      .then(response => {
        alert(response.data.message);
        // Clear form fields
        setPatientName('');
        setTotalAmount('');
        setDate(new Date());
        setDescription('');
        setPaid('');
        setBalance('');
        setPatientId('');
      })
      .catch(error => {
        console.error('Error adding expense: ', error);
      });
  };


  const addExpenseForm = () => (
    <div className="form-group col-md-12">
      <form onSubmit={submitHandler}>
        <div className="form-row">
          <div className="form-group col-md-2">
            <label className="font-weight-bold" htmlFor="inputAddress2">
              Name
            </label>
            <input
              type="text"
              className="form-control input-shadow"
              id="inputAddress2"
              placeholder="name"
              value={PatientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-1">
            <label className="font-weight-bold" htmlFor="inputAddress">
              Amount
            </label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="Amount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>
       
          <div className="form-group col-md-7">
            <label className="font-weight-bold" htmlFor="inputAddress">
              Date
            </label>
            <div className="input-container">
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="form-control input-shadow1"
            />
             <div className="icon-container">
            
            <i className="fa fa-calendar" style={{color:"blue"}}></i>
    
          </div>
          </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label className="font-weight-bold" htmlFor="exampleFormControlTextarea1">
              Description
            </label>
            <textarea
              className="form-control input-bg-light-grey input-shadow3"
              id="exampleFormControlTextarea1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a description"
              rows="3"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <div className="form-group col-md-7">
              <label className="font-weight-bold" htmlFor="exampleFormControlSelect1">
                Total Paid
              </label>
              <input
                type="text"
                className="form-control  input-shadow"
                placeholder="Amount"
                value={Paid}
                onChange={(e) => setPaid(e.target.value)}
              />
            </div>
            <div className="form-group col-md-7">
            <label className="font-weight-bold" htmlFor="balance">
              Balance
            </label>
            <input
              type="text"
              className="form-control  input-shadow"
              id="balance"
              placeholder="Balance"
              value={Balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
         
          <div className="form-group col-md-7">
            <label className="font-weight-bold" htmlFor="patientId">
              Patient ID
            </label>
            <input
              type="text"
              className="form-control  input-shadow"
              id="patientId"
              placeholder="Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
          </div>
        </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{width:"10%",textAlign:"center"}}>Save</button>
      </form>
    </div>
  );

  return (
    <Layout title="Category Treatment Form">
      <>
        <h2 className="mb-4">Add Expense</h2>
        {addExpenseForm()}
      </>
    </Layout>
  );
};

export default AddExpense;
