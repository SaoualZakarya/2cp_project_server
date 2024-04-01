import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  payeed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  status: {
    type: String,
    enum: ['canceled','pending', 'completed'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Transaction', transactionSchema);
