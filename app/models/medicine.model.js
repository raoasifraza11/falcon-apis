module.exports = (sequelize, Sequelize) => {
    const Medicine = sequelize.define("medicines", {
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Medicine;
  };