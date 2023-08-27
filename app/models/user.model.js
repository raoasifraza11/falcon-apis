module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      isAdmin: {
        type: Sequelize.TINYINT.UNSIGNED
      }
    });
  
    return User;
  };