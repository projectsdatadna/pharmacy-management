import React, { useEffect, useState, Fragment } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from 'axios';

// Mock data
const expenses = [
  {
    _id: "1",
    name: "Office Supplies",
    department: { name: "Administration" },
    amount: 150,
    description: "Pens, paper, and other office supplies",
    fromDate: "2024-01-01",
    to: "2024-01-31",
    paid: "Paid",
  },
  {
    _id: "2",
    name: "Travel Expenses",
    department: { name: "Sales" },
    amount: 300,
    description: "Client meetings and travel",
    fromDate: "2024-02-01",
    to: "2024-02-28",
    paid: "Pending",
  },
  {
    _id: "3",
    name: "Software Licenses",
    department: { name: "IT" },
    amount: 500,
    description: "Annual subscription for various software tools",
    fromDate: "2024-03-01",
    to: "2024-03-31",
    paid: "Paid",
  },
  {
    _id: "4",
    name: "Training and Development",
    department: { name: "Human Resources" },
    amount: 200,
    description: "Employee training sessions and workshops",
    fromDate: "2024-04-01",
    to: "2024-04-30",
    paid: "Pending",
  },
  {
    _id: "5",
    name: "Marketing Campaign",
    department: { name: "Marketing" },
    amount: 800,
    description: "Social media and online advertising",
    fromDate: "2024-05-01",
    to: "2024-05-31",
    paid: "Paid",
  },
  {
    _id: "6",
    name: "Utilities",
    department: { name: "Facilities" },
    amount: 250,
    description: "Electricity, water, and other utility bills",
    fromDate: "2024-06-01",
    to: "2024-06-30",
    paid: "Pending",
  },
  {
    _id: "7",
    name: "Consulting Fees",
    department: { name: "Finance" },
    amount: 400,
    description: "Consulting services for financial audit",
    fromDate: "2024-07-01",
    to: "2024-07-31",
    paid: "Paid",
  },
];
const ListExpenses = () => {
  const deleteHandler = async (expenseId) => {
    try {
      await axios.delete(`https://us-central1-hospital-management-23dbf.cloudfunctions.net/api/delete-expense/${expenseId}`);
      // After successful deletion, update the expenses state by filtering out the deleted expense
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== expenseId)
      );
    } catch (error) {
      console.error('Error deleting expense: ', error);
    }
  };

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('https://us-central1-hospital-management-23dbf.cloudfunctions.net/api/get-expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses: ', error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <Layout
      title="Profile"
      description="list treatment categories"
      className="container-fluid"
    >
      <h4>
        <Link to="/add-expenses" className="btn btn-outline-primary">
          Add Expense
        </Link>
      </h4>

      <h2 className="mb-4">List Expenses</h2>
      {expenses.length === 0 ? (
        <div className="row">
          <div className="d-flex justify-content-center">
            <table className="table table-bordered table-hover table-lr">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">name</th>
                  <th scope="col">PatientId</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Paid</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Description</th>
                  <th scope="col">Date</th>
                  {/* <th scope="col">Status</th> */}
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">No Data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-sm-9">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">name</th>
                  <th scope="col">PatientId</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Paid</th>
                  <th scope="col">Balance</th>
                  {/* <th scope="col">Description</th> */}
                  <th scope="col">Date</th>
                  {/* <th scope="col">Status</th> */}
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {expenses &&
                  expenses.map((expense, i) => (
                    <tr key={i}>
                      <Fragment>
                      <th scope="row">{expense._id}</th>
                      <td>{expense.PatientName}</td>
                      <td>{expense.patientId}</td>
                      <td>{expense.totalAmount}</td>
                      <td>{[expense.Paid , expense.paid]}</td>
                      <td>{[expense.Balance, expense.balance]}</td>
                      {/* <td>{expense.description}</td> */}
                      <td>{moment(expense.date).format("YYYY-MM-DD")}</td>
                      <td>
                        <Link to={`/update-expenses/${expense.patientId}`}>
                          <i className="bi bi-pencil-square" />
                        </Link>
                      </td>
                      <td>
                        <i
                          className="bi bi-trash"
                          onClick={() => deleteHandler(expense._id)}
                        />
                      </td>
                      </Fragment>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
};
export { expenses };
export default ListExpenses;
