import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./user/AdminDashboard";
import Profile from "./user/Profile";
import ListUsers from "./admin/ListUsers";
import ListExpenses from "./admin/ListExpenses";
import AddExpense from "./admin/AddExpense";
import UpdateExpenses from "./admin/UpdateExpenses";
import ListPatients from "./admin/ListPatients";
import AddPatientDetails from "./admin/AddPatientDetails";
import UpdatePatientProfile from "./admin/UpdatePatientProfile";

import ListDoctors from "./admin/ListDoctors";
import AddDoctorDetails from "./admin/AddDoctorDetails";
import UpdateDoctorProfile from "./admin/UpdateDoctorProfile";
import ListMedicine from "./admin/ListMedicine";
import AddMedicine from "./admin/AddMedicine";
import UpdateMedicine from "./admin/UpdateMedicine";


import ListVaccineCat from "./admin/ListVaccineCat";
import AddVaccineCat from "./admin/AddVaccineCat";
import UpdateVaccineCat from "./admin/UpdateVaccineCat";

import ListAppVaccine from "./admin/ListAppVaccine";
// import AddAppVaccine from "./admin/AddAppVaccine";
// import UpdateVaccApp from "./admin/UpdateVaccApp";

import ListVendors from "./admin/ListVendors";
import FileUpload from "./admin/FileUpload";
import InvoiceForm from "./admin/CreateBill";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/list/users" element={<ListUsers />} />
        <Route path="/list-expenses" element={<ListExpenses />} />
        <Route path="/add-expenses" element={<AddExpense />} />
        <Route path="/update-expenses/:patientId" element={<UpdateExpenses />} />
        <Route path="/list-patients" element={<ListPatients />} />
        <Route path="/add-patient-details" element={<AddPatientDetails />} />
        <Route path="/update-patient" element={<UpdatePatientProfile />} />

        <Route path="/list-doctors" element={<ListDoctors />} />
        <Route path="/add-doctor" element={<AddDoctorDetails />} />
        <Route path="/update-doctor" element={<UpdateDoctorProfile />} />
        <Route path="/list/medicine" element={<ListMedicine />} />
        <Route path="/add-medicine" element={<AddMedicine />} />
        <Route path="/update-medicine/:id" element={<UpdateMedicine />} />

        <Route path="/list-vaccine-cat" element={<ListVaccineCat />} />
        <Route path="/add-vac-cat" element={<AddVaccineCat />} />
        <Route path="/update-vaccine-cat/:id" element={<UpdateVaccineCat />} />

        <Route path="/list-app-vaccine" element={<ListAppVaccine />} />
        {/* <Route path="/add-vacc-app" element={<AddAppVaccine />} /> */}
        {/* <Route path="/update-vacc-app" element={<UpdateVaccApp />} /> */}

        <Route path="/list-vendors" element={<ListVendors />} />
        <Route path="/file-upload" element={<FileUpload />} />

        <Route path="/create-bill" element={<InvoiceForm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
