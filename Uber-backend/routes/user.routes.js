const express=require("express");
const router = express.Router();
const { body }=require("express-validator");
const userController=require("../controller/user.controller");
const authMiddleware=require("../middlewares/auth.middleware")

router.post("/register",[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname').isLength({min:3}).withMessage("First Name must be 3 letter or more than 3"),
    body('password').isLength({min:6}).withMessage("Password must be 5 letters")
],
   userController.registerUser
)
router.post("/login",[
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min :6}).withMessage("Password is incorrect")
],
   userController.loginUser
)

router.get('/profile',authMiddleware.authUser,userController.getUserProfile)
router.get('/logout',authMiddleware.authUser,userController.logoutUser)

module.exports=router;