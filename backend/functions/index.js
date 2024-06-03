const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hospital-doctors-datadna.firebaseio.com",
});

const medicineApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hospital-medicine-datadna.firebaseio.com",
}, "medicineApp");

const treatmentApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hospital-medicine-treatment-datadna.firebaseio.com",
}, "treatmentApp");

const patientApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://datadna-hms-patient-fulldetails.firebaseio.com",
}, "patientApp");

// expenses dashboard
const expenseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://datadna-hms-expense-details.firebaseio.com",
}, "expenseApp");

// dashboard expenses connection
const dashboardExpense = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hospital-expenses1.firebaseio.com",
}, "dashboardExpense");

const db = dashboardExpense.database();

const filterDataByDate = async (fromDate, toDate) => {
  const ref = db.ref();
  console.log("ref:", ref);
  const snapshot = await ref.once("value");
  const data = snapshot.val();
  console.log("data:".data);

  const filteredData = [];
  let totalAmountSum = 0;
  let paidSum = 0;
  let balanceSum = 0;

  const from = new Date(fromDate);
  const to = new Date(toDate);

  // Iterate over the array of patient records
  data.forEach((entry) => {
    const entryDate = new Date(entry.Date.split("/").reverse().join("-"));
    if (entryDate >= from && entryDate <= to) {
      filteredData.push(entry);
      totalAmountSum += parseFloat(entry.total_amount);
      paidSum += parseFloat(entry.Paid);
      balanceSum += parseFloat(entry.Balance);
    }
  });

  return {
    filteredData,
    totalAmountSum,
    paidSum,
    balanceSum,
  };
};


// Create a doctor
app.post("/doctors", (req, res) => {
  const {docId, doctorData} = req.body;
  admin.database().ref().child(docId).set(doctorData)
      .then(() => res.status(201).send("Doctor added successfully"))
      .catch((error) => res.status(500).send(error.message));
});

// Read a doctor
app.get("/doctors/:doc_id", (req, res) => {
  const docId = req.params.doc_id;
  console.log(`Received request for doctor ID: ${docId}`);
  admin.database().ref(docId).once("value", (snapshot) => {
    if (snapshot.exists()) {
      const doctorName = snapshot.val()["Doctor's Name"];
      res.status(200).send(doctorName);
    } else {
      res.status(404).send("Doctor not found");
    }
  }).catch((error) => {
    res.status(500).send("Error retrieving doctor's name");
  });
});

// Update a doctor
app.put("/doctors/:doc_id", (req, res) => {
  const docId = req.params.doc_id;
  console.log("docId:", docId);
  const updatedDoctorData = req.body;
  console.log("updatedDoctorData:", updatedDoctorData);
  const doctorNameUpdate = {
    "Doctor's Name": updatedDoctorData["Doctor's Name"],
  };
  console.log("update:", doctorNameUpdate);

  admin.database().ref(docId).update(doctorNameUpdate)
      .then(() => {
        res.status(200).send("Doctor updated successfully");
      })
      .catch((error) => {
        res.status(500).send("Error updating doctor information");
      });
});

// Delete a doctor
app.delete("/doctors/:doc_id", (req, res) => {
  const docId = req.params.doc_id;
  admin.database().ref(docId).remove()
      .then(() => res.status(200).send("Doctor deleted successfully"))
      .catch((error) => {
        res.status(500).send(error.message);
      });
});


// medicine details post,update,put,delete

app.post("/medicines", (req, res) => {
  const {medId, medicineData} = req.body;
  medicineApp.database().ref().child(medId).set(medicineData)
      .then(() => res.status(201).send("Medicine added successfully"))
      .catch((error) => res.status(500).send(error.message));
});

app.get("/medicines/:med_id", (req, res) => {
  const medId = req.params.med_id;
  medicineApp.database().ref(medId).once("value", (snapshot) => {
    if (snapshot.exists()) {
      const medicineName = snapshot.val()["medicine_desc"];
      res.status(200).send(medicineName);
    } else {
      res.status(404).send("Medicine not found");
    }
  }).catch((error) => {
    res.status(500).send("Error retrieving medicine's name");
  });
});

app.put("/medicines/:med_id", (req, res) => {
  const medId = req.params.med_id;
  const updatedMedicineData = req.body;
  const medicineNameUpdate = {
    "medicine_desc": updatedMedicineData["medicine_desc"],
  };

  medicineApp.database().ref(medId).update(medicineNameUpdate)
      .then(() => {
        res.status(200).send("Medicine updated successfully");
      })
      .catch((error) => {
        res.status(500).send("Error updating medicine information");
      });
});

app.delete("/medicines/:med_id", (req, res) => {
  const medId = req.params.med_id;
  medicineApp.database().ref(medId).remove()
      .then(() => res.status(200).send("Medicine deleted successfully"))
      .catch((error) => {
        res.status(500).send(error.message);
      });
});

// vaccine details post,put,get,delete

app.post("/vaccines", (req, res) => {
  const {vaccineId, vaccineData} = req.body;
  medicineApp.database().ref().child(vaccineId).set(vaccineData)
      .then(() => res.status(201).send("Vaccine added successfully"))
      .catch((error) => res.status(500).send(error.message));
});

app.get("/vaccines/:vaccine_id", (req, res) => {
  const vaccineId = req.params.vaccine_id;
  medicineApp.database().ref(vaccineId).once("value", (snapshot) => {
    if (snapshot.exists()) {
      const vaccineName = snapshot.val()["Vaccine's Name"];
      res.status(200).send(vaccineName);
    } else {
      res.status(404).send("Vaccine not found");
    }
  }).catch((error) => {
    res.status(500).send("Error retrieving vaccine's name");
  });
});

app.put("/vaccines/:vaccine_id", (req, res) => {
  const vaccineId = req.params.vaccine_id;
  const updatedVaccineData = req.body;
  const vaccineNameUpdate = {
    "Vaccine's Name": updatedVaccineData["Vaccine's Name"],
  };

  medicineApp.database().ref(vaccineId).update(vaccineNameUpdate)
      .then(() => {
        res.status(200).send("Vaccine updated successfully");
      })
      .catch((error) => {
        res.status(500).send("Error updating vaccine information");
      });
});

app.delete("/vaccines/:vaccine_id", (req, res) => {
  const vaccineId = req.params.vaccine_id;
  medicineApp.database().ref(vaccineId).remove()
      .then(() => res.status(200).send("Vaccine deleted successfully"))
      .catch((error) => {
        res.status(500).send(error.message);
      });
});


// treatment details of post,put,create,delete
app.post("/treatments", (req, res) => {
  const {treatmentId, treatmentData} = req.body;
  treatmentApp.database().ref().child(treatmentId).set(treatmentData)
      .then(() => res.status(201).send("Treatment added successfully"))
      .catch((error) => res.status(500).send(error.message));
});

app.get("/treatments/:treatment_id", (req, res) => {
  const treatmentId = req.params.treatment_id;
  treatmentApp.database().ref(treatmentId).once("value", (snapshot) => {
    if (snapshot.exists()) {
      const treatmentName = snapshot.val()["Treatment"];
      res.status(200).send(treatmentName);
    } else {
      res.status(404).send("Treatment not found");
    }
  }).catch((error) => {
    res.status(500).send("Error retrieving treatment's name");
  });
});

app.put("/treatments/:treatment_id", (req, res) => {
  const treatmentId = req.params.treatment_id;
  const updatedTreatmentData = req.body;
  const treatmentNameUpdate = {
    "Treatment's Name": updatedTreatmentData["Treatment"],
  };

  treatmentApp.database().ref(treatmentId).update(treatmentNameUpdate)
      .then(() => {
        res.status(200).send("Treatment updated successfully");
      })
      .catch((error) => {
        res.status(500).send("Error updating treatment information");
      });
});

app.delete("/treatments/:treatment_id", (req, res) => {
  const treatmentId = req.params.treatment_id;
  treatmentApp.database().ref(treatmentId).remove()
      .then(() => res.status(200).send("Treatment deleted successfully"))
      .catch((error) => {
        res.status(500).send(error.message);
      });
});

// Patient details post, get, update, delete

app.post("/patients", (req, res) => {
  const {patientId, patientData} = req.body;
  patientApp.database().ref().child(patientId).set(patientData)
      .then(() => res.status(201).send("Patient added successfully"))
      .catch((error) => res.status(500).send(error.message));
});

// Read a patient
app.get("/patients/:patient_id", (req, res) => {
  const patientId = req.params.patient_id;
  patientApp.database().ref(patientId).once("value", (snapshot) => {
    if (snapshot.exists()) {
      const patientName = snapshot.val()["Name"];
      res.status(200).send(patientName);
    } else {
      res.status(404).send("Patient not found");
    }
  }).catch((error) => {
    res.status(500).send("Error retrieving patient's name");
  });
});

// Update a patient
app.put("/patients/:patient_id", (req, res) => {
  const patientId = req.params.patient_id;
  const updatedPatientData = req.body;
  const patientNameUpdate = {
    "Name": updatedPatientData["Name"],
  };

  patientApp.database().ref(patientId).update(patientNameUpdate)
      .then(() => {
        res.status(200).send("Patient updated successfully");
      })
      .catch((error) => {
        res.status(500).send("Error updating patient information");
      });
});

// Delete a patient
app.delete("/patients/:patient_id", (req, res) => {
  const patientId = req.params.patient_id;
  patientApp.database().ref(patientId).remove()
      .then(() => res.status(200).send("Patient deleted successfully"))
      .catch((error) => {
        res.status(500).send(error.message);
      });
});

// Expense details post, update, get, delete

app.post("/expenses", (req, res) => {
  const {expenseId, expenseData} = req.body;
  expenseApp.database().ref().child(expenseId).set(expenseData)
      .then(() => res.status(201).send("Expense added successfully"))
      .catch((error) => res.status(500).send(error.message));
});

// app.get("/expenses/:expense_id", (req, res) => {
//   const expenseId = req.params.expense_id;
//   expenseApp.database().ref(expenseId).once("value", (snapshot) => {
//     if (snapshot.exists()) {
//       const expenseName = snapshot.val()["total_amount"];
//       res.status(200).send(expenseName);
//     } else {
//       res.status(404).send("Expense not found");
//     }
//   }).catch((error) => {
//     res.status(500).send("Error retrieving expense");
//   });
// });

// app.put("/expenses/:expense_id", (req, res) => {
//   const expenseId = req.params.expense_id;
//   const updatedExpenseData = req.body;
//   const expenseNameUpdate = {
//     "total_amount": updatedExpenseData["total_amount"],
//   };

//   expenseApp.database().ref(expenseId).update(expenseNameUpdate)
//       .then(() => {
//         res.status(200).send("Expense updated successfully");
//       })
//       .catch((error) => {
//         res.status(500).send("Error updating expense information");
//       });
// });

// app.delete("/expenses/:expense_id", (req, res) => {
//   const expenseId = req.params.expense_id;
//   expenseApp.database().ref(expenseId).remove()
//       .then(() => res.status(200).send("Expense deleted successfully"))
//       .catch((error) => {
//         res.status(500).send(error.message);
//       });
// });

// Read an expense by patient_id
app.get("/expenses/:patient_id", (req, res) => {
  const patientId = req.params.patient_id;
  expenseApp.database().ref().orderByChild("patient_id")
      .equalTo(parseInt(patientId)).once("value", (snapshot) => {
        if (snapshot.exists()) {
          const expenses = snapshot.val();
          res.status(200).json(expenses);
        } else {
          res.status(404).send("Expense not found");
        }
      }).catch((error) => {
        res.status(500).send("Error retrieving expense");
      });
});


app.put("/expenses/:patient_id", (req, res) => {
  const patientId = req.params.patient_id;
  const updatedExpenseData = req.body;


  expenseApp.database().ref().orderByChild("patient_id")
      .equalTo(parseInt(patientId)).once("value", (snapshot) => {
        if (snapshot.exists()) {
          const updates = {};
          snapshot.forEach((childSnapshot) => {
            updates[childSnapshot.key] = updatedExpenseData;
          });

          expenseApp.database().ref().update(updates)
              .then(() => res.status(200).send("Expense updated successfully"))
              .catch((error) => res.status(500)
                  .send("Error updating expense information"));
        } else {
          res.status(404).send("Expense not found");
        }
      }).catch((error) => {
        res.status(500).send("Error retrieving expense");
      });
});

app.delete("/expenses/:patient_id", (req, res) => {
  const patientId = req.params.patient_id;


  expenseApp.database().ref().orderByChild("patient_id")
      .equalTo(parseInt(patientId)).once("value", (snapshot) => {
        if (snapshot.exists()) {
          const updates = {};
          snapshot.forEach((childSnapshot) => {
            updates[childSnapshot.key] = null;
          });

          expenseApp.database().ref().update(updates)
              .then(() => res.status(200).send("Expenses deleted successfully"))
              .catch((error) => res.status(500)
                  .send("Error deleting expenses"));
        } else {
          res.status(404).send("Expenses not found");
        }
      }).catch((error) => {
        res.status(500).send("Error retrieving expenses");
      });
});

// dashboard sum calculate

app.get("/filterData", async (req, res) => {
  const fromDate = req.query.from;
  console.log("fromDate:", fromDate);
  const toDate = req.query.to;
  console.log("toDate:", toDate);

  try {
    const result = await filterDataByDate(fromDate, toDate);
    console.log("results:", result);
    res.json(result);
  } catch (error) {
    res.status(500).send("Error filtering data");
  }
});

app.get("/filterDataByDate", async (req, res) => {
  const fromDate = req.query.from;
  const toDate = req.query.to;

  try {
    // Fetch data from the database based on the date range
    const result = await filterDataByDate(fromDate, toDate);

    // Process the data to calculate the sum for each day
    const dailySum = {};

    result.filteredData.forEach((entry) => {
      const entryDate = new Date(entry.Date).toISOString().split("T")[0];
      if (!dailySum[entryDate]) {
        dailySum[entryDate] = 0;
      }
      dailySum[entryDate] += parseFloat(entry.total_amount);
    });

    // Prepare response data
    const responseData = Object.keys(dailySum).map((date) => ({
      date,
      totalAmountSum: dailySum[date],
    }));

    res.json(responseData);
  } catch (error) {
    res.status(500).send("Error filtering data");
  }
});

// // add patient details
// app.post("/submit", async (req, res) => {
//   const formData = req.body;

//   try {
//     const newRecordRef = patientApp.database().ref().push();
//     await newRecordRef.set(formData);
//     res.status(200).send({message: "Data saved successfully!"});
//   } catch (error) {
//     console.error("Error saving data: ", error);
//     res.status(500).send({error: "Error saving data"});
//   }
// });

app.post("/submit", async (req, res) => {
  const formData = req.body;

  try {
    const databaseSnapshot = await patientApp.database().ref().once("value");
    const databaseData = databaseSnapshot.val();

    let latestIndex = 0;
    if (databaseData) {
      latestIndex = Object.keys(databaseData)
          .filter((key) => !isNaN(key)) // Filter out non-numeric keys
          .reduce((maxIndex, key) => Math.max(maxIndex, parseInt(key)), 0);
    }


    const newIndex = latestIndex + 1;

    const newEntry = {
      [newIndex]: formData,
    };

    await patientApp.database().ref().update(newEntry);

    res.status(200).send({message: "Data saved successfully!"});
  } catch (error) {
    console.error("Error saving data: ", error);
    res.status(500).send({error: "Error saving data"});
  }
});

// expense add
app.post("/add-expense", async (req, res) => {
  try {
    // Fetch existing expenses
    const snapshot = await expenseApp.database().ref("/").once("value");
    const expensesData = snapshot.val() || {};

    // Find the latest numeric index
    const numericKeys = Object.keys(expensesData)
        .filter((key) => !isNaN(key)).map((key) => parseInt(key, 10));
    const latestIndex = numericKeys.length ? Math.max(...numericKeys) : 0;
    const newIndex = latestIndex + 1;

    // Data to be added
    const {PatientName, totalAmount, date, description, Paid, Balance,
      patientId} = req.body;
    const expenseData = {
      PatientName,
      totalAmount,
      date,
      description,
      Paid,
      Balance,
      patientId,
    };

    // Add new expense with incremented index
    await db.ref(`/${newIndex}`).set(expenseData);

    res.status(200)
        .send({message: `Expense added successfully with ID: ${newIndex}`});
  } catch (error) {
    res.status(500).send({error: "Error adding expense:" + error.message});
  }
});

app.get("/get-expenses", async (req, res) => {
  try {
    const snapshot = await expenseApp.database().ref()
        .orderByKey().limitToLast(20).once("value");
    const expensesData = snapshot.val() || {};

    const expensesArray = Object.keys(expensesData).map((key) => ({
      _id: key,
      ...expensesData[key],
    })).sort((a, b) => parseInt(a._id, 10) - parseInt(b._id, 10));

    res.status(200).send(expensesArray);
  } catch (error) {
    res.status(500)
        .send({error: "Error fetching expenses: "+ error.message});
  }
});

app.get("/get-expense/:patientId", async (req, res) => {
  const patientId = req.params.patientId;
  try {
    const snapshot = await expenseApp.database().ref()
        .orderByChild("patientId").equalTo(patientId).once("value");
    const expenseData = snapshot.val();
    if (expenseData) {
      const expenseArray = Object.keys(expenseData).map((key) => ({
        _id: key,
        ...expenseData[key],
      }));
      res.status(200).send(expenseArray[0]);
    } else {
      res.status(404).send({error: "Expense not found"});
    }
  } catch (error) {
    res.status(500).send({error: "Error fetching expense: " + error.message});
  }
});

app.put("/update-expense/:id", async (req, res) => {
  const patientId = req.params.id;
  console.log("expenseId:", patientId);
  const updatedData = req.body;

  try {
    const snapshot = await expenseApp.database().ref()
        .orderByChild("patientId").equalTo(patientId).once("value");
    const updates = {};

    snapshot.forEach((childSnapshot) => {
      updates[childSnapshot.key] = {...childSnapshot.val(), ...updatedData};
    });

    if (Object.keys(updates).length === 0) {
      return res.status(404)
          .send({error: "Expense not found for the given patientId"});
    }

    await db.ref().update(updates);
    res.status(200).send({message: "Expense updated successfully"});
  } catch (error) {
    res.status(500).send({error: "Error updating expense: " + error.message});
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

exports.api = functions.https.onRequest(app);
