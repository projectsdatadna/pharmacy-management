import React, { Fragment, useRef } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
// import ReactToPrint from "react-to-print";
import moment from "moment";


const ListPatients = () => {
  const patients = [
    {
      _id: "1",
      image: "/images/patient1.jpg",
      user: { name: "John Doe" },
      statusPatient: "Stable",
      patientType: "Inpatient",
      cell: "123-456-7890",
      regDate: new Date(),
      gender: "Male",
    },
    {
      _id: "2",
      image: "/images/patient2.jpg",
      user: { name: "Jane Smith" },
      statusPatient: "Critical",
      patientType: "Outpatient",
      cell: "098-765-4321",
      regDate: new Date(),
      gender: "Female",
    },
  ];

  const linkToPrint = () => {
    return <button>Click To Print Patients</button>;
  };

  const componentRef = useRef();

  return (
    <Layout title="List Prescriptions" className="container-fluid">
      <h4>
      <Link to="/add-patient-details" className="btn btn-outline-primary">
        Add Patient Details
      </Link>
      </h4><br></br>
      {/* <ReactToPrint
        trigger={linkToPrint}
        content={() => componentRef.current}
      /> */}
      <h2 className="mb-4">List Patients Profile</h2>

      <div className="row" ref={componentRef}>
        
      <div className="d-flex justify-content-center">
      <table className="table table-bordered table-hover table-lr">
        <thead style={{ backgroundColor: 'red' }}>
          <tr>
            <th scope="col">Id</th>
            {/* <th scope="col">Profile</th> */}
            <th scope="col">User</th>
            <th scope="col">Patient Status</th>
            <th scope="col">Inpatient/Outpatient</th>
            <th scope="col">Cell</th>
            <th scope="col">Reg Date</th>
            <th scope="col">Gender</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {patients && patients.map((patient, i) => (
            <tr key={i}>
              <td>{patient._id.substring(0, 6)}</td>
              {/* <td>
                <img
                  src={patient.image}
                  className="img-fluid rounded-circle"
                  alt="profile"
                  style={{ width: '50px', height: '50px' }}
                />
              </td> */}
              <td>{patient.user.name}</td>
              <td>{patient.statusPatient}</td>
              <td>{patient.patientType}</td>
              <td>{patient.cell}</td>
              <td>{moment(patient.regDate).format("YYYY-MM-DD HH:mm Z")}</td>
              <td>{patient.gender}</td>
              <td>
                <Link to={`/update-patient/`} className="btn btn-primary">
                  Edit
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => console.log("Delete", patient._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
      
    </Layout>
  );
};

export default ListPatients;
