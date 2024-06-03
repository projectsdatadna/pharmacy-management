import React,{useState, useEffect} from "react";
import Layout from "../core/Layout";
import { Link , useParams } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
import axios from 'axios';
import BarChart from './BarChart';

const AdminDashboard = () => {
  const mockUsers = [
    { _id: 1, name: "Admin User", email: "admin@example.com", role: 0 },
    { _id: 2, name: "Doctor User", email: "doctor@example.com", role: 1 },
    { _id: 3, name: "Patient User", email: "patient@example.com", role: 2 },
    { _id: 4, name: "Staff User", email: "staff@example.com", role: 3 },
    { _id: 5, name: "Nurse User", email: "nurse@example.com", role: 4 },
  ];

  const mockExpenses = [
    { name: "Rent", amount: 1000 },
    { name: "Utilities", amount: 500 },
  ];

  const mockAppointments = [
    { vaccine: { name: "CoronaVirus" }, taken: "Yes" },
    { vaccine: { name: "CoronaVirus" }, taken: "No" },
  ];

  const chartData = {
    labels: ["Admin", "Doctors", "Patients", "Staff", "Nurses"],
    datasets: [
      {
        backgroundColor: [
          "#007bff",
          "#dc3545",
          "#ffc107",
          "#28a745",
          "#11ede9",
        ],
        data: [1, 1, 1, 1, 1],
      },
    ],
  };

  const expenseChartData = {
    labels: ["2021-03-31", "2021-01-31","2021-02-28"],
    datasets: [
      {
        backgroundColor: ["#007bff", "#dc3545"],
        data: [2500, 5000, 2400],
      },
    ],
  };

  const appointmentChartData = {
    labels: ["Vaccinated: 1", "Not Vaccinated: 1"],
    datasets: [
      {
        backgroundColor: ["#28a745", "#dc3545"],
        data: [1, 1],
      },
    ],
  };

  const vaccineChartData = {
    labels: ["Covid: 1", "CovidShield: 0"],
    datasets: [
      {
        backgroundColor: ["#007bff", "#dc3545"],
        data: [1, 0],
      },
    ],
  };

  const [data, setData] = useState({
    totalAmountSum: 0,
    paidSum: 0,
    balanceSum: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://us-central1-hospital-management-23dbf.cloudfunctions.net/api/filterData', {
          params: {
            from: '2021-01-01',
            to: '2021-01-06',
          },
        });
        console.log("Response:",response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const [chartData1, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://us-central1-hospital-management-23dbf.cloudfunctions.net/api/filterDataByDate', {
          params: {
            from: '2021-01-01',
            to: '2021-01-06',
          },
        });
        console.log("Response:", response.data);
        // Prepare chart data from the response
        const data = response.data.map(item => item.totalAmountSum);
        setChartData({
          labels: response.data.map(item => item.date),
          datasets: [
            {
              label: 'Total Amount Sum',
              backgroundColor: "#007bff",
              data,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card basic-card-aqua text-white mb-4">
            <div className="card-body">Total Billed</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link
                className="small text-white stretched-link"
                to={`/list/users`}
                style={{textDecoration:"none"}}
              >
                {data.totalAmountSum}
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card basic-card-lips text-white mb-4">
            <div className="card-body">Total Paid</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link
                className="small text-white stretched-link"
                to={`/list/users`}
                style={{textDecoration:"none"}}
              >
               {data.paidSum}
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-success text-white mb-4">
            <div className="card-body">Total Expenses</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="small text-white stretched-link"  style={{textDecoration:"none"}} href="#">
              {data.balanceSum/2}
              </a>
              <div className="small text-white">
                <i className="fas fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card basic-card-dark text-white mb-4">
            <div className="card-body">Total Pending</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="small text-white stretched-link"  style={{textDecoration:"none"}} href="#">
              {data.totalAmountSum - data.paidSum}
              </a>
              <div className="small text-white">
                <i className="fas fa-angle-right" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
        {chartData1 && (
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-pie mr-1" />
              Total Billed vs Date
            </div>
            <div className="card-body">
              <BarChart data={chartData1} />
            </div>
            <div className="card-footer small text-muted">
              Updated yesterday at 11:59 PM
            </div>
          </div>
        )}
        </div>

        <div className="col-lg-6">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-pie mr-1" />
              Expenses Types
            </div>
            <div className="card-body">
            <BarChart data={expenseChartData} />
            </div>
            <div className="card-footer small text-muted">
              Updated yesterday at 11:59 PM
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-pie mr-1" />
              CoronaVirus
            </div>
            <div className="card-body">
              <BarChart data={appointmentChartData} />
            </div>
            <div className="card-footer small text-muted">
              Updated yesterday at 11:59 PM
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-pie mr-1" />
              Types of Vaccines Taken
            </div>
            <div className="card-body">
            <BarChart data={vaccineChartData} />
            </div>
            <div className="card-footer small text-muted">
              Updated yesterday at 11:59 PM
            </div>
          </div>
        </div>

        {/* <div className="col-sm-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user, i) => (
                <tr key={i}>
                  <th scope="row">{user._id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === 0 ? (
                      <button type="button" className="btn btn-primary btn-sm">
                        Admin
                      </button>
                    ) : user.role === 1 ? (
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                      >
                        Doctor
                      </button>
                    ) : user.role === 2 ? (
                      <button type="button" className="btn btn-info btn-sm">
                        Patient
                      </button>
                    ) : user.role === 4 ? (
                      <button type="button" className="btn btn-dark btn-sm">
                        Nurse
                      </button>
                    ) : (
                      <button type="button" className="btn btn-warning btn-sm">
                        Staff
                      </button>
                    )}
                  </td>
                  <td>
                    <Link to={`/update/users/${user._id}`}>
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                  </td>
                  <td>
                    <i className="bi bi-trash" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
