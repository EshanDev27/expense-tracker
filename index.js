import express from "express";
import {connectDB} from "./config/db.js"
import {syncDB} from "./config/db.js"
import Expense from './routes/expenseRoutes.js'

const app = express();

app.use(express.json());
app.use('/api/expense', Expense);

(async () => {
    await connectDB();
    await syncDB();

    app.listen(3000, () => {
        console.log("Server has started at port : 3000");
    })
})();