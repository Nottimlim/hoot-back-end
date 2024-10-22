/* --------------------------------Imports--------------------------------*/

import { Router } from 'express'
import * as controllers from '../controllers/auth.js'

/* --------------------------------Express & Mongoose--------------------------------*/

const router = Router();

/* --------------------------------Routes--------------------------------*/

router.post('/sign-up', controllers.signUp);

router.post('/sign-in', controllers.signIn);

/* --------------------------------Exports--------------------------------*/

export default router;