"use strict";
const { Model } = require("sequelize");
const user_task = require("./user_task");
module.exports = (sequelize, DataTypes) => {
  class user_subtask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_subtask.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      task_id: {
        type: DataTypes.INTEGER,
        references: {
          model: user_task,
          key: "id",
        },
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "user_subtask",
    }
  );
  return user_subtask;
};
