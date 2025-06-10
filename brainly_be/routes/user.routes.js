const express=require("express");
const router = express.Router();
const { body }=require("express-validator");
const userController=require("../controller/user.controller");

router.post("/register",[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage("First Name must be 3 letter or more than 3"),
    body('password').isLength({min:6}).withMessage("Password must be 5 letters")
],
   userController.registerUser
)
 
module.exports=router;