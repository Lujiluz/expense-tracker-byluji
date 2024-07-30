const { addIncome, getIncomes, deleteIncome, updateIncome, getIncomesByFilter } = require('../controllers/income-controller');
const { addExpense, getExpenses, deleteExpense, updateExpense } = require('../controllers/expense-controller');

const router = require('express').Router();

router.post('/add-income', addIncome);
router.get('/get-incomes', getIncomes);
router.delete('/delete-income/:id', deleteIncome);
router.put('/update-income/:id', updateIncome);
router.get('/get-incomes-by-filter', getIncomesByFilter);

router.post('/add-expense', addExpense);
router.get('/get-expenses', getExpenses);
router.delete('/delete-expense/:id', deleteExpense);
router.put('/update-expense/:id', updateExpense);

module.exports = router;
