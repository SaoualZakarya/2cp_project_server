import Message from '../models/message.js'
import Conversation from '../models/conversation.js'
import validateMongoDbId from '../utils/validate_mongodb_id.js';


// Get all messages
const getAllMessages = async (req,res,next) =>{
    const {conversation} = req.body 
    if(!validateMongoDbId(conversation)){
        return res.status(400).json({ error: "Conversation id is not valid" });
    }
    try{
        const messages = await Message.find({conversation}).populate({
            path: 'sender',
            select: 'firstName lastName'
        });
        res.json(messages);
    }catch (err){
        next(err)
    }
}

// Create message
const createMessage = async (req,res,next) =>{
    const {content,conversation} = req.body 
    if(content.length >= 200 ){
        return res.status(400).json({ error: "Message max length is 200 char" });
    }
    if(!validateMongoDbId(conversation)){
        return res.status(400).json({ error: "Conversation id is not valid" });
    }

    const userId = req.user._id
    try{
        const message = await Message.create({
            content,
            sender:userId,
            conversation
        });
        res.json(message);
    }catch (err){
        next(err)
    }
}

// Create conversation
const createConversation = async (req,res,next) =>{

    const {participant} = req.body 

    if(!validateMongoDbId(participant)){
        return res.status(400).json({ error: "Participant id is not valid" });
    }

    const userId = req.user._id
    try{
        const conversation = await Conversation.create({
            creator:userId,
            participant
        });
        res.json({message:"Conversation has been created successfully",success:true});
    }catch (err){
        next(err)
    }
}

// Get user conversations
const getAllConversations = async (req,res,next) =>{
    const id = req.user._id;
    try{
        const messages = await Conversation.find({
            $or: [
                { creator: id },
                { participant: id }
            ]
        });
        res.json(messages);
    }catch (err){
        next(err)
    }
}

// delete message
const deleteMessage = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const message = await Message.findByIdAndDelete(id)
        res.json({message:"Message deleted successfully "});
    }catch(err){    
        next(err)
    }
}
// delete conversation
const deleteConversation = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const conversation = await Conversation.findByIdAndDelete(id)
        res.json({message:"Conversation deleted successfully"});
    }catch(err){    
        next(err)
    }
}



export default {deleteMessage,deleteConversation, getAllMessages,createConversation,createMessage,getAllConversations}