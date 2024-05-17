"use strict";
const { Model } = require("sequelize");
const user_aim = require("./user_aim");
module.exports = (sequelize, DataTypes) => {
  class user_task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_task.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      aim_id: {
        type: DataTypes.INTEGER,
        references: {
          model: user_aim,
          key: "id",
        },
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user_task",
    }
  );
  return user_task;
};
