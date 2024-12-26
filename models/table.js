import { DataTypes } from "sequelize";
import {sequelize} from "../config/db.js"

const columns = sequelize.define('expenses', {
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

export default columns;