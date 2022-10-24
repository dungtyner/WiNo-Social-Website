const express = require("express");
const accountControllers = require("../app/controllers/accountController");
const router = express.Router();

router.post("/signin",accountControllers.SignIn);
router.post("/signup",accountControllers.SignUp);
router.post("/restore-pass",accountControllers.RestorePassword);
router.post("/CheckCodeEmail",accountControllers.CheckCodeEmail);
router.get("/check-is-active",accountControllers.CheckIsActived);
router.get("/sign-out",accountControllers.SignOut);
// router.post("/test",accountControllers.test);
// router.get("/test",accountControllers.test);    



module.exports=router;
