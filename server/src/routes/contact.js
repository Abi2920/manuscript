import { Router } from 'express';
import { submitContact, getContacts, deleteContact } from '../controllers/contactController.js';
import { authenticate } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post('/', upload.single('file'), submitContact);
router.get('/', authenticate, getContacts);
router.delete('/:id', authenticate, deleteContact);

export default router;
