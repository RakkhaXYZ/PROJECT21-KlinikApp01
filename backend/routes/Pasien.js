import express from 'express';
import { RegisterPasien, getPasienByPerawat, getPasienBydokter, getPasienById } from '../controllers/Pasien.js';
import { verifyUser, RegisterOnly } from '../middleware/AuthUser.js';
import { verifyDokter } from '../middleware/AuthDokter.js';
import { sessionPasien } from '../controllers/Skedule.js';


const router = express.Router();

router.post('/pasien', verifyUser, RegisterOnly, RegisterPasien);
router.get('/pasienPerawat',  verifyUser,getPasienByPerawat);
router.get('/pasienDokter', getPasienBydokter)
router.get('/pasien/:id',  getPasienById)
router.post('/skedulePasien', sessionPasien);
export default router;
