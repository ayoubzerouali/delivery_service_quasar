const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger');
const error = require('./middleware/error');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize')

// LOAD ENV
dotenv.config({path:'./config/config.env'});

// Connect to database 
connectDB();

// Route files 
const delivery = require('./routes/delivery')




const app = express();

// Body parser 
app.use(express.json())

// Cookie Parser 
app.use(cookieParser());

// Sanitize Data
app.use(mongoSanitize());

// dev loggin middleware
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

// File Uploading 
app.use(fileUpload());

// set static folder
app.use(express.static(path.join(__dirname,'public')))

//Mount routers

app.use('/api/v1/delivery',delivery)

app.use(error)



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server Runnig in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

// Handle promise rejections (unhandled)

process.on('unhandledRejection',(err,promise)=> {
    console.log(`Error ${err.message}`.red.bold)
    // Close server & exit process
    server.close(()=>process.exit(1))
})