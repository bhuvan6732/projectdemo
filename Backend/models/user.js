"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      Name: { type: DataTypes.STRING },
      Age: { type: DataTypes.INTEGER },
      Email: { type: DataTypes.STRING },
      Password: { type: DataTypes.STRING },
      Aadhar: { type: DataTypes.STRING },
      Address: { type: DataTypes.STRING },
      Phone: { type: DataTypes.STRING },
      EmergencyContact: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
