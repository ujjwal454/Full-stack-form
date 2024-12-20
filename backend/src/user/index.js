const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const createUser = require("../db/user/createUser");
const extractErrorField = require("../utils/extract-error-field");

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
      password: hashedPassword,
    };

    const user = await createUser(data);

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    if (error.code === "23505") {
      console.log(error);

      const errorField = extractErrorField(error);

      return res
        .status(400)
        .json({ error: "duplicate_value", key: errorField });
    }

    return res
      .status(400)
      .json({ error: "An error occurred", details: error.message });
  }
});

module.exports = router;
