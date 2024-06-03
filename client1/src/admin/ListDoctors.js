import React, { Fragment, useRef } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
// import ReactToPrint from "react-to-print";
import moment from "moment";

const ListDoctors = ({ history }) => {
  // Dummy data for testing
  const dummyDoctors = [
    {
      _id: "1",
      image: "/path/to/image1.jpg",
      user: { name: "Dr. John Doe" },
      idNumber: "12345",
      specialization: { name: "Cardiology" },
      department: { name: "Cardiology Department" },
      designation: { name: "Senior Doctor" },
      cell: "555-555-5551",
      regDate: new Date(),
      gender: "Male",
    },
    {
      _id: "2",
      image: "/path/to/image2.jpg",
      user: { name: "Dr. Jane Smith" },
      idNumber: "67890",
      specialization: { name: "Neurology" },
      department: { name: "Neurology Department" },
      designation: { name: "Consultant" },
      cell: "555-555-5552",
      regDate: new Date(),
      gender: "Female",
    },
  ];

  const linkToPrint = () => {
    return <button>Click To Print Doctors</button>;
  };

  const componentRef = useRef();

  const deleteHandler = (id) => {
    console.log(id);
    if (window.confirm("Are you sure")) {
      console.log(`Doctor with id ${id} deleted`);
    }
  };

  return (
    <Layout title="List Doctors" className="container-fluid">
      <h4>
        {/* <Link to="/add-doctor" className="btn btn-outline-primary">
          Add Doctor Profile
        </Link> */}
      </h4>
      {/* <ReactToPrint
        trigger={linkToPrint}
        content={() => componentRef.current}
      /> */}
      <h2 className="mb-4">List Doctors Profile</h2>

      <div className="row" ref={componentRef}>
        <div className="d-flex justify-content-center">
          <table className="table table-bordered table-hover table-lr">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">User</th>
                <th scope="col">Id Number</th>
                <th scope="col">Specialization</th>
                <th scope="col">Department</th>
                <th scope="col">Designation</th>
                <th scope="col">Cell</th>
                <th scope="col">Reg Date</th>
                <th scope="col">Gender</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {dummyDoctors.map((doctor, i) => (
                <tr key={i}>
                  <Fragment>
                    <th scope="row">{doctor._id}</th>
                    {/* <td>
                      <img
                        src={doctor.image}
                        className="img-fluid rounded-circle"
                        alt="Profile"
                      />
                    </td> */}
                    <td>{doctor.user.name}</td>
                    <td>{doctor.idNumber}</td>
                    <td>{doctor.specialization.name}</td>
                    <td>{doctor.department.name}</td>
                    <td>{doctor.designation.name}</td>
                    <td>{doctor.cell}</td>
                    <td>{moment(doctor.regDate).format("YYYY-MM-DD")}</td>
                    <td>{doctor.gender}</td>
                    <td>
                      {/* <Link to={`/update-doctor/${doctor._id}`}>
                        <i className="bi bi-pencil-square"></i>
                      </Link> */}
                      <Link to={`/update-doctor`}>
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                    </td>
                    <td>
                      <i
                        className="bi bi-trash"
                        onClick={() => deleteHandler(doctor._id)}
                      ></i>
                    </td>
                  </Fragment>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ListDoctors;