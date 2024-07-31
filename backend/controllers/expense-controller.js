const schema = require('../models/expenseSchema');

exports.addExpense = async (req, res) => {
  const { title, amount, type, category, description, createdAt, updatedAt } = req.body;

  const income = schema({
    title,
    amount,
    type,
    category,
    description,
    createdAt,
    updatedAt,
  });

  try {
    if (!title || !category || !description) {
      return res.status(400).json({ message: 'All fields are required!' });
    } else if (amount <= 0 || !amount == 'number') {
      return res.status(400).json({ message: 'Amount must be a positif number' });
    }
    await income.save();
    res.status(200).json({ message: 'New expense added!' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!', error: err });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await schema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!', error: err });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  await schema
    .findByIdAndDelete(id)
    .then((income) => res.status(200).json({ message: 'expense deleted!' }))
    .catch((err) => res.status(500).json({ message: 'Something went wrong' }));
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;

  const updatedContent = { ...req.body };
  await schema
    .findByIdAndUpdate(id, updatedContent)
    .then((data) => res.status(200).json({ message: 'Expense updated!' }))
    .catch((err) => res.status(500).json({ message: 'Something went wrong!' }));
};

exports.filterExpenses = async (req, res) => {
  // list of the top 3 biggest expenses
  let filter = [
    {
      $sort: {
        amount: -1,
      },
    },
    {
      $limit: 3,
    },
  ];

  const top3BiggestExpenses = await schema.aggregate(filter);
  // list of the top 3 expenses by category
  filter = [
    {
      $group: {
        _id: '$category',
        total: {
          $sum: '$amount',
        },
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
    {
      $limit: 3,
    },
  ];

  const top3ExpensesByCategory = await schema.aggregate(filter);
  return res.status(200).json({ top3BiggestExpenses, top3ExpensesByCategory });
};
