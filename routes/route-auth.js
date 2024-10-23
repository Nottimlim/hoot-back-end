/* --------------------------------Imports--------------------------------*/

import { Router } from 'express';
import { verifyToken } from '../middleware/verify-token.js';
import * as controllers from '../controllers/auth.js';

/* --------------------------------Express & Mongoose--------------------------------*/

const router = Router();

/* --------------------------------Routes--------------------------------*/

// authentication
router.post('/sign-in', controllers.signIn);
router.post('/sign-up', controllers.signUp);

// authorization
router.get('/verify/:userId', verifyToken, controllers.checkAuth)

/* --------------------------------Exports--------------------------------*/

export default router;