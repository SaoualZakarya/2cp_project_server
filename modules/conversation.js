// conversationModel.js
import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
const conversationSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

// Export the model
export default mongoose.model('Conversation', conversationSchema);
