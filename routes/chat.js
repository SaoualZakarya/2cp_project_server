import express from 'express'
import {authMiddleware,isVerified,isBlocked} from '../middlewares/authMiddleware.js'
import message from '../controllers/chat.js'

const router = express.Router()

// Get all messages for chat
router.get('/message/get_all',authMiddleware,isBlocked,isVerified,message.getAllMessages)
// Create messsage 
router.post('/message/create',authMiddleware,isBlocked,isVerified,message.createMessage)
// delete single message
router.delete('/message/delete/:id',authMiddleware,isBlocked,isVerified,message.deleteMessage)
// delete conversation
router.delete('/conversation/delete/:id',authMiddleware,isBlocked,isVerified,message.deleteConversation)
// create conversation
router.post('/conversation/create',authMiddleware,isBlocked,isVerified,message.createConversation)
// get all conversations
router.get('/conversation/all',authMiddleware,isBlocked,isVerified,message.getAllConversations)


export default router ;