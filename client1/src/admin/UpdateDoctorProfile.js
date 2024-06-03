import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import moment from "moment";

const UpdateDoctorProfile = () => {
  const [user, setUser] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState(0);
  const [regDate, setRegDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [cell, setCell] = useState(0);
  const [specialization, setSpecialization] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [residence, setResidence] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [duty, setDuty] = useState("");
  const [room, setRoom] = useState("");
  const [fee, setFee] = useState(0);
  const [time_in, setTimeIn] = useState("");
  const [time_out, setTimeOut] = useState("");
  const [days, setDays] = useState("");

  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  // Dummy data for listUsers action
  const listUsers = {
    users: [
      { _id: "1", name: "John Doe" },
      { _id: "2", name: "Jane Smith" },
      // Add more user objects as needed
    ],
  };
  const { users } = listUsers;

  // Dummy data for listGenderEnums action
  const listGenderEnums = {
    genders: ["Male", "Female", "Other"],
  };
  const { genders } = listGenderEnums;

  // Dummy data for listDaysEnums action
  const listDaysEnums = {
    dayes: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  };
  const { dayes } = listDaysEnums;

  // Dummy data for listDutyEnums action
  const listDutyEnums = {
    duties: ["Full-time", "Part-time", "On-call"],
  };
  const { duties } = listDutyEnums;

  // Dummy data for listSpecialize action
  const listSpecialize = {
    specializations: [
      { _id: "1", name: "Cardiology" },
      { _id: "2", name: "Neurology" },
      // Add more specialization objects as needed
    ],
  };
  const { specializations } = listSpecialize;

  // Dummy data for listDeparts action
  const listDeparts = {
    departments: [
      { _id: "1", name: "Cardiology" },
      { _id: "2", name: "Neurology" },
      // Add more department objects as needed
    ],
  };
  const { departments } = listDeparts;

  // Dummy data for listDesignate action
  const listDesignate = {
    designations: [
      { _id: "1", name: "Senior Cardiologist" },
      { _id: "2", name: "Consultant Neurologist" },
      // Add more designation objects as needed
    ],
  };
  const { designations } = listDesignate;

  // Dummy data for doctorDetails action
  const doctorDetails = {
    _id: "1",
    user: "1",
    lastName: "Doe",
    idNumber: "123456",
    regDate: "2023-01-01", // Example registration date
    address: "123 Main Street",
    cell: "1234567890",
    specialization: "1",
    department: "1",
    designation: "1",
    residence: "456 Elm Street",
    email: "john.doe@example.com",
    gender: "Male",
    duty: "Full-time",
    room: "101",
    fee: "100",
    time_in: "09:00",
    time_out: "17:00",
    days: ["Monday", "Wednesday"],
    image: "",
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
  };

  return (
    <Layout title="Category treatment Form">
      <>
        <h2 className="mb-4">Update Doctor Info</h2>
        <div className="form-group col-md-12">
          <form onSubmit={submitHandler}>
            <div className="form-row">
              <div className="form-group col-md-2">
                <label className="text-muted">User</label>
                <select
                  onChange={(e) => setUser(e.target.value)}
                  className="form-control styled-select"
                >
                  <option>Select Doctor</option>
                  {users &&
                    users
                      .filter((filtered) => filtered.role === 1)
                      .map((c, i) => (
                        <option key={i} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                </select>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputAddress">Last Name</label>
                <input
                  type="text"
                  className="form-control input-shadow"
                  placeholder="Last Number"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group col-md-1">
                <label htmlFor="inputAddress">Id Number</label>
                <div className="input-container">
                <input
                  type="text"
                  className="form-control input-shadow"
                  placeholder="Id Number"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
                </div>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputAddress">Registration date</label>
                <div className="input-container">
                <DatePicker
                  value={regDate}
                  onChange={(date) =>
                    setRegDate(moment(date).format("YYYY-MM-DD"))
                  }
                  className="form-control input-shadow1"
                />
                <div className="icon-container">
            
            <i className="fa fa-calendar" style={{color:"blue"}}></i>
        </div>
        </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="exampleFormControlTextarea1">Address</label>
                <textarea
                  className="form-control input-bg-light-grey input-shadow3"
                  placeholder="write address"
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="inputAddress">Phone No</label>
                <input
                  type="text"
                  className="form-control input-shadow"
                  placeholder="cell no"
                  value={cell}
                  onChange={(e) => setCell(e.target.value)}
                />
              </div>

              <div className="form-group col-md-2">
                <label className="text-muted">Specialization</label>
                <select
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="form-control styled-select"
                >
                  <option>Select</option>
                  {specializations &&
                    specializations.map((c, i) => (
                      <option key={i} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-group col-md-2">
                <label className="text-muted">Department</label>
                <select
                  onChange={(e) => setDepartment(e.target.value)}
                  className="form-control styled-select"
                >
                  <option>Select</option>
                  {departments &&
                    departments.map((c, i) => (
                      <option key={i} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-2">
                <label className="text-muted">Designation</label>
                <select
                  onChange={(e) => setDesignation(e.target.value)}
                  className="form-control styled-select"
                >
                  <option>Select</option>
                  {designations &&
                    designations.map((c, i) => (
                      <option key={i} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="inputAddress">Residence</label>
                <input
                  type="text"
                  className="form-control  input-shadow"
                  placeholder="residence"
                  value={residence}
                  onChange={(e) => setResidence(e.target.value)}
                />
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="inputAddress">Email</label>
                <input
                  type="email"
                  className="form-control  input-shadow"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="exampleFormControlSelect1">Gender</label>
                <select
                  onChange={(e) => setGender(e.target.value)}
                  className="form-control styled-select"
                  id="exampleFormControlSelect1"
                >
                  <option>Select Gender</option>
                  {genders &&
                    genders.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-2">
                <label htmlFor="exampleFormControlSelect1">Duty</label>
                <select
                  onChange={(e) => setDuty(e.target.value)}
                  className="form-control styled-select"
                  id="exampleFormControlSelect1"
                >
                  <option>Select Duty</option>
                  {duties &&
                    duties.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-group col-md-1">
                <label htmlFor="inputAddress">Room</label>
                <input
                  type="text"
                  className="form-control input-shadow"
                  placeholder="guardian"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
              </div>

              <div className="form-group col-md-1">
                <label htmlFor="inputAddress">Fee</label>
                <input
                  type="text"
                  className="form-control input-shadow"
                  placeholder="relation"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              {/* <div className="form-group col-md-3">
                <label htmlFor="inputAddress">Time In</label>
                <TimePicker
                  onChange={setTimeIn}
                  value={time_in}
                  className="class1 class2"
                />
              </div> */}

              {/* <div className="form-group col-md-3">
                <label htmlFor="inputAddress">Time Out</label>
                <TimePicker
                  onChange={setTimeOut}
                  value={time_out}
                  clockClassName="class1 class2"
                />
              </div> */}

              {/* <div className="form-group col-md-3">
                <label htmlFor="exampleFormControlSelect2">Day</label>
                <select
                  multiple
                  className="form-control"
                  id="exampleFormControlSelect2"
                  onChange={(e) => setDays(e.target.value)}
                >
                  <option>Select Day</option>
                  {dayes &&
                    dayes.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div> */}

              <div className="form-group col-md-2">
                <label htmlFor="exampleFormControlFile1">Upload Photo</label>
                <div className="custom-file">
                <input
                  type="file"
                  onChange={uploadFileHandler}
                  className="custom-file-input"
                  id="exampleFormControlFile1"
                />
                 <label className="custom-file-label" htmlFor="inputPhoto">
                Choose file
              </label>
                </div>
                {uploading && (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
                <button className="invisible">Submit</button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </>
    </Layout>
  );
};

export default UpdateDoctorProfile;