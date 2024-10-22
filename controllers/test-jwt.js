// controllers/test-jwt.js

import { Router } from 'express';
const router = Router();

// add jwt
import jwt from 'jsonwebtoken';

router.get('/sign-token', (req, res) => {
  // Mock user object added
  const user = {
    _id: 1,
    username: 'wonder-woman',
    password: '12345',
  };

  const token = jwt.sign({ user }, process.env.JWT_SECRET);

  res.json({ token });

});


router.post('/verify-token', (req, res) => {
    
    try {

        const token = req.headers.authorization.split(' ')[1];
        // adding in verify method
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ decoded });

    } catch (err) {

        res.status(401).json({ err: "Invalid token" });

    }
    
})

export default router;