const capitalModel=require('../models/caption.model');
module.exports.createCapital = async (
    
    firstname,lastname,email,password,color,plate,capacity,vehicleType

) =>{
if(!firstname ||!lastname ||!email ||!password ||!color ||!plate ||!capacity ||!vehicleType){
    throw new  Error('All fields are required');
}
    const capital=capitalModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return capital;
}


