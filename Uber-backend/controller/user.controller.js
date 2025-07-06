const userService=require("../services/user.services");
const validatorError= require("../routes/user.routes");
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const BlacklistTokenModel=require('../models/blacklistToken.model')

module.exports.registerUser = async function (req, res, next) {
  try {
    // 1. Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 2. Extract and sanitize input
    const { fullname, email, password } = req.body;

    // 3. Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // 4. Hash password
    const hashedPassword = await userModel.hashPassword(password);

    // 5. Create user
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    // 6. Generate JWT token
    const token = await user.generateAuthToken();

    res.cookie('token',token);

    // 7. Success response (exclude password)
    const { password: _, ...userData } = user.toObject(); // remove password
    res.status(201).json({ token, user: userData });

  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  return res.status(200).json({
    token,
    user,
  });
  
};


module.exports.getUserProfile= async( req, res, next)=>{
    res.json()
}
module.exports.logoutUser= async (req,res,next)=>{
  
    res.clearCookie("token");

    const token=req.cookie.token || req.headers.authorization.split(' ')[1];

    res.status(200).json({message:'logged out'});
}

    
