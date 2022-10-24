const fetch  = require('isomorphic-fetch');
const jwt = require('jsonwebtoken');
const Account = require("../models/Account");
require('dotenv').config();

class AccountController {
   account_session=null;
  constructor(){
    this.account_session;
}
  SignIn(req, res) {
    var token = req.body.token;
    var key_secret=process.env.SECRET_KEY;
    const url_Captcha = `https://www.google.com/recaptcha/api/siteverify?secret=${key_secret}&response=${token}`
    fetch(url_Captcha,
    { method: "POST" }
    ).then((response) => response.json())
    .then((google_response) => {
      if (google_response.success == true) {
        Account.findOne(req.body).then((account) => {
          if (account == null) {

            res.send({mess:"Sign In Fail!!!"});
          } else {
    
            req.session.loginEd = account._id
            console.log(req.session.loginEd);
            res.send({ status: "ok" });
          }
        });
      } else {
        // if captcha is not verified
        return res.send({ response: "Failed" });
      }
    })
    .catch((error) => {
        // Some error while verify captcha
      return res.json({ error });
    });
    
  };
  SignUp(req, res) {
    console.log(req.body);
    Account.create(req.body)
      .then(() => {
        req.session.loginEd = account._id
        res.send({ status: "ok" });
      })
      .catch(() => {
        res.send("Sign Up Fail !!!");
      });
  }
  CheckCodeEmail(req, res) {
      console.log(AccountController.User);
      if(AccountController.User)
      {
        if (AccountController.User.code == AccountController.User.code) {
          Account.updateOne(
            { gmail: AccountController.User.gmail },
            { password: AccountController.User.newPassword }
          )
            .then(() => {
              console.log("Restore Password Success");
            })
            .catch(() => {
              console.log("Restore Password Fail");
            });
        }
      }
    
  }
  RestorePassword(req, res) {
    var nodemailer = require("nodemailer");
    const newPass = req.body.password;
    const codeRandom = Math.floor(Math.random() * 100000);
    req.session.codeEmail= codeRandom;
    console.log(req.session);
    const textCode = "Code: " + codeRandom.toString();

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ilovethubumbi@gmail.com",
        pass: "mazyvmjthmkrzzcg",
      },
    });
    var mailOptions = {
      from: "ilovethubumbi@gmail.com",
      to: req.body.gmail,
      subject: "Restore Password",
      text: textCode,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.send({ status: "ok" });
        console.log("Email sent: " + info.response);
      }
    });
  }

  CheckIsActived(req,res)
  {
    console.log('running CheckIsActived()... ');
    console.log(req.session.loginEd);
    if(req.session.loginEd)
    {
      
      res.send(true);
    }
    else
    {
      res.send(false);
    }
  }
  SignOut(req,res)
  {
    console.log('SignOut() running ....');
    delete req.session.loginEd;
    req.session.destroy();
    console.log(req.session);
    res.send({status:200});
  }
  test(req,res)
  {
    console.log('test() running ....');
  }
}
module.exports = new AccountController();
