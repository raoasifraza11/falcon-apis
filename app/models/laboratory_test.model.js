module.exports = (sequelize, Sequelize) => {
    const laboratory_test = sequelize.define("laboratory_tests", {
      facalysis:{
        type: Sequelize.STRING 
       },
      culture:{
        type: Sequelize.STRING 
     },
     sensitivity_test :{
      type: Sequelize.STRING 
   },
    differential:{
      type: Sequelize.JSON 
    },
    biochemistry:{
      type: Sequelize.JSON 
    },
    endoscopy:{
      type: Sequelize.JSON 
    },
    crop_endoscopy:{
      type: Sequelize.STRING 
    },
    radiology:{
      type: Sequelize.STRING 
    },
    status:{
    type: Sequelize.TINYINT.UNSIGNED,
    defaultValue: 0
     }
    });
  
    return laboratory_test;
  };