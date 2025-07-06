const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jsonwebtoken=require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            require:true,
            minlength:[3,"first name must br at least 3 characters long"],
        },
        lastname:{
            type:String,
            minlength:[3,'last name must be atleast 3 characters long'],
        }
    },
    email:{
        type:String,
        unique:true,
        require:true,
        minlength:[5,"Email must be atleast 5 characters long"],
    },
    password:{
        type:String,
        require:true,
        select:false,
    },
    socketId:{
        type:String
    },
})
userSchema.methods.generateAuthToken= async function(){
    const token=jsonwebtoken.sign(
        {_id:this._id},
        process.env.jwt_secret,
    { expiresIn:'24h' }
)
    return token;
}
userSchema.methods.comparePassword=async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword=async function (password) {
    return await bcrypt.hash(password,10); 
} 
const userModel=mongoose.model('user',userSchema);
module.exports=userModel;