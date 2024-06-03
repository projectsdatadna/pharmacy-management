
import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useParams } from "react-router-dom";
import { medicines } from "./ListMedicine";

const UpdateMedicine = () => {
  const { id } = useParams();

  const [name, setName] = useState("Panadol");
  const [genericName, setGenericName] = useState("Paracetamol");
  const [batchNo, setBatchNo] = useState(123456);
  const [barCode, setBarCode] = useState(789012);
  const [description, setDescription] = useState(
    "Common pain relief medicine."
  );
  const [quantity, setQuantity] = useState(100);
  const [unitWeight, setUnitWeight] = useState(500);
  const [type, setType] = useState("Tablet");
  const [manDate, setManDate] = useState(new Date());
  const [expDate, setExpDate] = useState(new Date());
  const [cost, setCost] = useState(500);
  const [retailCost, setRetailCost] = useState(600);
  const [effects, setEffects] = useState("May cause dizziness.");
  const [vendor, setVendor] = useState("Vendor A");

  useEffect(() => {
    const getMedicineById = (id) => {
      return medicines.find((medicine) => medicine._id === id);
    };
    const medicine = getMedicineById(id);
    if (medicine) {
      setName(medicine.name);
      setGenericName(medicine.genericName);
      setBatchNo(medicine.batchNo);
      setBarCode(medicine.barCode);
      setQuantity(medicine.barCode);
      setType(medicine.type);
      setManDate(moment(medicine.manDate).format("YYYY-MM-DD"));
      setExpDate(moment(medicine.expDate).format("YYYY-MM-DD"));
      setCost(medicine.cost);
      setVendor(medicine.vendor.name);
    }
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Add your submit logic here
    console.log("Form submitted");
  };

  const UpdateMedicineForm = () => (
    <div className="form-group col-md-12">
      <form onSubmit={submitHandler}>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="inputAddress">Name</label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="e.g Panadol"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputAddress">Generic Name</label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="e.g Paracetamol"
              value={genericName}
              onChange={(e) => setGenericName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputAddress">Batch No</label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="batch no"
              value={batchNo}
              onChange={(e) => setBatchNo(e.target.value)}
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputAddress">Bar Code</label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="barcode no"
              value={barCode}
              onChange={(e) => setBarCode(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <label htmlFor="inputAddress">Quantity</label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="form-group col-md-1">
            <label htmlFor="inputAddress">Unit Weight</label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="weight"
              value={unitWeight}
              onChange={(e) => setUnitWeight(e.target.value)}
            />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="exampleFormControlSelect1">Type</label>
            <select
              onChange={(e) => setType(e.target.value)}
              className="form-control styled-select"
              id="exampleFormControlSelect1"
              value={type}
            >
              <option>Select Type</option>
              <option value="Tablet">Tablet</option>
              <option value="Capsule">Capsule</option>
              <option value="Syrup">Syrup</option>
              {/* Add more types as needed */}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <label htmlFor="inputAddress">Manufacture </label>
            <div className="input-container">
            <DatePicker
              selected={manDate}
              onChange={(date) => setManDate(date)}
              className="form-control input-shadow1"
            />
            <div className="icon-container">
            
            <i className="fa fa-calendar" style={{color:"blue"}}></i>
    
          </div>
          </div>
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="inputAddress">Expiry</label>
            <div className="input-container">
            <DatePicker
              selected={expDate}
              onChange={(date) => setExpDate(date)}
              className="form-control input-shadow1"
            />
            <div className="icon-container">
            
            <i className="fa fa-calendar" style={{color:"blue"}}></i>
    
          </div>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-1">
            <label htmlFor="inputAddress">Cost</label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="e.g ksh 2500"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>

          <div className="form-group col-md-1">
            <label htmlFor="inputAddress">Retail Cost</label>
            <input
              type="text"
              className="form-control input-shadow"
              placeholder="e.g ksh 1700"
              value={retailCost}
              onChange={(e) => setRetailCost(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <label className="text-muted">Vendor</label>
            <select
              onChange={(e) => setVendor(e.target.value)}
              className="form-control styled-select"
              value={vendor}
            >
              <option>Select Vendor</option>
              <option value="Vendor A">Vendor A</option>
              <option value="Vendor B">Vendor B</option>
              <option value="Vendor C">Vendor C</option>
              {/* Add more vendors as needed */}
            </select>
          </div>

          <div className="form-group col-md-3">
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

          <div className="form-group col-md-3">
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

        <button type="submit" className="btn btn-primary" style={{width:"10%",textAlign:"center"}}>
          Save
        </button>
      </form>
    </div>
  );

  return (
    <Layout title="Update Medicine">
      <>
        <h2 className="mb-4">Update Medicine</h2>
        {UpdateMedicineForm()}
      </>
    </Layout>
  );
};

export default UpdateMedicine;