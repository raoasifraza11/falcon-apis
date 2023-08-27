module.exports = (sequelize, Sequelize) => {
    const Examination_procedure = sequelize.define("examination_procedures", {
      full_checkup: {
        type: Sequelize.TINYINT.UNSIGNED  
      },
      crop_checkup: {
        type: Sequelize.TINYINT.UNSIGNED
      },
      blood_and_crop: {
        type: Sequelize.TINYINT.UNSIGNED
      },
      feather_repairing: {
        type: Sequelize.TINYINT.UNSIGNED
      },
      coping: {
        type: Sequelize.TINYINT.UNSIGNED
      },
      marshal_clip: {
        type: Sequelize.TINYINT.UNSIGNED
      },
      others: {
        type: Sequelize.TINYINT.UNSIGNED
      },
    });
  
    return Examination_procedure;
  };
  