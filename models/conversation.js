// conversationModel.js
import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
}, {
    timestamps: true,
});

// Export the model
export default mongoose.model('Conversation', conversationSchema);
