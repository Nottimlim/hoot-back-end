/* --------------------------------Imports--------------------------------*/

import { Router } from 'express'
import { verifyToken } from '../middleware/verify-token.js';
import { verifyAuthor } from '../middleware/verify-token.js';
import * as controllers from '../controllers/hoots.js'

/* --------------------------------Express & Mongoose--------------------------------*/

const router = Router();

/* --------------------------------/hoot routes--------------------------------*/

router.get('/', controllers.getHoots);

router.get('/:hootId', controllers.getHoot);

// Signed In Routes
router.use(verifyToken());

router.post('/', verifyAuthor, controllers.createHoots);

router.put('/:hootId', verifyAuthor, controllers.updateHoot);

router.delete('/:hootId', verifyAuthor, controllers.deleteHoot);

router.post('/:hootId/comments', controllers.createComment);

/* --------------------------------Exports--------------------------------*/

export default router;