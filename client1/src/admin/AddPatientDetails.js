

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Layout from "../core/Layout";

const AddPatientDetails = ({ users, genders, status, types }) => {
  
    const [Name, setName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [regDate, setRegDate] = useState(new Date());
    const [address, setAddress] = useState('');
    const [cell, setCell] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [residence, setResidence] = useState('');
    const [email, setEmail] = useState('');
    const [guardian, setGuardian] = useState('');
    const [relation, setRelation] = useState('');
    const [gender, setGender] = useState('');
    const [statusPatient, setStatusPatient] = useState('');
    const [patientType, setPatientType] = useState('');
    const [uploading, setUploading] = useState(false);
    const [photo, setPhoto] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = {
        Name,
        idNumber,
        regDate: regDate.toISOString(),
        address,
        cell,
        birthDate: birthDate.toISOString(),
        residence,
        email,
        guardian,
        relation,
        gender,
        statusPatient,
        patientType,
        photo: photo ? photo.name : ''
      };
      try {
        const response = await fetch('https://us-central1-hospital-management-23dbf.cloudfunctions.net/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error('Error submitting form: ', error);
        alert('Error submitting form.');
      }
    };
  
    const uploadFileHandler = (e) => {
      const file = e.target.files[0];
      setPhoto(file);
    };
  
    return (
      <Layout>
      <div className="container">
     
        <h2 className="text-center mb-5">Add Patient Details</h2>

        <form class="form-card" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="font-weight-bold" htmlFor="inputName">
                Name
              </label>
              <input
                type="text"
                className="form-control input-shadow"
                id="inputName"
                placeholder="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-2">
              <label className="font-weight-bold" htmlFor="inputIdNumber">
                Id Number
              </label>
              <input
                type="text"
                className="form-control input-shadow"
                id="inputIdNumber"
                placeholder="Id Number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </div>
            <div className="form-group  col-md-2">
              <label className="font-weight-bold" htmlFor="inputRegDate">
                Registration Date
              </label>
              <div className="input-container">
              <DatePicker
                selected={regDate}
                onChange={(date) => setRegDate(date)}
                className="form-control input-shadow1"
                id="inputRegDate"
                placeholderText="Select date"
              />
               <div className="icon-container">
            
                <i className="fa fa-calendar" style={{color:"blue"}}></i>
        
              </div>
            </div>
            </div>
           
            
         

        
            <div className="form-group col-md-2">
              <label className="font-weight-bold" htmlFor="inputCell">
               Phone No
              </label>
              <input
                type="text"
                className="form-control input-shadow"
                id="inputCell"
                placeholder="Phone No"
                value={cell}
                onChange={(e) => setCell(e.target.value)}
              />
            </div>
            <div className="form-group col-md-2">
              <label className="font-weight-bold" htmlFor="inputBirthDate">
                Date of Birth
              </label>
              <div className="input-container">
              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                className="form-control input-shadow1"
                id="inputBirthDate"
              />
               <div className="icon-container">
            
              <i className="fa fa-calendar" style={{color:"blue"}}></i>
          </div>
          </div>
            </div>
            </div>
            <div className="form-row">
            <div className="form-group col-md-3">
              <label className="font-weight-bold" htmlFor="inputAddress">
                Address
              </label>
              <textarea
                className="form-control input-bg-light-grey input-shadow3"
                id="inputAddress"
                placeholder="Address"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group col-md-2">
              <label className="font-weight-bold" htmlFor="inputResidence">
                Residence
              </label>
              <input
                type="text"
                className="form-control input-shadow"
                id="inputResidence"
                placeholder="Residence"
                value={residence}
                onChange={(e) => setResidence(e.target.value)}
              />
            </div>
            <div className="form-group col-md-2">
              <label className="font-weight-bold" htmlFor="inputEmail">
                Email
              </label>
              <input
                type="email"
                className="form-control input-shadow"
                id="inputEmail"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
         

         
            <div className="form-group col-md-1">
              <label className="font-weight-bold" htmlFor="inputGuardian">
                Guardian
              </label>
              <input
                type="text"
                className="form-control input-shadow"
                id="inputGuardian"
                placeholder="Guardian"
                value={guardian}
                onChange={(e) => setGuardian(e.target.value)}
              />
            </div>
            
           
            <div className="form-group col-md-1">
              <label className="font-weight-bold" htmlFor="inputRelation">
                Relation
              </label>
              <input
                type="text"
                className="form-control input-shadow"
                id="inputRelation"
                placeholder="Relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
              />
            </div>
            </div>
            <div className="form-row">
            <div className="form-group col-md-2">
              <label className="font-weight-bold" htmlFor="inputGender">
                Gender
              </label>
              <select
                className="form-control styled-select"
                id="inputGender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label className="font-weight-bold" htmlFor="inputStatusPatient">
                Patient Status
              </label>
              <select
                className="form-control styled-select"
                id="inputStatusPatient"
                value={statusPatient}
                onChange={(e) => setStatusPatient(e.target.value)}
              >
                <option>Please Select</option>
                <option value="Normal">Normal</option>
                <option value="Abnormal">Abnormal</option>
                {status &&
                  status.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>
          
            <div className="form-group col-md-2">
              <label className="font-weight-bold" htmlFor="inputPatientType">
                Inpatient/Outpatient
              </label>
              <select
                className="form-control styled-select"
                id="inputPatientType"
                value={patientType}
                onChange={(e) => setPatientType(e.target.value)}
              >
                <option>Please Select</option>
                <option value="Inpatient">Inpatient</option>
                <option value="Outpatient">Outpatient</option>
                {types &&
                  types.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group col-md-2">
              <label className="font-weight-bold" htmlFor="inputPhoto">
                Upload Photo
              </label>
              <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputPhoto"
                onChange={uploadFileHandler}
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
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{width:"10%",textAlign:"center"}}>
            Save
          </button>
        </form>
      </div>
      
    </Layout>
    );
  };

export default AddPatientDetails;