module.exports = (sequelize, Sequelize) => {
    const Clinic = sequelize.define("clinics", {
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Clinic;
  };