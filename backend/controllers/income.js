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
    console.log(incomes);
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  schema
    .findByIdAndDelete(id)
    .then((income) => res.status(200).json({ message: 'Income deleted!' }))
    .catch((err) => res.status(500).json({ message: 'Server error' }));
};
