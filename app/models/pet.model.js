module.exports = (sequelize, Sequelize) => {
    const Pet = sequelize.define("pets", {
      breed: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      ring_no_left: {
        type: Sequelize.STRING
      },
      ring_no_right: {
        type: Sequelize.STRING
      },
      pit_no: {
        type: Sequelize.STRING
      },
    });
  
    return Pet;
  };