const Expense = require('../../models/expenseModel');

// add expense
const addExpense = async (req, res) => {
    const { category, amount, date } = req.body;

    if (!category || !amount || !date) {
        return res.status(400).send({
            message: 'Fields required.'
        });
    }

    try {
        const newExpense = await Expense.create({
            userId: req.user.userId,
            category,
            amount,
            date
        });

        return res.status(201).send({
            message: 'Expense added successfully!',
            expense: newExpense
        });
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send({
            message: `Server error: ${err}`
        });
    }
};

// get a list of expenses
const listExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll({
            where: {
                userId: req.user.userId
            }
        });

        return res.status(200).send({
            message: 'Expenses retrieved successfully!',
            expense: expenses
        });
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send({
            message: `Server error: ${err}`
        });
    }
};

// filter expense
const filterExpense = async (req, res) => {
    const { startDate, endDate, category } = req.query;
    const filterOptions = { userId: req.user.userId };

    if (category) {
        filterOptions.category = category;
    }
    if (startDate && endDate) {
        filterOptions.date = {
            [Op.between]: [new Date(startDate), new Date(endDate)]
        };
    }

    try {
        const expenses = await Expense.findAll({
            where: filterOptions
        });

        return res.status(200).send(expenses);
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send({
            message: `Server error: ${err}`
        });
    }
};

// update an expense
const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { category, amount, date } = req.body;

    try {
        const expense = await Expense.findOne({
            where: {
                id,
                userId: req.user.userId
            }
        });

        if (!expense) return res.status(404).send({
            message: 'Expense not found.'
        });

        expense.category = category || expense.category;
        expense.amount = amount || expense.amount;
        expense.date = date || expense.date;

        await expense.save();

        return res.status(200).send({
            message: 'Expense updated successfully.',
            expense
        });
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send({
            message: `Server error: ${err}`
        });
    }
};


// delete expense record
const deleteExpense  = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await Expense.findOne({
            where: {
                id,
                userId: req.user.userId
            }
        });

        if (!expense) return res.status(404).send({
            message: 'Expense record not found.'
        });

        await expense.destroy();

        return res.status(200).send({
            message: 'Expense record deleted successfully.'
        });
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send({
            message: `Server error: ${err}`
        });
    }
};

module.exports = {
    addExpense,
    listExpenses,
    filterExpense,
    updateExpense,
    deleteExpense
}