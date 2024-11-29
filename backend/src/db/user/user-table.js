const dbClient = require("../config");

const createUserTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);
  `;
  try {
    await dbClient.query(query);
    console.log("tables created or exists");
  } catch (error) {
    console.log("error while creating user tables", error);
  }
};

module.exports = createUserTable;
