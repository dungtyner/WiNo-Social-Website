const express = require('express');

const router=express.Router();
const {Account} = require('../app/models/Account')
const {BoxChat} = require('../app/models/BoxChat')
function Chat({
    avatarChat='',
    nameChat='',
    lastSessionMessage=null,
}={}){
    this.avatarChat=avatarChat;
    this.nameChat=nameChat;
    this.lastSessionMessage=lastSessionMessage;

}
router.get('/',function(req,res){

    res.send({mess:'ok'})
    
    
})

module.exports= router;