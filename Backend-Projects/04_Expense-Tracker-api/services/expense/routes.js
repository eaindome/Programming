const express = require('express');
const { addExpense, listExpenses, 
    filterExpense, updateExpense, deleteExpense } = require('./controller');
const { verifyToken } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', verifyToken, addExpense);
router.get('/list', verifyToken, listExpenses);
router.get('/filter', verifyToken, filterExpense);
router.put('/update', verifyToken, updateExpense);
router.delete('/delete', verifyToken, deleteExpense);

module.exports =  router;