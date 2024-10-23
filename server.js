/* --------------------------------Imports--------------------------------*/
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import db from './db/connection.js'; // db = mongoose.connection
import chalk from 'chalk';
import cors from 'cors';

import authRouter from './routes/route-auth.js';
import hootsRouter from './routes/route-hoots.js';

/* --------------------------------Express & Mongoose--------------------------------*/

const app = express();
const PORT = process.env.port || 3000;
db.on('connected', () => {
    console.clear();
    console.log(chalk.blue(`Connected to MongoDB ${db.name}.`));

    app.listen(PORT, () => {
        console.log(chalk.green(`The express app is ready on port ${PORT}!`));
    });
});

/* --------------------------------Middleware--------------------------------*/

// middleware to parse json bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* --------------------------------Routes--------------------------------*/

app.use('/auth', authRouter);

app.use('/hoots', hootsRouter);