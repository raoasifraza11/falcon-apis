module.exports = (sequelize, Sequelize) => {
    const Pet = sequelize.define("pet_admissions", {
      date: {
        type: Sequelize.DATE    
      },
      trainer_name: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      previos_trainer_name: {
        type: Sequelize.STRING
      },
      presented_by_worker: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      primary_patient_evaluation: {
        type: Sequelize.TEXT
      },
      weight: {
        type: Sequelize.STRING
      },
      feathers: {
        type: Sequelize.STRING
      },
      physical_appearance: {
        type: Sequelize.TEXT
      },
      dehydration_status: {
        type: Sequelize.STRING
      },
      any_wound_or_laceration_on_the_body: {
        type: Sequelize.TEXT
      },
      appetite_status_and_eating_behavior: {
        type: Sequelize.TEXT
      }, 
      status: {
        type: Sequelize.STRING,
        defaultValue: 'inprogress'
      },
      is_deleted: {
        type: Sequelize.STRING,
        defaultValue: 0
      }
    });
  
    return Pet;
  };