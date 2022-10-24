const mongoose = require("mongoose");
const Account = mongoose.Schema(
    {
        user_fname: {type: String, required: true, unique:true},
        user_lname: {type: String, required: true} ,
        gmail:{type: String, required: true},
        gender:{type:Boolean,required: true},
        birthday:{type:Date,required:true},
        password: {type: String, required: true} ,

    },{
        versionKey: false // You should be aware of the outcome after set to false
    }
)
module.exports=mongoose.model("Account",Account);
