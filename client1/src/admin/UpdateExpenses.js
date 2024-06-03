import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useParams, useNavigate  } from "react-router-dom";
import { expenses } from "./ListExpenses";
import axios from 'axios';
// import { useHistory } from 'react-router-dom';

const UpdateExpenses = () => {
  // const { id } = useParams();

  // const [name, setName] = useState("");
  // const [department, setDepartment] = useState("");
  // const [amount, setAmount] = useState("");
  // const [description, setDescription] = useState("");
  // const [fromDate, setFromDate] = useState("");
  // const [to, setTo] = useState("");
  // const [paid, setPaid] = useState("");
  // const [balance, setBalance] = useState('');
  // const [patientId, setPatientId] = useState('');

  // // Mock data for departments and pay status
  // const departments = [
  //   { _id: "1", name: "Administration" },
  //   { _id: "2", name: "Sales" },
  //   { _id: "3", name: "IT" },
  // ];

  // const pays = ["Paid", "Un-paid", "Pending"];

  // useEffect(() => {
  //   const getExpenseById = (id) => {
  //     return expenses.find((expense) => expense._id === id);
  //   };
  //   const expense = getExpenseById(id);
  //   if (expense) {
  //     setName(expense.name);
  //     setDepartment(expense.department.name);
  //     setAmount(expense.amount);
  //     setDescription(expense.description);
  //     setFromDate(moment(expense.fromDate).format("YYYY-MM-DD"));
  //     setTo(moment(expense.to).format("YYYY-MM-DD"));
  //     setPaid(expense.paid);
  //   }
  // }, [id]);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   // dispatch(
  //   //   updateExpense({
  //   //     _id: id,
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

  const { patientId } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    PatientName: "",
    totalAmount: "",
    Description: "",
    Date: "",
    Paid: "",
    Balance: "",
    patientId: ""
  });

  useEffect(() => {
    console.log("Extracted patientId:", patientId);
    if (patientId) {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(`https://us-central1-hospital-management-23dbf.cloudfunctions.net/api/get-expense/${patientId}`);
        const expenseData = response.data;
        setExpense({
          ...expenseData,
          name: expenseData.PatientName || "",
          amount: expenseData.totalAmount || "",
          description: expenseData.Description || "",
          fromDate: expenseData.Date ? moment(expenseData.Date, "DD/MM/YYYY").toDate() : null,
          paid: expenseData.Paid || "",
          balance: expenseData.Balance || "",
          patientId: expenseData.patientId || ""
        });
      } catch (error) {
        console.error('Error fetching expense: ', error);
      }
    };

    fetchExpense();
  } else {
    console.error('No patientId found');
  }
  }, [patientId]);

  const handleChange = (e) => {
   
      const { name, value } = e.target;
      // Parse the value to a number before updating the state
      const parsedValue = name === 'Paid' || name === 'Balance' ? parseInt(value, 10) : value;
      setExpense((prevExpense) => ({ ...prevExpense, [name]: parsedValue }));
    
  };

  const handleDateChange = (date) => {
    setExpense((prevExpense) => ({ ...prevExpense, fromDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://us-central1-hospital-management-23dbf.cloudfunctions.net/api/update-expense/${expense.patientId}`,{
      ...expense,
      Date: expense.fromDate ? moment(expense.fromDate).format("DD/MM/YYYY") : null
    });
    } catch (error) {
      console.error('Error updating expense: ', error);
    }
  };


  const UpdateExpenseForm = () => (
    <div className="form-group col-md-12">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-2">
            <label className="font-weight-bold" htmlFor="inputAddress2">
              Name
            </label>
            <input
              type="text"
              className="form-control input-shadow"
              id="inputAddress2"
              placeholder="Name"
              value={expense.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-2">
            <label className="font-weight-bold" htmlFor="inputAddress">
              Total Amount
            </label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="Amount"
              value={expense.amount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <label className="font-weight-bold" htmlFor="inputAddress">
              Date
            </label>
            <div className="input-container">
            <DatePicker
               selected={expense.fromDate}
                onChange={handleDateChange}
                className="form-control input-shadow1"
              />
              <div className="icon-container">
            
            <i className="fa fa-calendar" style={{color:"blue"}}></i>
    
          </div>
        </div>
          </div>

          {/* <div className="form-group col-md-6">
            <label className="font-weight-bold" htmlFor="inputAddress">
              To date
            </label>

            <DatePicker
              value={to}
              onChange={(date) => setTo(moment(date).format("YYYY-MM-DD"))}
              className="form-control"
            />
          </div> */}
        </div>

        <div className="form-row">
          {/* <div className="form-group col-md-6">
            <label
              className="font-weight-bold"
              htmlFor="exampleFormControlSelect2"
            >
              Department
            </label>
            <select
              //   multiple
              value={department}
              className="form-control"
              id="exampleFormControlSelect2"
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments &&
                departments.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div> */}

          <div className="form-group col-md-3">
            <label
              className="font-weight-bold"
              htmlFor="exampleFormControlTextarea1"
            >
              Description
            </label>
            <textarea
                className="form-control input-bg-light-grey input-shadow3"
                id="description"
                name="description"
                value={expense.description}
                onChange={handleChange}
                placeholder="Write a description"
                rows="3"
              />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <div className="form-group">
              <label
                className="font-weight-bold"
                htmlFor="exampleFormControlSelect1"
              >
                Total Paid
              </label>
              <input
                type="text"
                className="form-control input-shadow"
                id="paid"
                name="paid"
                placeholder="Amount"
                value={expense.paid}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
            <label className="font-weight-bold" htmlFor="balance">
              Balance
            </label>
            <input
                type="text"
                className="form-control input-shadow"
                id="balance"
                name="balance"
                placeholder="Balance"
                value={expense.balance}
                onChange={handleChange}
              />
          </div>
          </div>
          <div className="form-row">
          <div className="form-group col-md-6">
            <label className="font-weight-bold" htmlFor="patientId">
              Patient ID
            </label>
            <input
                type="text"
                className="form-control input-shadow"
                id="patientId"
                name="patientId"
                placeholder="Patient ID"
                value={expense.patientId}
                onChange={handleChange}
              />
          </div>
        </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );

  return (
    <Layout title="Category Treatment Form">
      <>
        <h2 className="mb-4">Update Expense</h2>
        {UpdateExpenseForm()}
      </>
    </Layout>
  );
};
// const { patient_id } = useParams();
// const history = useHistory();
// const [expense, setExpense] = useState({});
// const [loading, setLoading] = useState(true);

// useEffect(() => {
//   const fetchExpense = async () => {
//     try {
//       const response = await axios.get(`/get-expense/${patient_id}`);
//       setExpense(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching expense: ', error);
//       setLoading(false);
//     }
//   };

//   fetchExpense();
// }, [patient_id]);

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
// };

// const handleDateChange = (date) => {
//   setExpense((prevExpense) => ({ ...prevExpense, date }));
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     await axios.put(`/update-expense/${expense._id}`, expense);
//     history.push('/');
//   } catch (error) {
//     console.error('Error updating expense: ', error);
//   }
// };

// if (loading) {
//   return <div>Loading...</div>;
// }

// return (
//   <div className="form-group col-md-12">
//     <form onSubmit={handleSubmit}>
//       <div className="form-row">
//         <div className="form-group col-md-6">
//           <label className="font-weight-bold" htmlFor="name">Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             name="name"
//             placeholder="Name"
//             value={expense.name || ''}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group col-md-6">
//           <label className="font-weight-bold" htmlFor="total_amount">Total Amount</label>
//           <input
//             type="text"
//             className="form-control"
//             id="total_amount"
//             name="total_amount"
//             placeholder="Amount"
//             value={expense.total_amount || ''}
//             onChange={handleChange}
//           />
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group col-md-6">
//           <label className="font-weight-bold" htmlFor="date">Date</label>
//           <DatePicker
//             selected={new Date(expense.date)}
//             onChange={handleDateChange}
//             className="form-control"
//           />
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group col-md-6">
//           <label className="font-weight-bold" htmlFor="description">Description</label>
//           <textarea
//             className="form-control"
//             id="description"
//             name="description"
//             value={expense.description || ''}
//             onChange={handleChange}
//             placeholder="Write a description"
//             rows="3"
//           />
//         </div>
//       </div>
//       <div className="form-row">
//         <div className="form-group col-md-3">
//           <div className="form-group">
//             <label className="font-weight-bold" htmlFor="paid">Total Paid</label>
//             <input
//               type="text"
//               className="form-control"
//               id="paid"
//               name="paid"
//               placeholder="Amount"
//               value={expense.paid || ''}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//       </div>
//       <button type="submit" className="btn btn-primary">Save</button>
//     </form>
//   </div>
// );
// };

export default UpdateExpenses;
