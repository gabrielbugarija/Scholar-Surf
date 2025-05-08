const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Scholarship = sequelize.define("Scholarship", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    eligiblePrograms: {
        type: DataTypes.STRING, // comma-separated list like "CS,ENG,BUS"
        allowNull: true,
    },
    minYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    externalLink: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Scholarship;