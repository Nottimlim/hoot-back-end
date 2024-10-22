import { Router } from 'express';
const router = Router();
import User from '../models/user.js';

// add jwt
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/verify-token.js';


router.get('/:id', verifyToken, async (req, res) => {
    
    try {

        if (req.user._id !== req.params.id) {
            return res.status(401).json({ error: "Unauthorized!"});
        }
        
        const user = await User.findById(req.params.id);
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
});

export default router;