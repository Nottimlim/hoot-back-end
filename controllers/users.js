import { Router } from 'express';
const router = Router();
import bcrypt from 'bcrypt';
import User from '../models/user.js';

// add jwt
import jwt from 'jsonwebtoken';

const SALT = 12;
const getToken = user => {
    return jwt.sign({
        username: user.username,
        _id: user._id
    }, process.env.JWT_SECRET)
}

router.post('/sign-up', async (req, res) => {
    
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
});

router.post('/sign-in', async (req, res) => {

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

})

export default router;