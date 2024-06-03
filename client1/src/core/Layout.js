import React, { Fragment } from "react";
import "../styles.css";
import Menu from "./Menu";
import { Link, useLocation } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Layout = ({ children }) => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path
      ? { color: "#ff9900" }
      : { color: "#ffffff" };
  };
  const mockUserInfo = { _id: 1, name: "Admin User" };

  const adminLinks = () => {
    return (
      <Fragment>
        <div className="sb-sidenav-menu-heading">Core</div>
        <Link className="nav-link" style={isActive("/")} to="/">
          <div className="sb-nav-link-icon">
            <i className="fas fa-tachometer-alt" />
          </div>
          Dashboard
        </Link>

        <Link className="nav-link" style={isActive(`/profile`)} to={`/profile`}>
          <div className="sb-nav-link-icon">
            <i className="bi bi-person-badge-fill" />
          </div>
          Update Profile
        </Link>

        <Link
          className="nav-link"
          style={isActive("/list/users")}
          to="/list/users"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-people" />
          </div>
          List Users
        </Link>

        {/* <div className="sb-sidenav-menu-heading">Modules</div>
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseLayouts"
          aria-expanded="false"
          aria-controls="collapseLayouts"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-eyedropper" />
          </div>
          Laboratory
          <div className="sb-sidenav-collapse-arrow">
            <i className="fas fa-angle-down" />
          </div>
        </a>
        <div
          className="collapse"
          id="collapseLayouts"
          aria-labelledby="headingOne"
          data-parent="#sidenavAccordion"
        >
          <nav className="sb-sidenav-menu-nested nav">
            <Link
              className="nav-link"
              style={isActive("/list-cat-test")}
              to="/list-cat-test"
            >
              Category Test
            </Link>
            <Link
              className="nav-link"
              style={isActive("/test-result")}
              to="/test-result"
            >
              Tests Result
            </Link>
          </nav>
        </div>

        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapsePages"
          aria-expanded="false"
          aria-controls="collapsePages"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-journal-medical" />
          </div>
          Modules Mgmt
          <div className="sb-sidenav-collapse-arrow">
            <i className="fas fa-angle-down" />
          </div>
        </a>
        <div
          className="collapse"
          id="collapsePages"
          aria-labelledby="headingTwo"
          data-parent="#sidenavAccordion"
        >
          <nav
            className="sb-sidenav-menu-nested nav accordion"
            id="sidenavAccordionPages"
          >
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#pagesCollapseAuth"
              aria-expanded="false"
              aria-controls="pagesCollapseAuth"
            >
              Medication
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down" />
              </div>
            </a>
            <div
              className="collapse"
              id="pagesCollapseAuth"
              aria-labelledby="headingOne"
              data-parent="#sidenavAccordionPages"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link
                  className="nav-link"
                  style={isActive("/list-treat-cat")}
                  to="/list-treat-cat"
                >
                  Treatment
                </Link>
                <Link
                  className="nav-link"
                  style={isActive("/list-prescriptions")}
                  to="/list-prescriptions"
                >
                  Prescription List
                </Link>
              </nav>
            </div>
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#pagesCollapseError"
              aria-expanded="false"
              aria-controls="pagesCollapseError"
            >
              Buildings-Floor
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down" />
              </div>
            </a>
            <div
              className="collapse"
              id="pagesCollapseError"
              aria-labelledby="headingOne"
              data-parent="#sidenavAccordionPages"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link
                  className="nav-link"
                  style={isActive("/list-buildings")}
                  to="/list-buildings"
                >
                  Building
                </Link>
                <Link
                  className="nav-link"
                  style={isActive("/list-floors")}
                  to="/list-floors"
                >
                  Floors
                </Link>
                <Link
                  className="nav-link"
                  style={isActive("/list-departs")}
                  to="/list-departs"
                >
                  Department
                </Link>
              </nav>
            </div>
          </nav>
        </div> */}

        <div className="sb-sidenav-menu-heading">Details</div>
        <Link
          className="nav-link"
          style={isActive("/list-patients")}
          to="/list-patients"
        >
          <div className="sb-nav-link-icon">
            <i className="fas fa-procedures" />
          </div>
          Patients
        </Link>
        <Link
          className="nav-link"
          style={isActive("/list-doctors")}
          to="/list-doctors"
        >
          <div className="sb-nav-link-icon">
            <i className="fas fa-user-md" />
        </div>
          Doctors
        </Link>

        <div className="sb-sidenav-menu-heading">Pharmacy</div>
        <Link
          className="nav-link"
          style={isActive("/list-vendors")}
          to="/list-vendors"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-shop" />
          </div>
          Vendors
        </Link>
        <Link
          className="nav-link"
          style={isActive("/list/medicine")}
          to="/list/medicine"
        >
          <div className="sb-nav-link-icon">
                <i className="fas fa-pills" />
            </div>
          Medicine
        </Link>

        <div className="sb-sidenav-menu-heading">Expenses</div>
        <Link
          className="nav-link"
          style={isActive("/list-expenses")}
          to="/list-expenses"
        >
          <div className="sb-nav-link-icon">
            <i className="fas fa-receipt" />
          </div>
          Expenses
        </Link>

        <Link
          className="nav-link"
          style={isActive("/list-expenses")}
          to="/create-bill"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-cash" />
          </div>
          Create Bill
        </Link>

        <div className="sb-sidenav-menu-heading">Vaccine</div>
        <Link
          className="nav-link"
          style={isActive("/list-vaccine-cat")}
          to="/list-vaccine-cat"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-eyedropper" />
          </div>
          Vaccine
        </Link>
        <div className="sb-sidenav-menu-heading">Appointment</div>
        <Link
          className="nav-link"
          style={isActive("/list-app-vaccine")}
          to="/list-app-vaccine"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-card-list" />
          </div>
          Appointments
        </Link>

        {/* <div className="sb-sidenav-menu-heading">Doctors Department</div>
        <Link
          className="nav-link"
          style={isActive("/list-designate")}
          to="/list-designate"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-journal-medical" />
          </div>
          Designation
        </Link>
        <Link
          className="nav-link"
          style={isActive("/list-specialize")}
          to="/list-specialize"
        >
          <div className="sb-nav-link-icon">
            <i className="bi bi-journal-medical" />
          </div>
          Specialize
        </Link> */}
      </Fragment>
    );
  };

  const loggedIn = () => <div className="small">Logged in as:</div>;

  return (
    <nav className="sb-nav-fixed">
      <Menu />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">{adminLinks()}</div>
            </div>
            <div className="sb-sidenav-footer">
              {loggedIn()}
              {mockUserInfo.name}
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid">
              <h1 className="mt-4">Dashboard</h1>
              <ol className="breadcrumb mb-4" style={{backgroundColor:"lightgray"}}>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
              {children}
            </div>
          </main>
        </div>
      </div>
    </nav>
  );
};

export default Layout;
