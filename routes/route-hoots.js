/* --------------------------------Imports--------------------------------*/

import { Router } from 'express'
import * as controllers from '../controllers/hoots.js'

/* --------------------------------Express & Mongoose--------------------------------*/

const router = Router();

/* --------------------------------/hoot routes--------------------------------*/

router.post('/', controllers.createHoots);

router.get('/', controllers.getHoots);

router.get('/:hootId', controllers.getHoot);

router.put('/:hootId', controllers.updateHoot);

router.delete('/:hootId', controllers.deleteHoot);

router.post('/:hootId/comments', controllers.createComment);

/* --------------------------------Exports--------------------------------*/

export default router;