import express from 'express'
import { getKorisnici, createKorisnik, LoginUser } from '../controllers/korisniciController.js'
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router()


router.get('/', authMiddleware, getKorisnici  )
router.post('/', authMiddleware, createKorisnik)
router.post('/login', LoginUser)

export default router