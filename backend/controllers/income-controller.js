const schema = require('../models/incomeSchema');

exports.addIncome = async (req, res) => {
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
    res.status(200).json({ message: 'New income added!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await schema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  await schema
    .findByIdAndDelete(id)
    .then((income) => res.status(200).json({ message: 'Income deleted!' }))
    .catch((err) => res.status(500).json({ message: 'Something went wrong' }));
};

exports.updateIncome = async (req, res) => {
  const { id } = req.params;

  const updatedContent = { ...req.body };
  await schema
    .findByIdAndUpdate(id, updatedContent)
    .then((data) => res.status(200).json({ message: 'Income updated!' }))
    .catch((err) => res.status(500).json({ message: 'Something went wrong!' }));
};

exports.getIncomesByFilter = async (req, res) => {
  const { categoryFilter, belowAmount, aboveAmount } = req.body;
  let filter = {};

  if (categoryFilter) filter.category = new RegExp(categoryFilter, 'i');
  if (belowAmount) filter.amount = { $lte: Number(belowAmount) };
  if (aboveAmount) filter.amount = { $gte: Number(aboveAmount) };
  // if (date) filter.createdAt = { $lt: date };

  const incomes = await schema.find(filter);

  return res.json({ incomes });
};
