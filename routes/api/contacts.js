import { Router } from 'express';
import controller from '../../controllers/controller.js';
import { isEmptyBody, isValidId } from "../../middlewares/index.js";


const router = Router();

router.get('/', controller.getAll);

router.get('/:contactId', isValidId, controller.getById);

router.post('/', isEmptyBody, controller.add);

router.put('/:contactId', isValidId, isEmptyBody, controller.updateById);

// router.delete('/:contactId', isValidId, controller.removeContact );



export default router;