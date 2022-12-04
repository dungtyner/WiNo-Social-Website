const {getDataAccount_byID,getDataAccount_bySlug} = require('../models/Account')
class NotificationController{
    async request_getNotification(req,res)
    {
        res.send(await new NotificationController().getNotification({id:req.session.loginEd}));
    }
    async getNotification({id})
    {
        
        var dataAccount = await getDataAccount_byID(id)

        return dataAccount.notification
    }
    async request_clearCountNotification(req,res)
    {
        var dataAccount = await getDataAccount_byID(req.session.loginEd);
        dataAccount.count_notification=0;
        dataAccount.save()
        res.send({mess:'ok'})
    }
}
function NotificationResponseAddNewFriend({
    friend,
    post,
})
{
    this.friend=friend;
    this.post=post;
}
module.exports={NotificationController:new NotificationController(),NotificationResponseAddNewFriend};
// module.exports={NotificationResponseAddNewFriend};
