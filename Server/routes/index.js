const accountRoute = require("./account");

function route(app)
{
    app.use("/account",accountRoute);
}
module.exports=route;