import { Router } from 'express';
import controller from '../../controllers/contacts-controller.js';
import { isEmptyBody, isValidId, authenticate, upload } from "../../middlewares/index.js";
import { validateBody }  from "../../decorators/index.js";
import { contactsAddSchema, contactUpdateSchema, contactStatusSchema } from "../../models/Contact.js";


const router = Router();

router.use(authenticate);

router.get('/', controller.getAll);

router.get('/:contactId', isValidId, controller.getById);

router.post('/', upload.single("avatar"), isEmptyBody, validateBody(contactsAddSchema), controller.add);

router.put('/:contactId', isValidId, isEmptyBody, validateBody(contactUpdateSchema), controller.updateById);

router.patch("/:contactId/favorite", isValidId, isEmptyBody, validateBody(contactStatusSchema), controller.updateStatusContact);

router.delete('/:contactId', isValidId, controller.removeContact );


export default router;