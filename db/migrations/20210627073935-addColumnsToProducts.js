"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Products", "name", Sequelize.STRING);
    await queryInterface.addColumn("Products", "slug", Sequelize.STRING);
    await queryInterface.addColumn("Products", "price", Sequelize.INTEGER);
    await queryInterface.addColumn("Products", "description", Sequelize.STRING);
    await queryInterface.addColumn("Products", "image", Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Products", "name");
    await queryInterface.removeColumn("Products", "slug");
    await queryInterface.removeColumn("Products", "price");
    await queryInterface.removeColumn("Products", "description");
    await queryInterface.removeColumn("Products", "image");
  },
};
