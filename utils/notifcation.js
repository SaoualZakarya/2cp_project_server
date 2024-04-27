import Notification from "../models/notification"

const createNotification =async (msg,userId,purpose) =>{
    const notification = await Notification.create({
        message : msg ,
        user : userId,
        purpose
    })
}

export default createNotification ;
