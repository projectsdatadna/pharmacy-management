import React, { useState } from "react";
import Layout from "../core/Layout";

const AddVaccineCat = () => {
  const [name, setName] = useState("CoronaVirus");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("Covid vaccine");
  const [medicine, setMedicine] = useState("");
  const [effects, setEffects] = useState("Dizzy");

  const types = ["mRNA", "Inactivated", "Live-attenuated"];
  const medicines = [
    { _id: "1", name: "Pfizer" },
    { _id: "2", name: "Moderna" },
    { _id: "3", name: "AstraZeneca" },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({ name, type, description, medicine, effects });
  };

  const AddVaccineCatForm = () => (
    <form onSubmit={submitHandler}>
      <div className="form-row">
        <div className="col-md-8">
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
        <div className="col-md-8">
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Type</label>
            <select
              onChange={(e) => setType(e.target.value)}
              className="form-control"
              id="exampleFormControlSelect1"
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
        <div className="col-md-8">
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Description</label>
            <textarea
              className="form-control"
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
        <div className="col-md-8">
          <div className="form-group">
            <label className="text-muted">Vaccine</label>
            <select
              onChange={(e) => setMedicine(e.target.value)}
              className="form-control"
            >
              <option>Select Vaccine</option>
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
        <div className="col-md-8">
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Effects</label>
            <textarea
              className="form-control"
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
        <div className="form-group mt-4 mb-0">
          <button className="btn btn-primary btn-block">
            Add Vaccine Category
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <Layout title="Category treatment Form">
      <>
        <h2 className="mb-4">Add Vaccine Category</h2>
        {AddVaccineCatForm()}
      </>
    </Layout>
  );
};

export default AddVaccineCat;