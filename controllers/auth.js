/* --------------------------------Imports--------------------------------*/

import User from '../models/model-user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/* --------------------------------Variables & Helper Functions--------------------------------*/

const SALT = 12;
const getToken = user => {
    return jwt.sign({
        username: user.username,
        _id: user._id
    }, process.env.JWT_SECRET)
    
}

/* --------------------------------GET Controllers--------------------------------*/

const checkAuth = async (req, res) => {
    
    try {

        if (req.user._id !== req.params.userId) {
            return res.status(401).json({ error: "Unauthorized!"});
        }
        
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(404);
            throw new Error('Profile not found');
        }

        res.json({ user })

    } catch (err) {
        if (res.statusCode === 404) {
            return res.status(404).json({ error: err.message });
        }

        return res.status(500).json({ error: err.message });
    }
}

/* --------------------------------POST Controllers--------------------------------*/

const signUp = async (req, res) => {
    
    try {
        
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({ error: 'Username taken' });
        }

        user = await User.create({
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(req.body.password, SALT)
        })

        // implement jwt
        const token = getToken(user);
        res.status(201).json({ token });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


const signIn = async (req, res) => {

    try {

        let user = await User.findOne({ username: req.body.username });
        let passwordInput = req.body.password;

        if (!user || !bcrypt.compareSync(passwordInput, user.hashedPassword)) {
            return res.status(400).json({ error: 'Invalid login' });
        }

        // jwt
        const token = getToken(user);
        return res.status(200).json({ token });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    
}

/* --------------------------------Exports--------------------------------*/

export { SALT, signUp, signIn, checkAuth }
