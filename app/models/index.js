const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.clinic = require("../models/clinic.model.js")(sequelize, Sequelize);
db.doctor = require("../models/doctor.model.js")(sequelize, Sequelize);
db.pet = require("../models/pet.model.js")(sequelize, Sequelize);
db.pet_admission = require("../models/pet_admission.model.js")(sequelize, Sequelize);
db.examination = require("../models/examination.model.js")(sequelize, Sequelize);
db.examination_procedure = require("../models/examination_procedure.model.js")(sequelize, Sequelize);
db.laboratory_test = require("../models/laboratory_test.model.js")(sequelize, Sequelize)
db.laboratory_test_image = require("../models/laboratory_test_image.model.js")(sequelize, Sequelize)
db.medicice = require("../models/medicine.model.js")(sequelize, Sequelize)
db.examination_medicine = require("./examination_medicine.model.js")(sequelize, Sequelize)

db.pet.hasMany(db.examination);
db.examination.belongsTo(db.pet);

db.clinic.hasMany(db.examination);
db.examination.belongsTo(db.clinic);

db.doctor.hasMany(db.examination);
db.examination.belongsTo(db.doctor);

db.examination.hasOne(db.examination_procedure);
db.examination_procedure.belongsTo(db.examination);

db.examination.hasMany(db.laboratory_test);
db.laboratory_test.belongsTo(db.examination);

db.laboratory_test.hasMany(db.laboratory_test_image);
db.laboratory_test_image.belongsTo(db.laboratory_test);

db.pet.hasMany(db.laboratory_test);
db.laboratory_test.belongsTo(db.pet);

db.examination.hasMany(db.examination_medicine);
db.examination_medicine.belongsTo(db.examination);


db.medicice.hasMany(db.examination_medicine);
db.examination_medicine.belongsTo(db.medicice);

// db.examination.belongsToMany(db.medicice, { through: 'Examination_Medicice' });
// db.medicice.belongsToMany(db.examination, { through: 'Examination_Medicice' });

db.pet.hasMany(db.pet_admission);
db.pet_admission.belongsTo(db.pet);

db.clinic.hasMany(db.pet_admission);
db.pet_admission.belongsTo(db.clinic);


db.pet_admission.hasMany(db.examination);
db.examination.belongsTo(db.pet_admission);


db.doctor.hasMany(db.pet_admission);
db.pet_admission.belongsTo(db.doctor);






module.exports = db;