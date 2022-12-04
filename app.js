
const express = require('express');
const session = require("express-session")
const app = express();
const cors = require("cors");
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io')
const io =  new Server(server);
const body_pa= require('body-parser');
const multer = require('multer');
const uploads = multer();
const uploadFile  =require('express-fileupload');
require("dotenv").config();
// app.use(uploadFile())
global.uploads = uploads
global.io= io;

var MongoDBStore = require('connect-mongodb-session')(session);

const connectDB = require("./config/db/");
connectDB();
var store = new MongoDBStore({
    uri: 'mongodb+srv://Dung060103:Dung060103@cluster0.bd7lfjg.mongodb.net/connect_mongodb_session_test?retryWrites=true&w=majority',
    collection: 'mySessions'
  });
const route = require("./routes/index");

app.use(cors(
    {
        origin:['http://localhost:3000','http://192.168.1.119:3000/','http://localhost:3001/build/static/','https://dung060103.github.io/TESThttps://dung060103.github.io/TEST/','https://dreamy-sprinkles-9f49d3.netlify.app'],
        methods:['GET','POST'],
        credentials: true
    }
));
app.use(express.urlencoded(
    {
        extended:false
      }
))
app.use(express.json())
app.use(body_pa.urlencoded({extended:true}));
app.set('trust proxy', 1)
app.use(session({
    
    secret:"SocialWeb",
    saveUninitialized:false,
    proxy:true,
    // FOR SERVER HOST: https://testsocialmusic.herokuapp.com
    // cookie: { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 48, sameSite: 'none' },
    // FOR SERVER LOCAL HOST
    cookie:{
        secure:false
    },
    resave:true,
    // store:store
}))
route(app);
module.exports = {io}
server.listen(process.env.PORT || 5000,()=>{
    console.log("SV started!!!")
})