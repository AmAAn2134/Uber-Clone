const express=require("express");
const router=express.Router();
const { body }=require("express-validator");
const captionController=require("../controller/caption.controller");
const authMiddleware=require("../middlewares/auth.middleware")

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name must be 3 letter or more than 3'),
    body('password').isLength({min:6}).withMessage('Password must be 5 letters'),
    body('vechicle.color').isLength({min:3}).withMessage('Color must be 3 letters or more than 3'),
     body('vechicle.plate').isLength({min:3}).withMessage('Model must be 3 letters or more than 3'),
     body('vechicle.capacity').isInt({min:1}).withMessage('capacity must be a positive integer'),
     body('vechicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type'),
],
    captionController.registerCaptain  
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password is incorrect')
],
    captionController.loginCaptain
)

router.get('/profile',authMiddleware.authCaption,captionController.getCaptainProfile);
router.get('/logout',authMiddleware.authCaption,captionController.logoutCaptain);


module.exports=router;