const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const colors = require('colors');

// LOAD ENV VARS 
dotenv.config({path:'./config/config.env'});

// LOAD MODELS 
const DeliveryUser = require('./models/DeliveryUser');

// Connect To DB
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

//READ JSON FILES
const delivery_users = JSON.parse(fs.readFileSync(`${__dirname}/_data_to_seed/users.json`,'utf-8'));

// IMPORT INTO DB
const importData = async () => {
    try {
        await DeliveryUser.create(delivery_users);
        console.log('Data Imported ..'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
    }
}
const deleteData = async () => {
    try {
        await DeliveryUser.deleteMany();
        console.log('Data deleted ..'.red.inverse)
        process.exit();
    } catch (error) {
        console.error(error);
    }
}


// ARGUMENT 
if (process.argv[2] === '-i') {
    importData();
} 
else if (process.argv[2] === '-d') {
    deleteData();
}