const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("scholarsurf", "root", "sharkGym88", {
    host: "localhost",
    dialect: "mysql",
});

sequelize
    .authenticate()
    .then(() => console.log("✅ MySQL Connected"))
    .catch((err) => console.error("❌ MySQL Connection Error:", err));

module.exports = sequelize;