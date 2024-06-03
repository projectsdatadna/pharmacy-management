import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { useParams } from "react-router-dom";
import { vaccines } from "./ListVaccineCat";

const UpdateVaccineCat = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [medicine, setMedicine] = useState("");
  const [effects, setEffects] = useState("");

  const types = ["mRNA", "Inactivated", "Live-attenuated"];
  const medicines = [
    { _id: "1", name: "Pfizer" },
    { _id: "2", name: "Moderna" },
    { _id: "3", name: "AstraZeneca" },
  ];

  useEffect(() => {
    const getVaccineById = (id) => {
      return vaccines.find((vaccine) => vaccine._id === id);
    };
    const vaccine = getVaccineById(id);
    if (vaccine) {
      setName(vaccine.name);
      setType(vaccine.type);
      setDescription(vaccine.description);
      setMedicine(vaccine.medicine.name);
      setEffects(vaccine.effects);
    }
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({ name, type, description, medicine, effects });
  };

  const UpdateVaccineCatForm = () => (
    <form onSubmit={submitHandler}>
      <div className="form-row">
        <div className="col-md-2">
          <div className="form-group">
            <label htmlFor="inputAddress">Name</label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="e.g Malaria"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-2">
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Type</label>
            <select
              onChange={(e) => setType(e.target.value)}
              className="form-control input-shadow"
              id="exampleFormControlSelect1"
              value={type}
            >
              <option>Select Type</option>
              {types.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Description</label>
            <textarea
              className="form-control input-bg-light-grey input-shadow3"
              id="exampleFormControlTextarea1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="write description"
              rows="3"
            />
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-2">
          <div className="form-group">
            <label className="text-muted">Medicine</label>
            <select
              onChange={(e) => setMedicine(e.target.value)}
              className="form-control styled-select"
              value={medicine}
            >
              <option>Select Medicine</option>
              {medicines.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Effects</label>
            <textarea
              className="form-control input-bg-light-grey input-shadow3"
              id="exampleFormControlTextarea1"
              value={effects}
              onChange={(e) => setEffects(e.target.value)}
              placeholder="write effects"
              rows="3"
            />
          </div>
        </div>
      </div>

      <div className="col-md-8">
        <div className="form-group mt-2 mb-0">
          <button className="btn btn-primary btn-block" style={{ width:"15%"}}>
            Update
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <Layout title="Category treatment Form">
      <>
        <h2 className="mb-4">Update Vaccine Category</h2>
        {UpdateVaccineCatForm()}
      </>
    </Layout>
  );
};

export default UpdateVaccineCat;