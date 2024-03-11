import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  payerId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
  },
  payeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, 
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'approved', 'revision', 'completed', 'disputed'],
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
}, {
    timestamps: true 
}); 

export default mongoose.model('Transaction', transactionSchema);
