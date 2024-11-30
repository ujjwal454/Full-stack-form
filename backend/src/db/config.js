const { Client } = require("pg");

const client = new Client({
  host: "dpg-ct5ee23tq21c7398en80-a",
  user: "form_backend_user",
  password: "Ofga1arB4amcZgcUdNURzpjVUtgE4ftW",
  database: "form_backend",
  port: 5432,
});

client.connect();

module.exports = client;
