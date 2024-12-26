import express from 'express';
import Expense from '../models/table.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { product_name, category, amount, date } = req.body;
        const expense = await Expense.create(({ product_name, category, amount, date }));
        res.status(201).json({ message: "Expense Created successfully ", expense });
    } catch (error) {
        res.status(500).json({ message: "Error creating expense ", error });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Expense.findAll();
        res.status(200).json({ data });
    } catch (error) {
        res.status(404).json({ message: "Data Not Found!", error });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Expense.findByPk(id);

        if (!data) {
            res.status(404).json({ message: "Data Not Found!", error });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error });
    }
})

router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const data = await Expense.findAll({
            where: {
                category: category
            }
        });

        if (data.length == 0) {
            res.status(404).json({ message: `No expenses in ${category} Category` })
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        await Expense.update(
            { amount },
            {
                where: {
                    id: id,
                }
            }
        );

        const updatedData = await Expense.findByPk(id);
        res.status(200).json({ message: "Expense updated successfully", updatedData });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//total expense on a particular date
router.get('/date/:date', async (req, res) => {
    try {
        const { date } = req.params; // Extract date from URL params

        const data = await Expense.findAll({
            where: {
                date: new Date(date),
            },
        });

        if (!data || data.length === 0) {
            return res.status(404).json({ message: `No expenses found for date: ${date}` });
        }

        const totalExpense = data.reduce((sum, expense) => sum + expense.amount, 0);
        res.status(200).json({ message: "Expenses fetched successfully", totalExpense, expenses: data });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

//Delete expense
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Expense.findByPk(id);
        await data.destroy();
        res.status(200).json({ message: `Deleted the expense id : ${id}` })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
})

export default router;