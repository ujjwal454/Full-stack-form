const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "ujjwal",
  password: "1234",
  database: "testDB",
  port: 5432,
});

client.connect();

module.exports = client;
