import { Router } from 'express';
import controller from '../../controllers/controller.js';
import { isEmptyBody, isValidId, authenticate  } from "../../middlewares/index.js";


const router = Router();

router.use(authenticate);

router.get('/', controller.getAll);

router.get('/:contactId', isValidId, controller.getById);

router.post('/', isEmptyBody, controller.add);

router.put('/:contactId', isValidId, isEmptyBody,  controller.updateById);

router.patch("/:contactId/favorite", isValidId, isEmptyBody, controller.updateStatusContact);

router.delete('/:contactId', isValidId, controller.removeContact );


export default router;