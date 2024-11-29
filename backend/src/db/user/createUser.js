const dbClient = require("../config");

const createUser = async (data) => {
  const query = `INSERT INTO users (firstName, lastName, username, password, email)
VALUES ($1, $2, $3, $4, $5) RETURNING id, firstName, lastName, username, email;`;

  const { firstName, lastName, username, password, email } = data;

  const values = [firstName, lastName, username, password, email];

  try {
    const result = await dbClient.query(query, values);
    const newUser = result.rows[0];
    console.log("New user created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Unable to create user");
  }
};

module.exports = createUser;
