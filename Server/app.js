const express = require('express');
const session = require("express-session")
const app = express();
const cors = require("cors");
const cookie_pa= require('cookie-parser');
const body_pa= require('body-parser');
const redis = require('redis');
const redis_client = redis.createClient();
const redisStore = require('connect-redis')(session);
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
    collection: 'mySessions'
  });

const route = require("./routes/index");
const connectDB = require("./config/db/");

connectDB();
app.use(cors(
    {
        origin:['http://localhost:3000'],
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
// app.use(cookie_pa());
app.use(body_pa.urlencoded({extended:true}));
// const sessionMiddleware = session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
// });
// app.use(sessionMiddleware);
app.set('trust proxy', 1)
app.use(session({
    secret:"SocialWeb",
    saveUninitialized:true,
    proxy:true,
    cookie:{
        // sameSite:'none',
        secure:false
    },
    resave:true,
    
    // store: store,
    // ,store: new redisStore({host:'localhost',port:6379,client:redis_client,ttl:86400})
}))
route(app);
app.listen(5000,()=>{
    console.log("SV started!!!")
})