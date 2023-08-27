module.exports = (sequelize, Sequelize) => {
    const Doctor = sequelize.define("doctors", {
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Doctor;
  };