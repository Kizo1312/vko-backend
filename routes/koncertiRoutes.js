import express from 'express'
import { napraviKoncert,prikaziKoncerte, urediKoncert, izbrisiKoncert } from '../controllers/koncertiController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';


const router = express.Router()
router.post('/', authMiddleware, upload.single('slika_url'), napraviKoncert);
router.put('/:id', authMiddleware, upload.single('slika_url'), urediKoncert);
router.delete('/:id', authMiddleware, izbrisiKoncert);
router.get('/', authMiddleware, prikaziKoncerte )
export default router