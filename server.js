const express = require("express");
const cors = require("cors");
var bcrypt = require("bcryptjs");
const swaggerUI = require("swagger-ui-express");
const YML = require("yamljs");
const swaggerJsDoc = YML.load("./api.yaml");
const fileUpload = require("express-fileupload");
var path = require('path');

// const morgan = require('morgan')

// morgan.token('id', (req) => {
//   req.id.split('-')[0]
// })

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

const app = express();

app.use(fileUpload());
app.use(cors("*"));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to Falcon Clinic");
});

// require lib
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/examination.routes")(app);
require("./app/routes/pet.routes")(app);
require("./app/routes/dashboard.routes")(app);
require("./app/routes/pet_admission.routes")(app);
require("./app/routes/doctor.routes")(app);
require("./app/routes/clinic.routes")(app);
require("./app/routes/medicine.routes")(app);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));
// app.use('/app/upload', express.static(PATH))
// app.use(express.static('app/upload'));
// app.use('/upload', express.static(__dirname + 'app/upload'));
// app.use(express.static(path.join(__dirname, 'app/upload')));
app.use('/upload', express.static('app/upload'));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// database
const db = require("./app/models");
const User = db.user;
const Doctor = db.doctor;
const Clinic = db.clinic;
const Medicine = db.medicice;

const synchronizeDatabase = process.env.SYNC_DB === "true";

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  initial();
  console.log("Drop and Resync Database with { force: true }");
});

// play transaction
async function insertDataWithTransaction(Model, dataArray, transaction) {
  try {
    await Promise.all(
      dataArray.map(async (data) => {
        await Model.create(data, { transaction });
      })
    );
    console.log(`${Model.name}s created successfully.`);
  } catch (error) {
    console.error(`Error creating ${Model.name}s:`, error);
  }
}

function initial() {
  // username list
  const usersNames = [
    {
      username: "salman",
      firstname: "Salman",
      lastname: "Khan",
      email: "salman@margham.app",
      isAdmin: 1,
      password: bcrypt.hashSync("12345678", 8),
    },
    {
      username: "shoaib",
      firstname: "Shoaib",
      lastname: "Khan",
      email: "shoaib@margham.app",
      isAdmin: 0,
      password: bcrypt.hashSync("12345678", 8),
    },
    {
      username: "imran",
      firstname: "Imran",
      lastname: "Khan",
      email: "imran@margham.app",
      isAdmin: 0,
      password: bcrypt.hashSync("12345678", 8),
    },
  ];

  // clinic list
  const ClinicNames = [
    "MARGHAM / مرغم",
    "UZBAKISTAN / أوزبكستان",
    "MOROCCO / المغرب",
  ];

  // doctors list
  const doctorNames = ["DR. SALMAN", "DR. SHOAIB", "DR. IMRAN"];

  // medicine list
  const medicineNames = [
    "Marbocyle Tablets",
    "Marbocyl Injection",
    "Augmentine Tablets",
    "Augmentin Powder For Susspension",
  ];

  db.sequelize.transaction(async (transaction) => {
    await insertDataWithTransaction(User, usersNames, transaction);
    await insertDataWithTransaction(
      Clinic,
      ClinicNames.map((name) => ({ name })),
      transaction
    );
    await insertDataWithTransaction(
      Doctor,
      doctorNames.map((name) => ({ name })),
      transaction
    );
    await insertDataWithTransaction(
      Medicine,
      medicineNames.map((name) => ({ name })),
      transaction
    );
  });
}
