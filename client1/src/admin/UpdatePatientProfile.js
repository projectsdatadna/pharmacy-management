
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import moment from "moment";
import Layout from "../core/Layout";

const UpdatePatientProfile = () => {
  // Dummy data for testing
  const dummyUsers = [
    { _id: "1", name: "John Doe", role: 2 },
    { _id: "2", name: "Jane Smith", role: 2 },
  ];

  const dummyGenders = ["Male", "Female", "Other"];
  const dummyStatus = ["Active", "Inactive"];
  const dummyTypes = ["Inpatient", "Outpatient"];

  const [user, setUser] = useState(dummyUsers[0]._id);
  const [lastName, setLastName] = useState("Doe");
  const [idNumber, setIdNumber] = useState("123456");
  const [regDate, setRegDate] = useState(new Date());
  const [address, setAddress] = useState("123 Main St");
  const [cell, setCell] = useState("555-555-5555");
  const [birthDate, setBirthDate] = useState(new Date());
  const [residence, setResidence] = useState("New York");
  const [email, setEmail] = useState("john.doe@example.com");
  const [guardian, setGuardian] = useState("Jane Doe");
  const [relation, setRelation] = useState("Spouse");
  const [gender, setGender] = useState(dummyGenders[0]);
  const [statusPatient, setStatusPatient] = useState(dummyStatus[0]);
  const [patientType, setPatientType] = useState(dummyTypes[0]);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      user,
      lastName,
      idNumber,
      regDate,
      address,
      cell,
      birthDate,
      residence,
      email,
      guardian,
      relation,
      gender,
      statusPatient,
      patientType,
      image,
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        // http://localhost:8000/upload,
        formData,
        config
      );
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const patientDetailsForm = () => (
    <div className="form-group col-md-12">
      <form onSubmit={submitHandler}>
        <div className="form-row">
          <div className="form-group col-md-2">
            <label className="text-muted font-weight-bold">User</label>
            <select
              onChange={(e) => setUser(e.target.value)}
              className="form-control input-shadow"
              value={user}
            >
              <option>Select Patient</option>
              {dummyUsers.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-2">
            <label className="font-weight-bold" htmlFor="inputAddress">
              Last Name
            </label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="Last Name "
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-1">
            <label className="font-weight-bold" htmlFor="inputAddress">
              Id Number
            </label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="Id Number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>
          <div className="form-group col-md-2">
            <label className="font-weight-bold" htmlFor="inputAddress">
              Registration date
            </label>
            <div className="input-container">
            <DatePicker
              selected={regDate}
              onChange={(date) => setRegDate(date)}
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
            <label
              className="font-weight-bold"
              htmlFor="exampleFormControlTextarea1"
            >
              Address
            </label>
            <textarea
              className="form-control input-bg-light-grey input-shadow3"
              placeholder="write address"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group col-md-2">
            <label className="font-weight-bold" htmlFor="inputAddress">
              Phone No
            </label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="cell no"
              value={cell}
              onChange={(e) => setCell(e.target.value)}
            />
          </div>

          <div className="form-group col-md-2">
            <label className="font-weight-bold" htmlFor="inputAddress">
              Date of Birth
            </label>
            <div className="input-container">
            <DatePicker
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              className="form-control input-shadow1"
            />
              <div className="icon-container">
            
            <i className="fa fa-calendar" style={{color:"blue"}}></i>
        </div>
        </div>
          </div>

          <div className="form-group col-md-2">
            <label className="font-weight-bold" htmlFor="inputAddress">
              Residence
            </label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="residence"
              value={residence}
              onChange={(e) => setResidence(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <label className="font-weight-bold" htmlFor="inputAddress">
              Email
            </label>
            <input
              type="email"
              className="form-control input-shadow"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group col-md-1">
            <label className="font-weight-bold" htmlFor="inputAddress">
              Guardian
            </label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="guardian"
              value={guardian}
              onChange={(e) => setGuardian(e.target.value)}
            />
          </div>
          <div className="form-group col-md-1">
            <label className="font-weight-bold" htmlFor="inputAddress">
              Relation
            </label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="relation"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
            />
          </div>

          <div className="form-group col-md-1">
            <label
              className="font-weight-bold"
              htmlFor="exampleFormControlSelect1"
            >
              Gender
            </label>
            <select
              onChange={(e) => setGender(e.target.value)}
              className="form-control styled-select"
              value={gender}
              id="exampleFormControlSelect1"
            >
              <option>Select Gender</option>
              {dummyGenders.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-1">
            <label
              className="font-weight-bold"
              htmlFor="exampleFormControlSelect1"
            >
              Patient Status
            </label>
            <select
              onChange={(e) => setStatusPatient(e.target.value)}
              className="form-control styled-select"
              value={statusPatient}
              id="exampleFormControlSelect1"
            >
              <option>Please Select status</option>
              {dummyStatus.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
            </div>
            <div className="form-row">
          <div className="form-group col-md-2">
            <label
              className="font-weight-bold"
              htmlFor="exampleFormControlSelect1"
            >
              Inpatient/Outpatient
            </label>
            <select
              onChange={(e) => setPatientType(e.target.value)}
              className="form-control styled-select"
              value={patientType}
              id="exampleFormControlSelect1"
            >
              <option>Please Select</option>
              {dummyTypes.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group col-md-2">
            <label
              className="font-weight-bold"
              htmlFor="exampleFormControlFile1"
            >
              Upload Photo
            </label>
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
  );

  return (
    <Layout title="Category treatment Form">
      <>
        <h2 className="mb-4">Update Patient Info</h2>

        {patientDetailsForm()}
      </>
    </Layout>
  );
};

export default UpdatePatientProfile;