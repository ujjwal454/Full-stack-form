const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const createUser = require("../db/user/createUser");

router.post("/create", async (req, res) => {
  const { firstName, lastName, username, password, email } = req.body;

  if (!firstName || !lastName || !username || !password || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      firstName,
      lastName,
      username,
      email,
      hashedPassword,
    };
    const user = await createUser(data);
    res.status(201).json({ message: "user created", user });
  } catch (error) {}
});

module.exports = router;
