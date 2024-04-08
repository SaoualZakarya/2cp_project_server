import mongoose from 'mongoose';

// Define the Schema for the credit card information
const cardSchema = new mongoose.Schema({
    cardholderName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expirationDate: {
        //"MM/YYYY"
        type: String, 
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
    }
}, {
    timestamps: true
});

export default mongoose.model('Card', cardSchema);
