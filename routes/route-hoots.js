/* --------------------------------Imports--------------------------------*/

import { Router } from 'express'
import { verifyToken } from '../middleware/verify-token.js';
import { verifyAuthor } from '../middleware/verify-author.js';
import * as controllers from '../controllers/hoots.js';

/* --------------------------------Express & Mongoose--------------------------------*/

const router = Router();

/* --------------------------------/hoot routes--------------------------------*/

router.get('/', controllers.getHoots);

router.get('/:hootId', controllers.getHoot);

// Signed In Routes
router.use(verifyToken);

router.post('/', controllers.createHoot);

router.put('/:hootId', verifyAuthor, controllers.updateHoot);

router.delete('/:hootId', verifyAuthor, controllers.deleteHoot);

router.post('/:hootId/comments', controllers.createComment);

/* --------------------------------Exports--------------------------------*/

export default router;