import React, { Fragment } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";

const vaccines = [
  {
    _id: "1",
    name: "Covid-19 Vaccine",
    type: "mRNA",
    description: "A vaccine for Covid-19",
    medicine: { name: "Pfizer" },
    effects: "Mild fever, fatigue",
  },
  {
    _id: "2",
    name: "Flu Vaccine",
    type: "Inactivated",
    description: "Seasonal flu vaccine",
    medicine: { name: "Fluzone" },
    effects: "Soreness at injection site",
  },
  {
    _id: "3",
    name: "Hepatitis B Vaccine",
    type: "Subunit",
    description: "A vaccine for Hepatitis B",
    medicine: { name: "Engerix-B" },
    effects: "Mild fever, headache",
  },
  {
    _id: "4",
    name: "Polio Vaccine",
    type: "Inactivated",
    description: "A vaccine for polio",
    medicine: { name: "IPV" },
    effects: "Redness at injection site",
  },
  {
    _id: "5",
    name: "MMR Vaccine",
    type: "Live-attenuated",
    description: "A vaccine for measles, mumps, and rubella",
    medicine: { name: "M-M-R II" },
    effects: "Mild rash, fever",
  },
];

const ListVaccineCat = () => {
  const loading = false;
  const error = false;
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <Layout
      title="Profile"
      description="List Vaccine Categories"
      className="container-fluid"
    >
      <h4>
        <Link to="/add-vac-cat" className="btn btn-outline-primary">
          Add Vaccine Category
        </Link>
      </h4>

      <h2 className="mb-4">List Vaccine Category</h2>

      {loading ? (
        showLoading()
      ) : error ? (
        showError()
      ) : vaccines.length === 0 ? (
        <div className="row">
          <div className="d-flex justify-content-center">
            <table className="table table-bordered table-hover table-lr">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Description</th>
                  <th scope="col">Medicine</th>
                  <th scope="col">Effects</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center" colSpan="8">
                    No Data
                  </td>
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
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Description</th>
                  <th scope="col">Medicine</th>
                  <th scope="col">Effects</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.map((vac, i) => (
                  <tr key={i}>
                    <Fragment>
                      <th scope="row">{vac._id}</th>
                      <td>{vac.name}</td>
                      <td>{vac.type}</td>
                      <td>{vac.description}</td>
                      <td>{vac.medicine.name}</td>
                      <td>{vac.effects}</td>
                      <td>
                        <Link to={`/update-vaccine-cat/${vac._id}`}>
                          <i className="bi bi-pencil-square" />
                        </Link>
                      </td>
                      <td>
                        <i
                          className="bi bi-trash"
                          onClick={() => console.log("Delete", vac._id)}
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

export { vaccines };
export default ListVaccineCat;