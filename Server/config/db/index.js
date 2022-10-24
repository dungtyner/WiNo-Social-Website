const mongoose = require("mongoose");

async function connectDB()
{
    const urlMongoose ="mongodb://localhost:27017/VKU_web_winoSocial"
    try {
        mongoose.connect(urlMongoose);
        console.log("Connect DB Success")
        
    } catch (error) {
        console.log("Connect DB Error")
        
    }

}
module.exports=connectDB;