const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const captionSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'firstname must be at least 3 characters long'],
        },
        lastname:{
            type:String,
            minlength:[3,'lastname must be at least 3 characters long']
        }
    },
    email:{
       type:String,
       required:true,
       unique:true,
       lowercase:true,
       match:[]
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive',
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,"color mustbe at least 3 characters long"],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate must be at least 3 characters long'],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'capacity must be at least'],
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto'],
        },
        location:{
            lat:{
                type:Number,
            },
            lng:{
                type:Number,
            }
        }
    }
})
captionSchema.methods.generateAuthToken=function () {
    const token = jwt.sign({ _id:this._id },process.env.jwt_secret,{expiresIn:'24h'})
    return token;
}
captionSchema.methods.comparePassword=async function (password) {
    return await bcrypt.compare(password,this.password);
}
captionSchema.statics.hashPassword=async function (password) {
    return await bcrypt.hash(password,10);
}
const captainModel=mongoose.model('caption',captionSchema)
module.exports=captainModel;