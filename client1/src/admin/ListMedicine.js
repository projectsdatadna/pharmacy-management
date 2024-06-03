import React, { Fragment } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import moment from "moment";

// Dummy data for design purposes
const medicines = [
  {
    _id: "1",
    name: "Paracetamol",
    genericName: "Acetaminophen",
    batchNo: "A1234",
    barCode: "123456789012",
    quantity: 100,
    type: "Tablet",
    manDate: new Date("2022-01-01"),
    expDate: new Date("2023-01-01"),
    cost: 10,
    vendor: { name: "Pharma Inc." },
  },
  {
    _id: "2",
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    batchNo: "B5678",
    barCode: "123456789013",
    quantity: 200,
    type: "Capsule",
    manDate: new Date("2022-02-01"),
    expDate: new Date("2023-02-01"),
    cost: 20,
    vendor: { name: "Health Ltd." },
  },
  {
    _id: "3",
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    batchNo: "C9101",
    barCode: "123456789014",
    quantity: 150,
    type: "Tablet",
    manDate: new Date("2022-03-01"),
    expDate: new Date("2023-03-01"),
    cost: 15,
    vendor: { name: "Wellness Corp." },
  },
  {
    _id: "4",
    name: "Cetirizine",
    genericName: "Cetirizine",
    batchNo: "D1121",
    barCode: "123456789015",
    quantity: 300,
    type: "Tablet",
    manDate: new Date("2022-04-01"),
    expDate: new Date("2023-04-01"),
    cost: 12,
    vendor: { name: "Medico Supplies" },
  },
  {
    _id: "5",
    name: "Metformin",
    genericName: "Metformin",
    batchNo: "E1314",
    barCode: "123456789016",
    quantity: 500,
    type: "Tablet",
    manDate: new Date("2022-05-01"),
    expDate: new Date("2023-05-01"),
    cost: 18,
    vendor: { name: "HealthCare Inc." },
  },
];

const ListMedicine = () => {
  const deleteHandler = (id) => {
    alert(`Medicine with ID ${id} deleted.`);
  };

  return (
    <Layout
      title="Profile"
      description="List of medicines"
      className="container-fluid"
    >
      <h4>
        <Link to="/add-medicine" className="btn btn-outline-primary">
          Add Medicine
        </Link>
      </h4>

      <h2 className="mb-4">List Medicine</h2>

      <div className="row">
        <div className="d-flex justify-content-center">
          <table className="table table-bordered table-hover table-lr">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Generic Name</th>
                <th scope="col">Batch No</th>
                <th scope="col">Bar Code</th>
                <th scope="col">Quantity</th>
                <th scope="col">Type</th>
                <th scope="col">Man Date</th>
                <th scope="col">Expiry Date</th>
                <th scope="col">Cost</th>
                <th scope="col">Vendors</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {medicines.length === 0 ? (
                <tr>
                  <td className="text-center" colSpan="13">
                    No Data
                  </td>
                </tr>
              ) : (
                medicines.map((med, i) => (
                  <tr key={i}>
                    <Fragment>
                      <th scope="row">{med._id}</th>
                      <td>{med.name}</td>
                      <td>{med.genericName}</td>
                      <td>{med.batchNo}</td>
                      <td>{med.barCode}</td>
                      <td>{med.quantity}</td>
                      <td>{med.type}</td>
                      <td>{moment(med.manDate).format("YYYY-MM-DD")}</td>
                      <td>{moment(med.expDate).format("YYYY-MM-DD")}</td>
                      <td>{med.cost}</td>
                      <td>{med.vendor.name}</td>
                      <td>
                        <Link to={`/update-medicine/${med._id}`}>
                          <i className="bi bi-pencil-square" />
                        </Link>
                      </td>
                      <td>
                        <i
                          className="bi bi-trash"
                          onClick={() => deleteHandler(med._id)}
                        />
                      </td>
                    </Fragment>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export { medicines };
export default ListMedicine;
