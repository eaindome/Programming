import mongoose, { Schema, Document, Model } from 'mongoose';

interface IExpense extends Document {
  userId: mongoose.Types.ObjectId;
  budgetId: mongoose.Types.ObjectId;
  category: string;
  description: string;
  amount: number;
  date: Date;
}

const ExpenseSchema: Schema<IExpense> = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    budgetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Budget', required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Expense: Model<IExpense> = mongoose.model<IExpense>('Expense', ExpenseSchema);
export default Expense;