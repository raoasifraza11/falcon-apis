module.exports = (sequelize, Sequelize) => {
    const laboratory_test = sequelize.define("laboratory_test_images", {
      name:{
        type: Sequelize.STRING 
       },
       filename:{
        type: Sequelize.STRING 
       },
    status:{
    type: Sequelize.TINYINT.UNSIGNED,
    defaultValue: 0
     }
    });
  
    return laboratory_test;
  };