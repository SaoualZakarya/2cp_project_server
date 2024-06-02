import Notification from "../modules/notification.js";
import { io,getUser } from '../server.js'; 

const createNotification = async (msg, userId, purpose) => {
    const notification = await Notification.create({
        message: msg,
        user: userId,
        purpose
    });

    // Emit the notification to the specific user
    const userSocket = getUser(userId);
    if (userSocket) {
        io.to(userSocket.socketId).emit('getNotification', notification);
    }
};

export default createNotification;
