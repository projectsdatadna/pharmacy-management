import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";

const ListVendors = ({ history }) => {
  // Dummy data for testing
  const dummyVendors = [
    {
      _id: "1",
      name: "Vendor One",
      address: "123 Main St",
      email: "vendor1@example.com",
      number: "555-555-5551",
    },
    {
      _id: "2",
      name: "Vendor Two",
      address: "456 Elm St",
      email: "vendor2@example.com",
      number: "555-555-5552",
    },
    {
      _id: "3",
      name: "Vendor Three",
      address: "789 Oak St",
      email: "vendor3@example.com",
      number: "555-555-5553",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? dummyVendors
    : dummyVendors.filter((vendor) =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const deleteHandler = (id) => {
    console.log(id);
    if (window.confirm("Are you sure")) {
      // Simulate delete action
      console.log(`Vendor with id ${id} deleted`);
    }
  };

  return (
    <Layout title="Profile" className="container-fluid">
      <h4>
        <Link to="/file-upload" className="btn btn-outline-primary">
          Add Vendors
        </Link>
      </h4>
      <h2 className="mb-4">List Vendors</h2>

      <div className="row">
        <div className="col-lg-8">
          <form>
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="d-flex justify-content-center">
          <table className="table table-bordered table-hover table-lr">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {results.map((vend, i) => (
                <tr key={i}>
                  <Fragment>
                    <th scope="row">{vend._id}</th>
                    <td>{vend.name}</td>
                    <td>{vend.address}</td>
                    <td>{vend.email}</td>
                    <td>{vend.number}</td>
                    <td>
                      <i
                        className="bi bi-trash"
                        onClick={() => deleteHandler(vend._id)}
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

export default ListVendors;