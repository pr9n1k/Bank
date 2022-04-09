import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './router/authRouter.js';
import employeeRouter from './router/employeeRouter.js';
import clientRouter from './router/clientRouter.js';
import operationRouter from './router/operationRouter.js';
import departmentRouter from './router/departmentRouter.js';
import legalRouter from './router/legalRouter.js';


const PORT = process.env.PORT || 5000;
const BD_URL = process.env.BD_URL || '';

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin: process.env.CLIENT_URL,
    exposedHeaders:['X-Total-Count']
}))
app.use('/auth',authRouter);
app.use('/employee',employeeRouter);
app.use('/client',clientRouter);
app.use('/operation',operationRouter);
app.use('/department',departmentRouter);
app.use('/legal',legalRouter);
app.use((error, req, res, next) => {
    // Установка кода состояния ответа
    res.status(error.status)
  
    // Отправка ответа
    res.json({
      status: error.status,
      message: error.message,
      stack: error.stack
    })
  })


const start = async () =>{
    try{
        await mongoose.connect(BD_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT,()=>console.log(`SERVER STARTED ON PORT: ${PORT}`));
    }catch(e){
        console.log(e);
    }
}

start();