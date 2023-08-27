module.exports = (sequelize, Sequelize) => {
    const Examination = sequelize.define("examinations", {
      diagnosis:{
        type: Sequelize.TEXT 
      },
      allergy_to_isoflorane_or_other_antesthetics:{
        type: Sequelize.TEXT
      },
      others:{
        type: Sequelize.TEXT
      },
      history_a: {
        type: Sequelize.TEXT
      },
      history_b: {
        type: Sequelize.TEXT
      },
      history_c: {
        type: Sequelize.TEXT
      },
      history_d: {
        type: Sequelize.TEXT
      },
      history_d: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.TINYINT.UNSIGNED,
        defaultValue: 0
      },
     
    });
  
    return Examination;
  };
  