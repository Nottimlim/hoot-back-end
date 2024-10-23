import dotenv from 'dotenv';
dotenv.config();
import db from "../db/connection.js";
import User from "../models/model-user.js";
import bcrypt from 'bcrypt';
import { SALT } from '../controllers/auth.js';

const insertData = async () => {

    // await db.dropDatabase();

    const users = [
        {
            username: "Lucky",
            password: "13"
        },
        {
            username: "Wonderwoman",
            password: "13"
        },
    ]
    
    for (let i = 0; i < users.length; i++) {

        await User.create({
            username: users[i].username,
            hashedPassword: bcrypt.hashSync(users[i].password, SALT)
        })

    }

    console.log('Users have entered the database');

    await db.close();

}

insertData();