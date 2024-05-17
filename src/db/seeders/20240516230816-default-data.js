"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          login: "user",
          password: "pass",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "Dan",
          password: "pass",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "user_todos",
      [
        {
          user_id: 1,
          text: "new todo",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          text: "new todo",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "user_aims",
      [
        {
          user_id: 1,
          text: "работать миллионером",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "user_tasks",
      [
        {
          aim_id: 1,
          text: "купить крипту",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          aim_id: 1,
          text: "купить много недвижимости",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          aim_id: 1,
          text: "открыть бизнес",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "user_subtasks",
      [
        {
          task_id: 1,
          text: "найти работу",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task_id: 1,
          text: "заработать первый миллион",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task_id: 2,
          text: "найти работу получшe",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task_id: 2,
          text: "заработать второй, третий и четвертый миллионы",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task_id: 3,
          text: "найти работу с максимальной зарплатой и свободным графиком",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task_id: 3,
          text: "сдавать квартиру",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task_id: 3,
          text: "накопить N денег",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  // async down (queryInterface, Sequelize) {
  //   /**
  //    * Add commands to revert seed here.
  //    *
  //    * Example:
  //    * await queryInterface.bulkDelete('People', null, {});
  //    */
  // }
};
