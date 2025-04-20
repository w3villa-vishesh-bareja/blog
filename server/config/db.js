import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("blogApp", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

async function testSequelizeConnection() {
    try {
      await sequelize.authenticate();
      console.log("Sequelize connected to MySQL successfully");
    } catch (error) {
      console.error("Unable to connect to the database via Sequelize:", error.message);
    }
  }
  
testSequelizeConnection();