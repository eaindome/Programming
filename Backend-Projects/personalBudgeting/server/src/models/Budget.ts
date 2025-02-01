import mongoose, { Schema, Document, Model } from 'mongoose';

interface IBudget extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  amount: number;
  createdAt: Date;
}

const BudgetSchema: Schema<IBudget> = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Budget: Model<IBudget> = mongoose.model<IBudget>('Budget', BudgetSchema);
export default Budget;