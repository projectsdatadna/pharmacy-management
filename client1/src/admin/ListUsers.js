import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

const ListUsers = () => {
  const [activePage, setActivePage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [data, setData] = useState([
    { _id: 1, name: "Admin User", email: "admin@example.com", role: 0 },
    { _id: 2, name: "Doctor User", email: "doctor@example.com", role: 1 },
    { _id: 3, name: "Patient User", email: "patient@example.com", role: 2 },
    { _id: 4, name: "Staff User", email: "staff@example.com", role: 3 },
    { _id: 5, name: "Patient User", email: "patient@example.com", role: 2 },
    { _id: 6, name: "Nurse User", email: "nurse@example.com", role: 4 },
    { _id: 7, name: "Admin User", email: "admin@example.com", role: 0 },
    { _id: 8, name: "Doctor User", email: "doctor@example.com", role: 1 },
    { _id: 9, name: "Patient User", email: "patient@example.com", role: 2 },
    { _id: 10, name: "Staff User", email: "staff@example.com", role: 3 },
    { _id: 11, name: "Nurse User", email: "nurse@example.com", role: 4 },
  ]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const deleteHandler = (id) => {
    console.log(id);
    if (window.confirm("Are you sure")) {
      //   dispatch(deleteUser(id));
    }
  };
  const searchUsers = (target) => {
    // if (target === " ") {
    //   return setData(users);
    // }
    // let results =
    //   users &&
    //   users.filter((user) =>
    //     user.name.toString().toLowerCase().includes(target)
    //   );
    // setData(results);
  };
  const countUsers = () => {
    return data.length;
  };

  const indexOfLastUser = activePage * itemPerPage;
  const indexOfFirstUser = indexOfLastUser - itemPerPage;

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      {/* <h4>
        <Link to="/add-users" className="btn btn-outline-primary">
          Add User
        </Link>
      </h4> */}

      <h2 className="mb-4">List Users</h2>

      <div className="row">
        <div className="col-lg-8">
          <form>
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  return searchUsers(e.target.value);
                }}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-sm-8">
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
              {data.length !== 0 ? (
                data.slice(indexOfFirstUser, indexOfLastUser).map((user, i) => (
                  <tr key={i}>
                    <th scope="row">{user._id}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>

                    <td>
                      {user.role === 0 ? (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                        >
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
                        <button
                          type="button"
                          className="btn btn-warning btn-sm"
                        >
                          Staff
                        </button>
                      )}
                    </td>
                    <td>
                      {user.role === 0 ? (
                        " "
                      ) : (
                        <Link to={`/update/users/${user._id}`}>
                          <i className="bi bi-pencil-square" />
                        </Link>
                      )}
                    </td>
                    <td>
                      {user.role === 0 ? (
                        " "
                      ) : (
                        <i
                          className="bi bi-trash"
                          onClick={() => deleteHandler(user._id)}
                        />
                      )}
                    </td>
                    <td>
                      {user.role === 2 ? (
                        <Link to={`/pat-details/${user._id}`}>
                          {" "}
                          <button
                            type="button"
                            className="btn btn-success btn-sm"
                          >
                            Details
                          </button>
                        </Link>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <td>
                  <b>No Users found</b>
                </td>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemPerPage}
        totalItemsCount={parseInt(countUsers())}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    </Layout>
  );
};

export default ListUsers;
