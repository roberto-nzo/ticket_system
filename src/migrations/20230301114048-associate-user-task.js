'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('UserTasks', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      TaskId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Tasks",
          key: "id"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('UserTasks')
  }
};
