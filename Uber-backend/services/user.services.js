const userModel = require("../models/user.model");

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  // ✅ FIX 1: Use `new userModel(...)` instead of `new userModel.create(...)`
  const user = new userModel({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  // ✅ FIX 2: Save the user to the database
  await user.save();

  return user;
};
