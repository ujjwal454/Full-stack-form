const express = require("express");
const createUserTable = require("./src/db/user/user-table");
const userRoutes = require("./src/user");

const app = express();
const port = 3000;

async function main() {
  await createUserTable();

  app.use(express.json());

  app.use("/users", userRoutes);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main();
