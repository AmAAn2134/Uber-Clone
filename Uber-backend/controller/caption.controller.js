const BlacklistToken = require('../models/blacklistToken.model');
const captionModel=require('../models/caption.model');
const captainService=require('../services/caption.services');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


// Create a new caption
module.exports.registerCaptain=async function(req,res,next){

    const error=validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainExists = await captionModel.findOne({ email });

    if(isCaptainExists){
        return res.status(409).json({error:"Email already registered"});
    }
    // Hash the password before saving it to the database

    const hashedPassword = await captionModel.hashPassword(password);

    const captain = await captionModel.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email:email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicle: vehicle.vehicleType,
     });

     const token=await captainService.generateToken(captain);
     res.json(token,captain);
}
module.exports.loginCaptain=async function(req,res,next){
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }
    const { email, password } = req.body;
    const captain=await captionModel.findOne({ email });
    if(!captain ||!(await captain.comparePassword(password))){
        return res.status(401).json({error:"Invalid email or password"});
    }

    const token=await captainService.generateToken();
    res.cookie('token',token);
    res.json(token,captain);

}
module.exports.getCaptainProfile = async function(req,res,next){
    res.json(req.captain);
}

module.exports.logoutCaptain=async function(req,res,next){
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    await BlacklistToken.create(token);

    res.clearCookie("token");

    res.status(200).json({message:'Logged out'});
}
