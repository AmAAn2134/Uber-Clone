const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app=express();
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captionRoutes = require("./routes/caption.routes");

connectToDb();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.get("/",function(req,res){
    res.json("Hello World");
})

app.use("/users",userRoutes);
app.use('/captions',captionRoutes);

module.exports=app;
