const mongoose = require("mongoose");

async function connectDB()
{
    // 
    // const urlMongoose ="mongodb://localhost:27017/VKU_web_winoSocial"
    const urlMongoose = 'mongodb+srv://Dung060103:Dung060103@cluster0.bd7lfjg.mongodb.net/SocialMusic?retryWrites=true&w=majority'
    // const urlMongoose = 'mongodb+srv://manhnhat12:manhnhat1203@cluster0.wkud7kv.mongodb.net/SocialMusic?retryWrites=true&w=majority'

    try {
        var result = await mongoose.connect(urlMongoose,
            { useNewUrlParser: true, useUnifiedTopology: true, autoIndex:false });
        // console.log(result);
        console.log("Connect DB Success")
        
    } catch (error) {
        console.log("Connect DB Error",error.message)
        
    }

}

module.exports=connectDB;