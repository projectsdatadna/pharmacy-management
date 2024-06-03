import React, { Fragment, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import moment from "moment";

const ListAppVaccine = ({ history }) => {
  const appointments = [
    {
      _id: "1",
      patient: { name: "John Doe" },
      nurse: { name: "Jane Smith" },
      vaccine: { name: "COVID-19 Vaccine" },
      date: "2024-06-01",
      time_in: "10:00 AM",
      taken: "Yes",
      room: "A101",
      day: "Monday",
      remarks: "First dose",
    },
  ];

  // Mock user info data
  const userInfo = {
    role: 0,
  };

  // Mock successDelete
  const successDelete = true;

  const deleteHandler = (id) => {
    console.log(id);
  };

  return (
    <Layout
      title="Profile"
      description="list treatment categories"
      className="container-fluid"
    >
      {/* <h4>
        <Link to="/add-vacc-app" className="btn btn-outline-primary">
          Add Appointment
        </Link>
      </h4> */}

      <h2 className="mb-4">List Appointments</h2>

      {appointments.length === 0 ? (
        <div className="row">
          <div className="col-sm-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Patient</th>
                  <th scope="col">Nurse</th>
                  <th scope="col">Vaccine</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time In</th>
                  <th scope="col">Taken</th>
                  <th scope="col">Day</th>
                  <th scope="col">room</th>
                  <th scope="col">remarks</th>
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
          <div className="col-sm-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Patient</th>
                  <th scope="col">Nurse</th>
                  <th scope="col">Vaccine</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time In</th>
                  <th scope="col">Taken</th>
                  <th scope="col">Day</th>
                  <th scope="col">room</th>
                  <th scope="col">remarks</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {appointments &&
                  appointments.map((app, i) => (
                    <tr key={i}>
                      <Fragment>
                        <th scope="row">{app._id.substring(0, 7)}</th>
                        <td>{app.patient.name}</td>
                        <td>{app.nurse.name}</td>
                        <td>{app.vaccine.name}</td>
                        <td>{moment(app.date).format("YYYY-MM-DD")}</td>
                        <td>{app.time_in}</td>
                        <td>
                          {app.taken === "Yes" ? (
                            <button
                              type="button"
                              className="btn btn-success btn-sm"
                            >
                              {app.taken}
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                            >
                              {app.taken}
                            </button>
                          )}
                        </td>
                        <td>{app.room}</td>
                        <td>{app.day}</td>
                        <td>{app.remarks}</td>

                        <td>
                          {/* <Link to={`/update-vacc-app/${app._id}`}>
                            <i className="bi bi-pencil-square" />
                          </Link> */}
                          <Link to={`/update-vacc-app`}>
                            <i className="bi bi-pencil-square" />
                          </Link>
                        </td>
                        <td>
                          <i
                            className="bi bi-trash"
                            onClick={() => deleteHandler(app._id)}
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

export default ListAppVaccine;