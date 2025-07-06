const userModel=require("../models/user.model");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const BlacklistToken = require("../models/blacklistToken.model");
const captainModel = require("../models/caption.model");

module.exports.authUser = async (req,res,next)=>{
    const token=req.cookies.token || req.header.authorization?.split(' ')[ 1 ];

    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }

    isBlacklisted=await BlacklistToken.findOne({ token : token})

    if(isBlacklisted){
        return res.status(401).json({ message:'Unauthorized'})
    }
    try{ 
        const decoded=jwt.verify(token,process.env.jwt_secret);
        const user=await userModel.findById(decoded._id);

        req.user=user;
        
        return next();  

    }catch(err){
        return res.status(401).json({message:"Unauthorized"})
    }
}

module.exports.authCaption = async (req,res,next)=>{
    
    const token=req.cookies.token || req.header.authorization?.split(' ')[ 1 ];
    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }

    isBlacklisted=await BlacklistToken.findOne({ token : token})
    
    if(isBlacklisted){
        return res.status(401).json({ message:'Unauthorized'})
    }
    try{ 
        const decoded=jwt.verify(token,process.env.jwt_secret);
        const caption=await captainModel.findById(decoded._id);
        req.caption=caption;
        
        return next();

    } catch(err){
        res.status(401).json({message:"Unauthorized"})
    }



}