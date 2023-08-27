module.exports = (sequelize, Sequelize) => {
    const Examination_medicine = sequelize.define("examination_medicines", {
      medicine_type: {
        type: Sequelize.STRING
      },
      dose: {
        type: Sequelize.STRING
      },
      times_daily: {
        type: Sequelize.STRING
      },
      before_food: {
        type: Sequelize.STRING
      },
      after_food: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      }
    });
  
    return Examination_medicine;
  };