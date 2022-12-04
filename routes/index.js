const accountRoute = require("./account");
const testRoute = require('./test')
const chatRoute = require('./chat')
const notificationRoute = require('./notification')
const friendRoute = require('./friend')


function route(app)
{
    app.use("/account",accountRoute);
    app.use("/chat",chatRoute);
    app.use("/notification",notificationRoute);
    app.use("/friend",friendRoute);
    app.use("/friends",friendRoute);


    app.use('/test',testRoute);
}
module.exports=route;