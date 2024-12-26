import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('expense', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

async function connectDB(){
    try{
        await sequelize.authenticate();
        console.log("Connection with MySQL established successfully");        
    }catch(err){
        console.log(err);
    }
}

async function syncDB() {
    try {
        await sequelize.sync();
        console.log("Database synchronized successfully");
    } catch (error) {
        console.log(error);
    }
}

export { connectDB, syncDB, sequelize }