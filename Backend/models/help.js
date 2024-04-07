"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Help extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Help.init(
    {
      token: DataTypes.STRING,
      user_id: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      altitude: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Help",
    }
  );
  return Help;
};
