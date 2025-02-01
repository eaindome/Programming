import mongoose, { Schema, Document, Model } from 'mongoose';

interface ISavings extends Document {
  userId: mongoose.Types.ObjectId;
  goal: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
}

const SavingsSchema: Schema<ISavings> = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    goal: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, required: true, default: 0 },
    targetDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Savings: Model<ISavings> = mongoose.model<ISavings>('Savings', SavingsSchema);
export default Savings;